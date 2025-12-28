// src/features/places/screens/SafeZonesScreen.tsx
import { useState } from 'react';
import { useZones } from '../hooks/useZones';
import SafeZonesTable from '../components/SafeZonesTable';
import type { SafeZone } from '../types/place.types';
import { Modal } from '../../../shared/components/modals/Modal';
import { ZoneForm } from '../components/PlaceForm';

export const SafeZonesScreen = () => {
  const { safeZones, loading, addSafeZone, updateSafeZone, deactivateSafeZone } = useZones();
  const [selectedZone, setSelectedZone] = useState<SafeZone | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  if (loading) return <p className="p-6">Cargando zonas seguras...</p>;

  const handleSave = (zone: SafeZone) => {
    if (safeZones.find((z) => z.id === zone.id)) updateSafeZone(zone);
    else addSafeZone(zone);
    setModalOpen(false);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Zonas Seguras</h1>
      <button
        className="px-3 py-1 bg-primary-500 text-white rounded"
        onClick={() => { setSelectedZone(null); setModalOpen(true); }}
      >
        Nueva Zona
      </button>

      <SafeZonesTable
        zones={safeZones}
        onEdit={(zone) => { setSelectedZone(zone); setModalOpen(true); }}
        onDelete={(zone) => deactivateSafeZone(zone.id)}
      />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ZoneForm zone={selectedZone} onCancel={() => setModalOpen(false)} onSave={handleSave} />
      </Modal>
    </div>
  );
};
