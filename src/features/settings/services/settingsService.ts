// src/features/settings/services/settingsService.ts
import client from "@/services/api/client/client";
import { endpoints } from "@/services/api/endpoints/endpoints";
import type { 
  SettingsResponse, 
  IDCardConfig, 
  NotificationsConfig 
} from "../types/settings.types";

// =================== MAPEO DE DATOS ===================
const mapSettingsFromBackend = (backendSettings: any): SettingsResponse => {
  console.log('📦 Configuraciones recibidas del backend:', backendSettings);
  
  return {
    idCard: backendSettings.idCard || backendSettings.tarjetaID || getDefaultIDCardConfig(),
    notifications: backendSettings.notifications || backendSettings.notificaciones || getDefaultNotificationsConfig(),
  };
};

const getDefaultIDCardConfig = (): IDCardConfig => ({
  fields: [
    { id: '1', name: 'fullName', label: 'Nombre Completo', required: true, visible: true, order: 1 },
    { id: '2', name: 'email', label: 'Email', required: true, visible: true, order: 2 },
    { id: '3', name: 'phone', label: 'Teléfono', required: false, visible: true, order: 3 },
    { id: '4', name: 'address', label: 'Dirección', required: false, visible: true, order: 4 },
    { id: '5', name: 'bloodType', label: 'Tipo de Sangre', required: false, visible: false, order: 5 },
  ],
  qrConfig: {
    includePhoto: false,
    includeEmergencyContacts: true,
    includeMedicalInfo: false,
    includeBloodType: false,
    includeAllergies: false,
    expirationDays: 30,
  }
});

const getDefaultNotificationsConfig = (): NotificationsConfig => ({
  channels: [
    {
      channel: 'push',
      enabled: true,
      types: {
        route_start: true,
        route_end: true,
        safety_alert: true,
        support_message: true,
        emergency: true,
      }
    },
    {
      channel: 'email',
      enabled: false,
      types: {
        route_start: false,
        route_end: false,
        safety_alert: false,
        support_message: true,
        emergency: true,
      }
    },
    {
      channel: 'sms',
      enabled: false,
      types: {
        route_start: false,
        route_end: false,
        safety_alert: false,
        support_message: false,
        emergency: true,
      }
    },
  ],
  templates: [
    {
      type: 'route_start',
      subject: 'Inicio de Ruta - OpenBlind',
      body: 'Hola {{userName}}, has iniciado tu ruta hacia {{destination}}.',
      variables: ['userName', 'destination', 'timestamp']
    },
    {
      type: 'route_end',
      subject: 'Ruta Finalizada - OpenBlind',
      body: 'Hola {{userName}}, has finalizado tu ruta exitosamente.',
      variables: ['userName', 'destination', 'timestamp']
    },
    {
      type: 'safety_alert',
      subject: 'Alerta de Seguridad - OpenBlind',
      body: 'Alerta: Se ha detectado una situación de riesgo en {{location}}.',
      variables: ['userName', 'location', 'alertType', 'timestamp']
    },
    {
      type: 'support_message',
      subject: 'Mensaje de Soporte - OpenBlind',
      body: 'Hola {{userName}}, hemos recibido tu mensaje. Te responderemos pronto.',
      variables: ['userName', 'ticketId', 'timestamp']
    },
    {
      type: 'emergency',
      subject: 'EMERGENCIA - OpenBlind',
      body: 'EMERGENCIA: {{userName}} ha activado una alerta de emergencia en {{location}}.',
      variables: ['userName', 'location', 'contacts', 'timestamp']
    },
  ],
  legalText: 'Este mensaje fue enviado por OpenBlind. Para dejar de recibir notificaciones, actualiza tus preferencias en la aplicación.',
});

const mapSettingsToBackend = (settings: Partial<SettingsResponse>) => {
  return {
    idCard: settings.idCard,
    notifications: settings.notifications,
  };
};

// =================== SERVICIO ===================
export const settingsService = {
  // Obtener todas las configuraciones
  get: async (): Promise<SettingsResponse> => {
    try {
      const { data } = await client.get(endpoints.settings);
      console.log('📥 Configuraciones recibidas:', data);
      
      // Si el backend devuelve datos vacíos, usar defaults
      if (!data || Object.keys(data).length === 0) {
        console.log('⚠️ No hay configuraciones en el backend, usando defaults');
        return {
          idCard: getDefaultIDCardConfig(),
          notifications: getDefaultNotificationsConfig(),
        };
      }
      
      return mapSettingsFromBackend(data);
    } catch (error) {
      console.error('❌ Error obteniendo configuraciones:', error);
      // En caso de error, devolver defaults
      return {
        idCard: getDefaultIDCardConfig(),
        notifications: getDefaultNotificationsConfig(),
      };
    }
  },

  // Actualizar todas las configuraciones
  update: async (settings: Partial<SettingsResponse>): Promise<SettingsResponse> => {
    const backendSettings = mapSettingsToBackend(settings);
    console.log('📤 Actualizando configuraciones:', backendSettings);
    const { data } = await client.put(endpoints.settingsUpdate, backendSettings);
    return mapSettingsFromBackend(data.data || data);
  },

  // Actualizar solo configuración de ID Card
  updateIDCardConfig: async (config: IDCardConfig): Promise<SettingsResponse> => {
    try {
      console.log('📤 Actualizando configuración de Tarjeta ID:', config);
      
      // Obtener configuraciones actuales
      const currentSettings = await settingsService.get();
      
      // Actualizar solo la parte de ID Card
      const updatedSettings: Partial<SettingsResponse> = {
        ...currentSettings,
        idCard: config,
      };
      
      const { data } = await client.put(endpoints.idCardUpdate, { idCard: config });
      return mapSettingsFromBackend(data.data || data || updatedSettings);
    } catch (error) {
      console.error('❌ Error actualizando Tarjeta ID:', error);
      throw error;
    }
  },

  // Actualizar solo configuración de notificaciones
  updateNotificationsConfig: async (config: NotificationsConfig): Promise<SettingsResponse> => {
    try {
      console.log('📤 Actualizando configuración de notificaciones:', config);
      
      // Obtener configuraciones actuales
      const currentSettings = await settingsService.get();
      
      // Actualizar solo la parte de notificaciones
      const updatedSettings: Partial<SettingsResponse> = {
        ...currentSettings,
        notifications: config,
      };
      
      const { data } = await client.put(endpoints.notificationsUpdate, { notifications: config });
      return mapSettingsFromBackend(data.data || data || updatedSettings);
    } catch (error) {
      console.error('❌ Error actualizando notificaciones:', error);
      throw error;
    }
  },
};