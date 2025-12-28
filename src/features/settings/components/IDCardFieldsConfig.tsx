// src/features/settings/components/IDCardFieldsConfig.tsx
import React from 'react';
import { cn, flexLayouts } from '../../../shared/utils/styles';

interface IDCardField {
  id: string;
  name: string;
  label: string;
  required: boolean;
  visible: boolean;
  order: number;
}

interface IDCardFieldsConfigProps {
  fields: IDCardField[];
  onChange: (fields: IDCardField[]) => void;
}

export const IDCardFieldsConfig: React.FC<IDCardFieldsConfigProps> = ({ fields, onChange }) => {
  const handleToggleRequired = (fieldId: string) => {
    const updated = fields.map(field =>
      field.id === fieldId ? { ...field, required: !field.required } : field
    );
    onChange(updated);
  };

  const handleToggleVisible = (fieldId: string) => {
    const updated = fields.map(field =>
      field.id === fieldId ? { ...field, visible: !field.visible } : field
    );
    onChange(updated);
  };

  const handleOrderChange = (fieldId: string, newOrder: number) => {
    const updated = fields.map(field =>
      field.id === fieldId ? { ...field, order: newOrder } : field
    );
    onChange(updated.sort((a, b) => a.order - b.order));
  };

  const moveField = (fieldId: string, direction: 'up' | 'down') => {
    const currentIndex = fields.findIndex(f => f.id === fieldId);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === fields.length - 1)
    ) {
      return;
    }

    const newFields = [...fields];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    [newFields[currentIndex], newFields[targetIndex]] = [newFields[targetIndex], newFields[currentIndex]];
    
    // Actualizar órdenes
    const reordered = newFields.map((field, index) => ({ ...field, order: index + 1 }));
    onChange(reordered);
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
        <div>
          <h4 className="text-sm font-semibold text-neutral-900">
            Campos Configurables
          </h4>
          <p className="text-xs text-neutral-500 mt-0.5">
            Total: {fields.length} campos | Visibles: {fields.filter(f => f.visible).length} | Obligatorios: {fields.filter(f => f.required).length}
          </p>
        </div>
      </div>

      {/* Fields List */}
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className={cn(
              'group relative rounded-xl border-2 transition-all duration-200',
              field.visible
                ? 'border-primary-200 bg-primary-50/50 hover:border-primary-300 hover:shadow-md'
                : 'border-neutral-200 bg-neutral-50 hover:border-neutral-300'
            )}
          >
            <div className="flex items-center gap-4 p-4">
              {/* Drag Handle & Order */}
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => moveField(field.id, 'up')}
                    disabled={index === 0}
                    className="p-1 text-neutral-400 hover:text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Subir"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => moveField(field.id, 'down')}
                    disabled={index === fields.length - 1}
                    className="p-1 text-neutral-400 hover:text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Bajar"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex items-center justify-center w-10 h-10 bg-white border-2 border-neutral-200 rounded-lg font-bold text-neutral-700">
                  {field.order}
                </div>
              </div>

              {/* Field Info */}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-neutral-900 truncate">
                  {field.label}
                </div>
                <div className="text-xs text-neutral-500 font-mono">
                  {field.name}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-6">
                {/* Order Input */}
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-neutral-600 whitespace-nowrap">
                    Orden:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={fields.length}
                    value={field.order}
                    onChange={(e) => handleOrderChange(field.id, parseInt(e.target.value) || 1)}
                    className="w-16 px-2 py-1 border-2 border-neutral-300 rounded-lg text-center text-sm font-semibold focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                  />
                </div>

                {/* Toggle Visible */}
                <label className={cn(
                  flexLayouts.center,
                  'gap-2 cursor-pointer group/toggle'
                )}>
                  <span className="text-xs font-medium text-neutral-700 whitespace-nowrap">
                    Visible
                  </span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={field.visible}
                      onChange={() => handleToggleVisible(field.id)}
                      className="sr-only peer"
                    />
                    <div className={cn(
                      'w-11 h-6 rounded-full transition-all duration-200',
                      'peer-checked:bg-primary-600 bg-neutral-300',
                      'peer-focus:ring-4 peer-focus:ring-primary-200'
                    )} />
                    <div className={cn(
                      'absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200',
                      'peer-checked:translate-x-5'
                    )} />
                  </div>
                </label>

                {/* Toggle Obligatorio */}
                <label className={cn(
                  flexLayouts.center,
                  'gap-2 cursor-pointer',
                  !field.visible && 'opacity-50 cursor-not-allowed'
                )}>
                  <span className="text-xs font-medium text-neutral-700 whitespace-nowrap">
                    Obligatorio
                  </span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={() => handleToggleRequired(field.id)}
                      disabled={!field.visible}
                      className="sr-only peer"
                    />
                    <div className={cn(
                      'w-11 h-6 rounded-full transition-all duration-200',
                      'peer-checked:bg-error-600 bg-neutral-300',
                      'peer-focus:ring-4 peer-focus:ring-error-200',
                      'peer-disabled:opacity-50 peer-disabled:cursor-not-allowed'
                    )} />
                    <div className={cn(
                      'absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200',
                      'peer-checked:translate-x-5'
                    )} />
                  </div>
                </label>
              </div>
            </div>

            {/* Visual Indicator */}
            {field.required && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-error-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                !
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-xl">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary-700">{fields.length}</div>
            <div className="text-xs text-neutral-600">Total Campos</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-success-700">{fields.filter(f => f.visible).length}</div>
            <div className="text-xs text-neutral-600">Visibles</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-error-700">{fields.filter(f => f.required).length}</div>
            <div className="text-xs text-neutral-600">Obligatorios</div>
          </div>
        </div>
      </div>
    </div>
  );
};