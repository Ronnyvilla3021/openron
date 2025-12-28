// src/features/places/components/CriticalPointForm.tsx
import { useState } from 'react';
import type { CriticalPoint } from '../types/place.types';

interface CriticalPointFormProps {
  point?: CriticalPoint | null;
  onCancel: () => void;
  onSave: (point: CriticalPoint) => void;
}

export const CriticalPointForm = ({ point, onCancel, onSave }: CriticalPointFormProps) => {
  // Inicialización de estados
  const [name, setName] = useState(point?.name || '');
  const [lat, setLat] = useState(point?.coordinates?.lat ?? 0);
  const [lng, setLng] = useState(point?.coordinates?.lng ?? 0);
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>(point?.riskLevel || 'low');

  const handleSubmit = () => {
    const newPoint: CriticalPoint = {
      id: point?.id || Date.now().toString(),
      name,
      coordinates: { lat, lng },
      riskLevel,
      status: 'active',
      createdAt: point?.createdAt || new Date().toISOString(),
    };
    onSave(newPoint);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">{point ? 'Editar' : 'Nuevo'} Punto Crítico</h2>

      <div className="space-y-2">
        <label>Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
      </div>

      <div className="space-y-2">
        <label>Latitud</label>
        <input
          type="number"
          value={lat}
          onChange={(e) => setLat(parseFloat(e.target.value))}
          className="border px-2 py-1 rounded w-full"
        />
      </div>

      <div className="space-y-2">
        <label>Longitud</label>
        <input
          type="number"
          value={lng}
          onChange={(e) => setLng(parseFloat(e.target.value))}
          className="border px-2 py-1 rounded w-full"
        />
      </div>

      <div className="space-y-2">
        <label>Nivel de riesgo</label>
        <select
          value={riskLevel}
          onChange={(e) => setRiskLevel(e.target.value as 'low' | 'medium' | 'high')}
          className="border px-2 py-1 rounded w-full"
        >
          <option value="low">Bajo</option>
          <option value="medium">Medio</option>
          <option value="high">Alto</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 bg-gray-300 rounded"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-3 py-1 bg-primary-500 text-white rounded"
        >
          Guardar
        </button>
      </div>
    </div>
  );
};
