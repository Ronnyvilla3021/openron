// src/features/settings/services/settingsService.ts
import client from "@/services/api/client/client";
import { endpoints } from "@/services/api/endpoints/endpoints";
import type { 
  SettingsResponse, 
  IDCardConfig, 
  NotificationsConfig 
} from "../types/settings.types";

export const settingsService = {
  // Obtener todas las configuraciones
  get: async (): Promise<SettingsResponse> => {
    const { data } = await client.get(endpoints.settings);
    return data;
  },

  // Actualizar todas las configuraciones
  update: async (settings: Partial<SettingsResponse>): Promise<SettingsResponse> => {
    const { data } = await client.put(endpoints.settings, settings);
    return data;
  },

  // Actualizar solo configuración de ID Card (opcional - puedes agregarlo si lo necesitas)
  updateIDCardConfig: async (config: IDCardConfig): Promise<SettingsResponse> => {
    // Obtener configuraciones actuales
    const currentSettings = await settingsService.get();
    
    // Actualizar solo la parte de ID Card
    const updatedSettings: Partial<SettingsResponse> = {
      ...currentSettings,
      idCard: config,
    };
    
    const { data } = await client.put(endpoints.settings, updatedSettings);
    return data;
  },

  // Actualizar solo configuración de notificaciones (opcional)
  updateNotificationsConfig: async (config: NotificationsConfig): Promise<SettingsResponse> => {
    // Obtener configuraciones actuales
    const currentSettings = await settingsService.get();
    
    // Actualizar solo la parte de notificaciones
    const updatedSettings: Partial<SettingsResponse> = {
      ...currentSettings,
      notifications: config,
    };
    
    const { data } = await client.put(endpoints.settings, updatedSettings);
    return data;
  },
};