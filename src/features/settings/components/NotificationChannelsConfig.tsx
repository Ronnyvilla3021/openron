// src/features/settings/components/NotificationChannelsConfig.tsx
import React from 'react';
import { cn, flexLayouts } from '../../../shared/utils/styles';
import { Badge } from '../../../shared/components/badges/Badge';

type NotificationChannel = 'push' | 'email' | 'sms';
type NotificationType = 'route_start' | 'route_end' | 'safety_alert' | 'support_message' | 'emergency';

interface ChannelConfig {
  channel: NotificationChannel;
  enabled: boolean;
  types: Record<NotificationType, boolean>;
}

interface NotificationChannelsConfigProps {
  channels: ChannelConfig[];
  onChange: (channels: ChannelConfig[]) => void;
}

const channelLabels: Record<NotificationChannel, { name: string; icon: string; description: string; color: string }> = {
  'push': {
    name: 'Push Notifications',
    icon: '📱',
    description: 'Notificaciones en tiempo real en la aplicación',
    color: 'primary'
  },
  'email': {
    name: 'Email',
    icon: '📧',
    description: 'Correo electrónico a la cuenta del usuario',
    color: 'success'
  },
  'sms': {
    name: 'SMS',
    icon: '💬',
    description: 'Mensajes de texto al número registrado',
    color: 'info'
  }
};

const typeLabels: Record<NotificationType, { label: string; icon: string }> = {
  'route_start': { label: 'Inicio de Ruta', icon: '🚶' },
  'route_end': { label: 'Fin de Ruta', icon: '✅' },
  'safety_alert': { label: 'Alerta de Seguridad', icon: '⚠️' },
  'support_message': { label: 'Mensaje de Soporte', icon: '💬' },
  'emergency': { label: 'Emergencia', icon: '🚨' }
};

export const NotificationChannelsConfig: React.FC<NotificationChannelsConfigProps> = ({
  channels,
  onChange
}) => {
  const handleToggleChannel = (channel: NotificationChannel) => {
    const updated = channels.map(ch =>
      ch.channel === channel ? { ...ch, enabled: !ch.enabled } : ch
    );
    onChange(updated);
  };

  const handleToggleType = (channel: NotificationChannel, type: NotificationType) => {
    const updated = channels.map(ch =>
      ch.channel === channel
        ? {
            ...ch,
            types: {
              ...ch.types,
              [type]: !ch.types[type]
            }
          }
        : ch
    );
    onChange(updated);
  };

  const handleToggleAllTypes = (channel: NotificationChannel, enable: boolean) => {
    const updated = channels.map(ch =>
      ch.channel === channel
        ? {
            ...ch,
            types: Object.keys(ch.types).reduce((acc, key) => ({
              ...acc,
              [key]: enable
            }), {} as Record<NotificationType, boolean>)
          }
        : ch
    );
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      {channels.map((channel) => {
        const channelInfo = channelLabels[channel.channel];
        const activeTypes = Object.values(channel.types).filter(Boolean).length;
        const totalTypes = Object.keys(channel.types).length;
        
        return (
          <div
            key={channel.channel}
            className={cn(
              'rounded-2xl border-2 transition-all duration-300',
              channel.enabled
                ? 'border-primary-300 bg-gradient-to-br from-primary-50 to-white shadow-lg'
                : 'border-neutral-200 bg-neutral-50'
            )}
          >
            {/* Channel Header */}
            <div className={cn(
              'p-6 border-b-2',
              channel.enabled ? 'border-primary-200' : 'border-neutral-200'
            )}>
              <div className={flexLayouts.between}>
                <div className={flexLayouts.start}>
                  {/* Icon */}
                  <div className={cn(
                    'w-14 h-14 rounded-xl flex items-center justify-center text-3xl shadow-md transition-all',
                    channel.enabled
                      ? 'bg-white border-2 border-primary-200'
                      : 'bg-neutral-200 border-2 border-neutral-300'
                  )}>
                    {channelInfo.icon}
                  </div>
                  
                  {/* Info */}
                  <div className="ml-4">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-lg font-bold text-neutral-900">
                        {channelInfo.name}
                      </h4>
                      <Badge
                        variant={channel.enabled ? 'success' : 'neutral'}
                        size="sm"
                        rounded
                        dot
                      >
                        {channel.enabled ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </div>
                    <p className="text-sm text-neutral-600">
                      {channelInfo.description}
                    </p>
                    {channel.enabled && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-neutral-500">
                          {activeTypes} de {totalTypes} tipos activos
                        </span>
                        <div className="flex-1 max-w-xs bg-neutral-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-primary-500 h-full transition-all duration-300"
                            style={{ width: `${(activeTypes / totalTypes) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Toggle Switch */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={channel.enabled}
                    onChange={() => handleToggleChannel(channel.channel)}
                    className="sr-only peer"
                  />
                  <div className={cn(
                    'w-16 h-8 rounded-full transition-all duration-200',
                    'peer-checked:bg-primary-600 bg-neutral-300',
                    'peer-focus:ring-4 peer-focus:ring-primary-200'
                  )} />
                  <div className={cn(
                    'absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 shadow-md',
                    'peer-checked:translate-x-8'
                  )} />
                </label>
              </div>
            </div>

            {/* Channel Types */}
            {channel.enabled && (
              <div className="p-6 space-y-3">
                {/* Quick Actions */}
                <div className={cn(flexLayouts.between, 'mb-4')}>
                  <h5 className="text-sm font-semibold text-neutral-700">
                    Tipos de Notificación
                  </h5>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleAllTypes(channel.channel, true)}
                      className="px-3 py-1 text-xs font-medium text-primary-700 bg-primary-100 hover:bg-primary-200 rounded-lg transition-colors"
                    >
                      Activar Todas
                    </button>
                    <button
                      onClick={() => handleToggleAllTypes(channel.channel, false)}
                      className="px-3 py-1 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                    >
                      Desactivar Todas
                    </button>
                  </div>
                </div>

                {/* Types Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(channel.types).map(([type, enabled]) => {
                    const typeInfo = typeLabels[type as NotificationType];
                    return (
                      <label
                        key={type}
                        className={cn(
                          'relative flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200',
                          enabled
                            ? 'border-primary-300 bg-primary-50 shadow-md'
                            : 'border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm'
                        )}
                      >
                        <span className="text-2xl">{typeInfo.icon}</span>
                        <div className="flex-1 min-w-0">
                          <span className={cn(
                            'text-sm font-medium',
                            enabled ? 'text-primary-900' : 'text-neutral-700'
                          )}>
                            {typeInfo.label}
                          </span>
                        </div>
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={enabled}
                            onChange={() => handleToggleType(channel.channel, type as NotificationType)}
                            className="sr-only peer"
                          />
                          <div className={cn(
                            'w-11 h-6 rounded-full transition-all duration-200',
                            'peer-checked:bg-primary-600 bg-neutral-300'
                          )} />
                          <div className={cn(
                            'absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200',
                            'peer-checked:translate-x-5'
                          )} />
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Disabled State Message */}
            {!channel.enabled && (
              <div className="p-6">
                <div className="flex items-center justify-center gap-2 text-neutral-500 text-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Activa este canal para configurar los tipos de notificación</span>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-xl border border-neutral-200">
        {channels.map((channel) => {
          const channelInfo = channelLabels[channel.channel];
          const activeTypes = Object.values(channel.types).filter(Boolean).length;
          const totalTypes = Object.keys(channel.types).length;

          return (
            <div
              key={channel.channel}
              className="flex items-center gap-3 p-3 bg-white rounded-lg border border-neutral-200"
            >
              <span className="text-2xl">{channelInfo.icon}</span>
              <div className="flex-1">
                <div className="text-sm font-semibold text-neutral-900">
                  {channelInfo.name}
                </div>
                <div className="text-xs text-neutral-600">
                  {channel.enabled ? (
                    <span className="text-success-600 font-medium">
                      ✓ {activeTypes}/{totalTypes} tipos activos
                    </span>
                  ) : (
                    <span className="text-neutral-400">✗ Desactivado</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};