// src/features/settings/components/MessageTemplates.tsx
import React, { useState } from 'react';
import { cn, flexLayouts } from '../../../shared/utils/styles';
import { Badge } from '../../../shared/components/badges/Badge';

type NotificationType = 'route_start' | 'route_end' | 'safety_alert' | 'support_message' | 'emergency';

interface MessageTemplate {
  type: NotificationType;
  subject: string;
  body: string;
  variables: string[];
}

interface MessageTemplatesProps {
  templates: MessageTemplate[];
  legalText: string;
  onChange: (templates: MessageTemplate[], legalText: string) => void;
}

const templateLabels: Record<NotificationType, { label: string; icon: string; color: string }> = {
  'route_start': { label: 'Inicio de Ruta', icon: '🚶', color: 'info' },
  'route_end': { label: 'Fin de Ruta', icon: '✅', color: 'success' },
  'safety_alert': { label: 'Alerta de Seguridad', icon: '⚠️', color: 'warning' },
  'support_message': { label: 'Mensaje de Soporte', icon: '💬', color: 'secondary' },
  'emergency': { label: 'Emergencia', icon: '🚨', color: 'error' }
};

export const MessageTemplates: React.FC<MessageTemplatesProps> = ({
  templates,
  legalText,
  onChange
}) => {
  const [editingType, setEditingType] = useState<NotificationType | null>(null);
  const [previewType, setPreviewType] = useState<NotificationType | null>(null);

  const handleTemplateChange = (type: NotificationType, field: 'subject' | 'body', value: string) => {
    const updated = templates.map(template =>
      template.type === type ? { ...template, [field]: value } : template
    );
    onChange(updated, legalText);
  };

  const handleLegalTextChange = (value: string) => {
    onChange(templates, value);
  };

  const insertVariable = (type: NotificationType, variable: string) => {
    const template = templates.find(t => t.type === type);
    if (template) {
      const newBody = template.body + ` {{${variable}}}`;
      handleTemplateChange(type, 'body', newBody);
    }
  };

  const isTemplateComplete = (template: MessageTemplate) => {
    return template.subject.trim() !== '' && template.body.trim() !== '';
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-3">
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <h4 className="text-sm font-semibold text-neutral-900 mb-1">
              Personalización de Mensajes
            </h4>
            <p className="text-xs text-neutral-600">
              Usa variables dinámicas como {'{{'} userName {'}}'},  {'{{'} location {'}}'},  {'{{'} timestamp {'}}'} para personalizar tus mensajes
            </p>
          </div>
        </div>
        <div className="p-4 bg-white rounded-xl border-2 border-neutral-200 text-center">
          <div className="text-3xl font-bold text-primary-700">
            {templates.filter(isTemplateComplete).length}/{templates.length}
          </div>
          <div className="text-xs text-neutral-600 mt-1">Plantillas Completas</div>
        </div>
      </div>

      {/* Templates List */}
      <div className="space-y-4">
        {templates.map((template) => {
          const info = templateLabels[template.type];
          const isEditing = editingType === template.type;
          const isPreviewing = previewType === template.type;
          const isComplete = isTemplateComplete(template);

          return (
            <div
              key={template.type}
              className={cn(
                'rounded-2xl border-2 overflow-hidden transition-all duration-300',
                isEditing
                  ? 'border-primary-300 shadow-xl'
                  : 'border-neutral-200 hover:border-neutral-300 hover:shadow-md'
              )}
            >
              {/* Template Header */}
              <div className={cn(
                'p-5 transition-colors',
                isEditing
                  ? 'bg-gradient-to-r from-primary-50 to-primary-100'
                  : 'bg-white'
              )}>
                <div className={flexLayouts.between}>
                  <div className={flexLayouts.start}>
                    {/* Icon */}
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-md',
                      isEditing ? 'bg-white border-2 border-primary-200' : 'bg-neutral-100'
                    )}>
                      {info.icon}
                    </div>
                    
                    {/* Info */}
                    <div className="ml-4">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg font-bold text-neutral-900">
                          {info.label}
                        </h4>
                        <Badge
                          variant={isComplete ? 'success' : 'warning'}
                          size="sm"
                          rounded
                          dot
                        >
                          {isComplete ? 'Completa' : 'Incompleta'}
                        </Badge>
                      </div>
                      {!isEditing && (
                        <p className="text-sm text-neutral-600 line-clamp-1">
                          {template.subject || 'Sin asunto configurado'}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPreviewType(isPreviewing ? null : template.type)}
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                        isPreviewing
                          ? 'bg-info-600 text-white shadow-md'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Vista Previa
                      </span>
                    </button>
                    <button
                      onClick={() => setEditingType(isEditing ? null : template.type)}
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                        isEditing
                          ? 'bg-primary-600 text-white shadow-md'
                          : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                      )}
                    >
                      {isEditing ? 'Minimizar' : 'Editar'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Preview Mode */}
              {isPreviewing && !isEditing && (
                <div className="p-5 bg-neutral-50 border-t-2 border-neutral-200">
                  <div className="bg-white rounded-xl p-4 border-2 border-neutral-200 shadow-inner">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center text-xl">
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-neutral-900 mb-2">
                          {template.subject || <span className="text-neutral-400">Sin asunto</span>}
                        </div>
                        <div className="text-sm text-neutral-700 whitespace-pre-wrap">
                          {template.body || <span className="text-neutral-400">Sin contenido</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Edit Mode */}
              {isEditing && (
                <div className="p-6 bg-white border-t-2 border-primary-200 space-y-6">
                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-900 mb-2">
                      Asunto (para Email)
                    </label>
                    <input
                      type="text"
                      value={template.subject}
                      onChange={(e) => handleTemplateChange(template.type, 'subject', e.target.value)}
                      placeholder="Ej: Ruta iniciada - OpenBlind"
                      className={cn(
                        'w-full px-4 py-3 border-2 rounded-xl transition-all',
                        'focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500',
                        template.subject ? 'border-primary-300 bg-primary-50' : 'border-neutral-300'
                      )}
                    />
                  </div>

                  {/* Body */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-900 mb-2">
                      Contenido del Mensaje
                    </label>
                    <textarea
                      value={template.body}
                      onChange={(e) => handleTemplateChange(template.type, 'body', e.target.value)}
                      rows={5}
                      placeholder="Ej: Hola {{userName}}, has iniciado tu ruta hacia {{destination}}."
                      className={cn(
                        'w-full px-4 py-3 border-2 rounded-xl transition-all resize-none',
                        'focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500',
                        template.body ? 'border-primary-300 bg-primary-50' : 'border-neutral-300'
                      )}
                    />
                    <div className={cn(flexLayouts.between, 'mt-2')}>
                      <span className="text-xs text-neutral-500">
                        {template.body.length} caracteres
                      </span>
                      <span className={cn(
                        'text-xs font-medium',
                        template.body.length > 160 ? 'text-warning-600' : 'text-neutral-500'
                      )}>
                        {template.body.length > 160 ? 'Recomendado: menos de 160 caracteres para SMS' : ''}
                      </span>
                    </div>
                  </div>

                  {/* Variables */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-900 mb-3">
                      Variables Disponibles
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {template.variables.map((variable) => (
                        <button
                          key={variable}
                          onClick={() => insertVariable(template.type, variable)}
                          className="px-3 py-1.5 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 rounded-full text-xs font-medium hover:shadow-md hover:scale-105 transition-all border border-primary-200"
                        >
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            {'{{'} {variable} {'}}'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live Preview */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-900 mb-3">
                      Vista Previa en Vivo
                    </label>
                    <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 border-2 border-neutral-200 rounded-xl p-4 shadow-inner">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-xl">
                            {info.icon}
                          </div>
                          <div className="flex-1">
                            {template.subject && (
                              <div className="font-bold text-neutral-900 mb-2">
                                {template.subject}
                              </div>
                            )}
                            <div className="text-sm text-neutral-700 whitespace-pre-wrap">
                              {template.body || (
                                <span className="text-neutral-400 italic">
                                  Escribe un mensaje para ver la vista previa...
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legal Text Section */}
      <div className="border-t-4 border-neutral-200 pt-8">
        <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl p-6 border-2 border-neutral-200">
          <div className={flexLayouts.start}>
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-neutral-200 rounded-xl flex items-center justify-center text-2xl">
                📜
              </div>
            </div>
            <div className="ml-4 flex-1">
              <h4 className="font-bold text-neutral-900 mb-2 text-lg">
                Texto Legal y Aviso de Privacidad
              </h4>
              <p className="text-sm text-neutral-600 mb-4">
                Este texto aparecerá al final de todas las notificaciones por email como pie de página legal.
              </p>
              <textarea
                value={legalText}
                onChange={(e) => handleLegalTextChange(e.target.value)}
                rows={5}
                placeholder="Ej: Este mensaje fue enviado por OpenBlind. Para dejar de recibir notificaciones, actualiza tus preferencias en la aplicación."
                className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 text-sm resize-none bg-white"
              />
              <div className="mt-2 text-xs text-neutral-500">
                {legalText.length} caracteres
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};