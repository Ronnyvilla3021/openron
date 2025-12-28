// src/features/settings/services/settingsService.ts
import type { 
  IDCardConfig, 
  NotificationsConfig, 
  SettingsResponse 
} from '../types/settings.types';

// Datos mock
const mockSettings: SettingsResponse = {
  idCard: {
    fields: [
      { id: '1', name: 'fullName', label: 'Nombre Completo', required: true, visible: true, order: 1 },
      { id: '2', name: 'birthDate', label: 'Fecha de Nacimiento', required: true, visible: true, order: 2 },
      { id: '3', name: 'documentNumber', label: 'Número de Documento', required: true, visible: true, order: 3 },
      { id: '4', name: 'bloodType', label: 'Tipo de Sangre', required: false, visible: true, order: 4 },
      { id: '5', name: 'allergies', label: 'Alergias', required: false, visible: true, order: 5 },
      { id: '6', name: 'emergencyContact', label: 'Contacto de Emergencia', required: false, visible: true, order: 6 }
    ],
    qrConfig: {
      includePhoto: true,
      includeEmergencyContacts: true,
      includeMedicalInfo: true,
      includeBloodType: true,
      includeAllergies: true,
      expirationDays: 30
    }
  },
  notifications: {
    channels: [
      { 
        channel: 'push', 
        enabled: true, 
        types: {
          route_start: true,
          route_end: true,
          safety_alert: true,
          support_message: true,
          emergency: true
        }
      },
      { 
        channel: 'email', 
        enabled: true, 
        types: {
          route_start: true,
          route_end: false,
          safety_alert: true,
          support_message: true,
          emergency: true
        }
      },
      { 
        channel: 'sms', 
        enabled: false, 
        types: {
          route_start: false,
          route_end: false,
          safety_alert: true,
          support_message: false,
          emergency: true
        }
      }
    ],
    templates: [
      {
        type: 'route_start',
        subject: 'Tu ruta ha comenzado',
        body: 'Hola {{userName}}, has iniciado tu ruta hacia {{destination}}. Tiempo estimado: {{estimatedTime}}.',
        variables: ['userName', 'destination', 'estimatedTime']
      },
      {
        type: 'route_end',
        subject: 'Ruta finalizada',
        body: 'Hola {{userName}}, has llegado a tu destino {{destination}} de forma segura.',
        variables: ['userName', 'destination']
      },
      {
        type: 'safety_alert',
        subject: 'Alerta de seguridad',
        body: 'Alerta: {{alertMessage}} en {{location}}. Por favor, toma precauciones.',
        variables: ['alertMessage', 'location']
      },
      {
        type: 'support_message',
        subject: 'Mensaje de soporte',
        body: 'Hola {{userName}}, el equipo de soporte te contacta sobre: {{issue}}.',
        variables: ['userName', 'issue']
      },
      {
        type: 'emergency',
        subject: 'EMERGENCIA - Asistencia requerida',
        body: 'EMERGENCIA: {{userName}} requiere asistencia inmediata en {{location}}. Contacto: {{emergencyContact}}.',
        variables: ['userName', 'location', 'emergencyContact']
      }
    ],
    legalText: 'Este mensaje es enviado por OpenBlind. Para dejar de recibir notificaciones, actualiza tus preferencias en la aplicación.'
  }
};

// Servicio
export const settingsService = {
  getSettings: async (): Promise<SettingsResponse> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockSettings;
  },

  updateIDCardConfig: async (config: IDCardConfig): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('ID Card config updated:', config);
  },

  updateNotificationsConfig: async (config: NotificationsConfig): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Notifications config updated:', config);
  }
};