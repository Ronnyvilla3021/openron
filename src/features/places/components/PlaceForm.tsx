// src/features/places/components/PlaceForm.tsx
import { useState } from 'react';
import type { SafeZone } from '../types/place.types';

interface ZoneFormProps {
  zone?: SafeZone | null;           // ✅ Solo SafeZone
  onCancel: () => void;
  onSave: (zone: SafeZone) => void; // ✅ onSave recibe solo SafeZone
}

export const ZoneForm = ({ zone, onCancel, onSave }: ZoneFormProps) => {
  const [name, setName] = useState(zone?.name || '');
  const [lat, setLat] = useState(zone?.coordinates?.lat || 0);
  const [lng, setLng] = useState(zone?.coordinates?.lng || 0);
  const [radius, setRadius] = useState(zone?.radius || 100);

  const handleSubmit = () => {
    const newZone: SafeZone = {
      id: zone?.id || Date.now().toString(),
      name,
      coordinates: { lat, lng },
      radius,
      status: 'active',
      createdAt: zone?.createdAt || new Date().toISOString(),
    };
    onSave(newZone); // ✅ Tipado correcto
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">{zone ? 'Editar' : 'Nueva'} Zona</h2>
      <div className="space-y-2">
        <label>Nombre</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="border px-2 py-1 rounded w-full" />
      </div>
      <div className="space-y-2">
        <label>Latitud</label>
        <input type="number" value={lat} onChange={(e) => setLat(parseFloat(e.target.value))} className="border px-2 py-1 rounded w-full" />
      </div>
      <div className="space-y-2">
        <label>Longitud</label>
        <input type="number" value={lng} onChange={(e) => setLng(parseFloat(e.target.value))} className="border px-2 py-1 rounded w-full" />
      </div>
      <div className="space-y-2">
        <label>Radio (m)</label>
        <input type="number" value={radius} onChange={(e) => setRadius(parseFloat(e.target.value))} className="border px-2 py-1 rounded w-full" />
      </div>
      <div className="flex gap-2">
        <button onClick={onCancel} className="px-3 py-1 bg-gray-300 rounded">Cancelar</button>
        <button onClick={handleSubmit} className="px-3 py-1 bg-primary-500 text-white rounded">Guardar</button>
      </div>
    </div>
  );
};
