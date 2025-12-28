// ÚNICA FUENTE DE VERDAD PARA TIPOS
export interface IDCardField {
  id: string;
  name: string;
  label: string;
  required: boolean;
  visible: boolean;
  order: number;
}

export interface QRConfigData {
  includePhoto: boolean;
  includeEmergencyContacts: boolean;
  includeMedicalInfo: boolean;
  includeBloodType: boolean;
  includeAllergies: boolean;
  expirationDays: number;
}

export interface IDCardConfig {
  fields: IDCardField[];
  qrConfig: QRConfigData;
}

export type NotificationChannel = 'push' | 'email' | 'sms';

export type NotificationType = 
  | 'route_start' 
  | 'route_end' 
  | 'safety_alert' 
  | 'support_message' 
  | 'emergency';

export interface ChannelConfig {
  channel: NotificationChannel;
  enabled: boolean;
  types: Record<NotificationType, boolean>;
}

export interface MessageTemplate {
  type: NotificationType;
  subject: string;
  body: string;
  variables: string[];
}

export interface NotificationsConfig {
  channels: ChannelConfig[];
  templates: MessageTemplate[];
  legalText: string;
}

export interface SettingsResponse {
  idCard: IDCardConfig;
  notifications: NotificationsConfig;
}