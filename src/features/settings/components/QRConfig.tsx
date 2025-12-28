// src/features/settings/components/QRConfig.tsx
import React from 'react';
import { cn, flexLayouts } from '../../../shared/utils/styles';

interface QRConfigData {
  includePhoto: boolean;
  includeEmergencyContacts: boolean;
  includeMedicalInfo: boolean;
  includeBloodType: boolean;
  includeAllergies: boolean;
  expirationDays: number;
}

interface QRConfigProps {
  config: QRConfigData;
  onChange: (config: QRConfigData) => void;
}

const QROption: React.FC<{
  icon: string;
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
  recommended?: boolean;
}> = ({ icon, title, description, checked, onChange, recommended }) => (
  <label
    className={cn(
      'relative flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200',
      checked
        ? 'border-primary-400 bg-primary-50 shadow-md'
        : 'border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm'
    )}
  >
    <div className="flex-shrink-0">
      <div className={cn(
        'w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all',
        checked ? 'bg-primary-100' : 'bg-neutral-100'
      )}>
        {icon}
      </div>
    </div>
    
    <div className="flex-1 min-w-0">
      <div className={flexLayouts.between}>
        <div>
          <div className="font-semibold text-neutral-900 mb-1">
            {title}
          </div>
          <div className="text-xs text-neutral-600">
            {description}
          </div>
        </div>
      </div>
    </div>
    
    <div className="flex-shrink-0">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500 cursor-pointer"
      />
    </div>

    {recommended && (
      <div className="absolute -top-2 -right-2 bg-success-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
        Recomendado
      </div>
    )}
  </label>
);

export const QRConfig: React.FC<QRConfigProps> = ({ config, onChange }) => {
  const handleToggle = (field: keyof QRConfigData) => {
    if (field === 'expirationDays') return;
    onChange({
      ...config,
      [field]: !config[field]
    });
  };

  const handleExpirationChange = (days: number) => {
    onChange({
      ...config,
      expirationDays: Math.max(1, Math.min(90, days))
    });
  };

  const activeCount = Object.entries(config)
    .filter(([key, value]) => key !== 'expirationDays' && value === true)
    .length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-info-50 to-primary-50 rounded-xl border border-info-200">
        <div>
          <h4 className="text-sm font-semibold text-neutral-900 mb-1">
            Información en el QR
          </h4>
          <p className="text-xs text-neutral-600">
            Selecciona qué datos se incluirán en el código QR
          </p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary-700">{activeCount}/5</div>
          <div className="text-xs text-neutral-600">Activados</div>
        </div>
      </div>

      {/* Options Grid */}
      <div className="space-y-3">
        <QROption
          icon="📷"
          title="Foto de Perfil"
          description="Incluye la fotografía del usuario en el código QR"
          checked={config.includePhoto}
          onChange={() => handleToggle('includePhoto')}
        />

        <QROption
          icon="🆘"
          title="Contactos de Emergencia"
          description="Nombres y teléfonos de los contactos principales"
          checked={config.includeEmergencyContacts}
          onChange={() => handleToggle('includeEmergencyContacts')}
          recommended
        />

        <QROption
          icon="🏥"
          title="Información Médica"
          description="Condiciones médicas y datos relevantes de salud"
          checked={config.includeMedicalInfo}
          onChange={() => handleToggle('includeMedicalInfo')}
          recommended
        />

        <QROption
          icon="🩸"
          title="Tipo de Sangre"
          description="Grupo sanguíneo y factor RH"
          checked={config.includeBloodType}
          onChange={() => handleToggle('includeBloodType')}
        />

        <QROption
          icon="⚠️"
          title="Alergias"
          description="Lista completa de alergias conocidas"
          checked={config.includeAllergies}
          onChange={() => handleToggle('includeAllergies')}
          recommended
        />
      </div>

      {/* Expiration Config */}
      <div className="p-6 bg-gradient-to-br from-warning-50 to-error-50 border-2 border-warning-200 rounded-xl">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center text-xl">
              ⏱️
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-900 mb-1">
              Tiempo de Expiración del QR
            </h4>
            <p className="text-sm text-neutral-600">
              Por seguridad, el código QR expirará automáticamente después del período configurado
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Slider */}
          <div>
            <div className={cn(flexLayouts.between, 'mb-2')}>
              <span className="text-sm font-medium text-neutral-700">Días hasta expirar</span>
              <span className="text-sm text-neutral-500">
                {config.expirationDays === 1 ? '1 día' : 
                 config.expirationDays === 7 ? '1 semana' :
                 config.expirationDays === 30 ? '1 mes' :
                 config.expirationDays === 90 ? '3 meses' :
                 `${config.expirationDays} días`}
              </span>
            </div>
            
            <input
              type="range"
              min="1"
              max="90"
              value={config.expirationDays}
              onChange={(e) => handleExpirationChange(parseInt(e.target.value))}
              className="w-full h-3 bg-warning-200 rounded-lg appearance-none cursor-pointer slider-thumb"
              style={{
                background: `linear-gradient(to right, 
                  rgb(251 146 60) 0%, 
                  rgb(251 146 60) ${(config.expirationDays / 90) * 100}%, 
                  rgb(254 215 170) ${(config.expirationDays / 90) * 100}%, 
                  rgb(254 215 170) 100%)`
              }}
            />
            
            <div className={cn(flexLayouts.between, 'mt-2 text-xs text-neutral-500')}>
              <span>1 día</span>
              <span>90 días</span>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { days: 1, label: '1 día' },
              { days: 7, label: '1 semana' },
              { days: 30, label: '1 mes' },
              { days: 90, label: '3 meses' }
            ].map(preset => (
              <button
                key={preset.days}
                onClick={() => handleExpirationChange(preset.days)}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all',
                  config.expirationDays === preset.days
                    ? 'bg-warning-600 text-white shadow-md'
                    : 'bg-white text-neutral-700 border border-neutral-300 hover:border-warning-300 hover:bg-warning-50'
                )}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Value Display */}
          <div className={cn(flexLayouts.center, 'gap-3')}>
            <input
              type="number"
              min="1"
              max="90"
              value={config.expirationDays}
              onChange={(e) => handleExpirationChange(parseInt(e.target.value) || 1)}
              className="w-24 px-3 py-2 border-2 border-warning-300 rounded-lg text-center font-bold text-lg text-warning-900 focus:border-warning-500 focus:ring-2 focus:ring-warning-200"
            />
            <span className="text-sm font-medium text-neutral-700">días hasta expiración</span>
          </div>
        </div>
      </div>

      {/* Security Info */}
      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
        <div className={flexLayouts.start}>
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-xl">
              🔒
            </div>
          </div>
          <div className="ml-3">
            <h5 className="font-semibold text-green-900 text-sm mb-2">
              Seguridad y Privacidad
            </h5>
            <ul className="space-y-1 text-xs text-green-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Los datos médicos sensibles se cifran con AES-256 antes de generar el QR</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>El código QR se genera bajo demanda y expira automáticamente</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Solo personal autorizado puede escanear y acceder a la información</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};