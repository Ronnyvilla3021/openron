// src/features/settings/screens/IDCardConfigScreen.tsx
import React, { useState, useEffect } from 'react';
import { IDCardFieldsConfig } from '../components/IDCardFieldsConfig';
import { QRConfig } from '../components/QRConfig';
import { Button } from '../../../shared/components/buttons/Button';
import { Card } from '../../../shared/components/cards/Card';
import { Alert } from '../../../shared/components/feedback/Alert';
import { SuccessMessage } from '../../../shared/components/feedback/SuccessMessage';
import { Loading } from '../../../shared/components/feedback/Loading';
import { useSettings } from '../hooks/useSettings';
import { useConfigUpdate } from '../hooks/useConfigUpdate';
import { cn, flexLayouts, gradients } from '../../../shared/utils/styles';
import type { IDCardField, QRConfigData } from '../types/settings.types';

export const IDCardConfigScreen: React.FC = () => {
  const { idCardConfig, loading, error } = useSettings();
  const { updateIDCard, saving, error: saveError, success } = useConfigUpdate();

  const [fields, setFields] = useState<IDCardField[]>([]);
  const [qrConfig, setQrConfig] = useState<QRConfigData>({
    includePhoto: false,
    includeEmergencyContacts: true,
    includeMedicalInfo: false,
    includeBloodType: false,
    includeAllergies: false,
    expirationDays: 30
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (idCardConfig) {
      setFields(idCardConfig.fields);
      setQrConfig(idCardConfig.qrConfig);
    }
  }, [idCardConfig]);

  useEffect(() => {
    if (idCardConfig) {
      const fieldsChanged = JSON.stringify(fields) !== JSON.stringify(idCardConfig.fields);
      const qrChanged = JSON.stringify(qrConfig) !== JSON.stringify(idCardConfig.qrConfig);
      setHasChanges(fieldsChanged || qrChanged);
    }
  }, [fields, qrConfig, idCardConfig]);

  const handleSave = async () => {
    await updateIDCard({ fields, qrConfig });
    setHasChanges(false);
  };

  const handleReset = () => {
    if (idCardConfig) {
      setFields(idCardConfig.fields);
      setQrConfig(idCardConfig.qrConfig);
      setHasChanges(false);
    }
  };

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
        {/* Header */}
        <div className={cn(gradients.primary, 'rounded-2xl p-8 mb-8 text-white shadow-lg')}>
          <div className={flexLayouts.between}>
            <div>
              <h1 className="text-3xl font-bold mb-2">
                🪪 Configuración de Tarjeta de Identificación
              </h1>
              <p className="text-primary-100 text-lg">
                Personaliza los campos de la tarjeta digital y la información del código QR
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 min-w-[200px]">
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">
                  {fields.filter(f => f.visible).length}
                </div>
                <div className="text-sm text-primary-100">
                  Campos Visibles
                </div>
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

        {/* Changes Warning */}
        {hasChanges && (
          <div className="mb-6">
            <Alert variant="warning" title="Cambios sin guardar">
              Has realizado cambios en la configuración. No olvides guardarlos.
            </Alert>
          </div>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          <Card
            title="Campos de la Tarjeta"
            subtitle="Configura qué campos son obligatorios, visibles y su orden"
            padding="none"
          >
            <div className="p-6">
              <IDCardFieldsConfig fields={fields} onChange={setFields} />
            </div>
          </Card>

          <Card
            title="Código QR"
            subtitle="Selecciona qué información se incluirá en el código QR"
            padding="none"
          >
            <div className="p-6">
              <QRConfig config={qrConfig} onChange={setQrConfig} />
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
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