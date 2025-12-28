// src/features/settings/screens/NotificationsConfigScreen.tsx
import React, { useState, useEffect } from 'react';
import { NotificationChannelsConfig } from '../components/NotificationChannelsConfig';
import { MessageTemplates } from '../components/MessageTemplates';
import { Button } from '../../../shared/components/buttons/Button';
import { Card } from '../../../shared/components/cards/Card';
import { Badge } from '../../../shared/components/badges/Badge';
import { Alert } from '../../../shared/components/feedback/Alert';
import { SuccessMessage } from '../../../shared/components/feedback/SuccessMessage';
import { Loading } from '../../../shared/components/feedback/Loading';
import { useSettings } from '../hooks/useSettings';
import { useConfigUpdate } from '../hooks/useConfigUpdate';
import { cn, flexLayouts, gradients } from '../../../shared/utils/styles';

// Tipos locales - deben coincidir EXACTAMENTE con los de los componentes
type NotificationType = 'route_start' | 'route_end' | 'safety_alert' | 'support_message' | 'emergency';
type NotificationChannel = 'push' | 'email' | 'sms';

interface ChannelConfig {
  channel: NotificationChannel;
  enabled: boolean;
  types: Record<NotificationType, boolean>;
}

interface MessageTemplate {
  type: NotificationType;
  subject: string;
  body: string;
  variables: string[];
}

export const NotificationsConfigScreen: React.FC = () => {
  const { notificationsConfig, loading, error } = useSettings();
  const { updateNotifications, saving, error: saveError, success } = useConfigUpdate();

  const [channels, setChannels] = useState<ChannelConfig[]>([]);
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [legalText, setLegalText] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (notificationsConfig) {
      setChannels(notificationsConfig.channels as ChannelConfig[]);
      setTemplates(notificationsConfig.templates as MessageTemplate[]);
      setLegalText(notificationsConfig.legalText);
    }
  }, [notificationsConfig]);

  useEffect(() => {
    if (notificationsConfig) {
      const channelsChanged = JSON.stringify(channels) !== JSON.stringify(notificationsConfig.channels);
      const templatesChanged = JSON.stringify(templates) !== JSON.stringify(notificationsConfig.templates);
      const legalChanged = legalText !== notificationsConfig.legalText;
      setHasChanges(channelsChanged || templatesChanged || legalChanged);
    }
  }, [channels, templates, legalText, notificationsConfig]);

  const handleSave = async () => {
    await updateNotifications({ channels, templates, legalText });
    setHasChanges(false);
  };

  const handleReset = () => {
    if (notificationsConfig) {
      setChannels(notificationsConfig.channels as ChannelConfig[]);
      setTemplates(notificationsConfig.templates as MessageTemplate[]);
      setLegalText(notificationsConfig.legalText);
      setHasChanges(false);
    }
  };

  const handleTemplateChange = (newTemplates: MessageTemplate[], newLegalText: string) => {
    setTemplates(newTemplates);
    setLegalText(newLegalText);
  };

  // Calcular estadísticas
  const activeChannels = channels.filter(c => c.enabled).length;
  const totalChannels = channels.length;
  const completeTemplates = templates.filter(t => t.subject && t.body).length;
  const totalTemplates = templates.length;
  const totalActiveNotifications = channels.reduce((acc, ch) => {
    if (!ch.enabled) return acc;
    return acc + Object.values(ch.types).filter(Boolean).length;
  }, 0);

  if (loading) {
    return (
      <div className={cn(flexLayouts.center, 'min-h-[60vh]')}>
        <Loading size="lg" text="Cargando configuración..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Alert variant="error" title="Error al cargar">
          {error}
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header con Gradiente */}
        <div className={cn(
          gradients.cool,
          'rounded-2xl p-8 mb-8 text-white shadow-lg'
        )}>
          <div className={flexLayouts.between}>
            <div>
              <h1 className="text-3xl font-bold mb-2">
                🔔 Configuración de Notificaciones
              </h1>
              <p className="text-blue-100 text-lg">
                Gestiona los canales de comunicación y personaliza los mensajes
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center min-w-[120px]">
                <div className="text-3xl font-bold mb-1">{activeChannels}/{totalChannels}</div>
                <div className="text-xs text-blue-100">Canales Activos</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center min-w-[120px]">
                <div className="text-3xl font-bold mb-1">{completeTemplates}/{totalTemplates}</div>
                <div className="text-xs text-blue-100">Plantillas Listas</div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <SuccessMessage
          message="✅ Configuración guardada exitosamente"
          show={success}
          onClose={() => {}}
        />

        {/* Error Message */}
        {saveError && (
          <div className="mb-6">
            <Alert variant="error" dismissible onDismiss={() => {}}>
              {saveError}
            </Alert>
          </div>
        )}

        {/* Changes Indicator */}
        {hasChanges && (
          <div className="mb-6">
            <Alert variant="warning" title="Cambios sin guardar">
              Has realizado cambios en la configuración. No olvides guardarlos.
            </Alert>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          {/* Configuración de Canales */}
          <Card
            title="Canales de Notificación"
            subtitle="Activa y configura los canales de comunicación disponibles"
            headerAction={
              <div className="flex items-center gap-2">
                <Badge variant="info" rounded>
                  {totalActiveNotifications} notificaciones activas
                </Badge>
              </div>
            }
            padding="none"
          >
            <div className="p-6">
              <NotificationChannelsConfig channels={channels} onChange={setChannels} />
            </div>
          </Card>

          {/* Plantillas de Mensajes */}
          <Card
            title="Plantillas de Mensajes"
            subtitle="Personaliza el contenido de cada tipo de notificación"
            headerAction={
              <Button
                variant="ghost"
                size="sm"
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              >
                Ayuda con Variables
              </Button>
            }
            padding="none"
          >
            <div className="p-6">
              <MessageTemplates
                templates={templates}
                legalText={legalText}
                onChange={handleTemplateChange}
              />
            </div>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card variant="bordered" padding="md" hoverable>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl mb-3">
                <span className="text-2xl">📱</span>
              </div>
              <div className="text-2xl font-bold text-neutral-900 mb-1">
                {channels.find(c => c.channel === 'push')?.enabled ? '✓' : '✗'}
              </div>
              <div className="text-sm text-neutral-600">Push Notifications</div>
              <Badge 
                variant={channels.find(c => c.channel === 'push')?.enabled ? 'success' : 'neutral'} 
                size="sm" 
                className="mt-2"
                rounded
              >
                {channels.find(c => c.channel === 'push')?.enabled ? 'Activo' : 'Inactivo'}
              </Badge>
            </div>
          </Card>

          <Card variant="bordered" padding="md" hoverable>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-success-100 rounded-xl mb-3">
                <span className="text-2xl">📧</span>
              </div>
              <div className="text-2xl font-bold text-neutral-900 mb-1">
                {channels.find(c => c.channel === 'email')?.enabled ? '✓' : '✗'}
              </div>
              <div className="text-sm text-neutral-600">Email</div>
              <Badge 
                variant={channels.find(c => c.channel === 'email')?.enabled ? 'success' : 'neutral'} 
                size="sm" 
                className="mt-2"
                rounded
              >
                {channels.find(c => c.channel === 'email')?.enabled ? 'Activo' : 'Inactivo'}
              </Badge>
            </div>
          </Card>

          <Card variant="bordered" padding="md" hoverable>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-info-100 rounded-xl mb-3">
                <span className="text-2xl">💬</span>
              </div>
              <div className="text-2xl font-bold text-neutral-900 mb-1">
                {channels.find(c => c.channel === 'sms')?.enabled ? '✓' : '✗'}
              </div>
              <div className="text-sm text-neutral-600">SMS</div>
              <Badge 
                variant={channels.find(c => c.channel === 'sms')?.enabled ? 'success' : 'neutral'} 
                size="sm" 
                className="mt-2"
                rounded
              >
                {channels.find(c => c.channel === 'sms')?.enabled ? 'Activo' : 'Inactivo'}
              </Badge>
            </div>
          </Card>

          <Card variant="bordered" padding="md" hoverable>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-warning-100 rounded-xl mb-3">
                <span className="text-2xl">📊</span>
              </div>
              <div className="text-2xl font-bold text-neutral-900 mb-1">
                {totalActiveNotifications}
              </div>
              <div className="text-sm text-neutral-600">Total Configuradas</div>
              <Badge variant="warning" size="sm" className="mt-2" rounded>
                De {channels.length * 5} posibles
              </Badge>
            </div>
          </Card>
        </div>

        {/* Info Box */}
        <Card variant="bordered" className="mb-8">
          <div className={flexLayouts.start}>
            <div className="flex-shrink-0">
              <div className="bg-purple-100 p-3 rounded-xl">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <div className="ml-4 flex-1">
              <h4 className="font-semibold text-neutral-900 mb-2">💡 Mejores Prácticas</h4>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-start gap-2">
                  <span className="text-success-500 mt-0.5">✓</span>
                  <span>Usa variables dinámicas como {'{{'} userName {'}}'}  para personalizar mensajes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success-500 mt-0.5">✓</span>
                  <span>Mantén los mensajes concisos y claros, especialmente para SMS</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success-500 mt-0.5">✓</span>
                  <span>Incluye siempre información de contacto en notificaciones de emergencia</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success-500 mt-0.5">✓</span>
                  <span>Prueba las plantillas antes de activarlas en producción</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Botones de acción - Sticky Footer */}
        <div className="sticky bottom-6 bg-white border border-neutral-200 rounded-xl p-4 shadow-lg animate-slide-in-up">
          <div className={flexLayouts.between}>
            <div className="flex items-center gap-3">
              {hasChanges && (
                <span className="flex items-center gap-2 text-sm text-warning-700 bg-warning-50 px-3 py-1.5 rounded-lg">
                  <span className="w-2 h-2 bg-warning-500 rounded-full animate-pulse" />
                  Cambios sin guardar
                </span>
              )}
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="ghost" 
                size="md"
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                }
              >
                Vista Previa
              </Button>
              
              <Button 
                variant="secondary" 
                onClick={handleReset} 
                disabled={saving || !hasChanges}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                }
              >
                Restablecer
              </Button>
              
              <Button 
                variant="primary" 
                onClick={handleSave} 
                loading={saving}
                disabled={!hasChanges}
                leftIcon={
                  !saving && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                  )
                }
              >
                Guardar Configuración
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};