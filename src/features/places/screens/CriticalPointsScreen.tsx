// src/features/places/screens/CriticalPointsScreen.tsx
import { useState } from 'react';
import { useZones } from '../hooks/useZones';
import { CriticalPointsTable } from '../components/CriticalPointsTable';
import type { CriticalPoint } from '../types/place.types';
import { Modal } from '../../../shared/components/modals/Modal';
import { CriticalPointForm } from '../components/CriticalPointForm';

export const CriticalPointsScreen = () => {
  const {
    criticalPoints,
    loading,
    addCriticalPoint,
    updateCriticalPoint,
    deactivateCriticalPoint,
  } = useZones();

  const [selectedPoint, setSelectedPoint] = useState<CriticalPoint | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  if (loading) return <p className="p-6">Cargando puntos críticos...</p>;

  const handleSave = (point: Omit<CriticalPoint, 'id' | 'createdAt'> | CriticalPoint) => {
    // Si el punto tiene ID, es una actualización
    if ('id' in point && point.id) {
      // Extraer solo los campos que se pueden actualizar
      const { id, createdAt, ...updateData } = point;
      updateCriticalPoint(id, updateData);
    } else {
      // Si no tiene ID, es una creación
      addCriticalPoint(point);
    }
    setModalOpen(false);
    setSelectedPoint(null);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Puntos Críticos</h1>

      <button
        className="px-3 py-1 bg-primary-500 text-white rounded"
        onClick={() => { setSelectedPoint(null); setModalOpen(true); }}
      >
        Nuevo Punto Crítico
      </button>

      <CriticalPointsTable
        points={criticalPoints}
        onEdit={(point) => { setSelectedPoint(point); setModalOpen(true); }}
        onDelete={(point) => deactivateCriticalPoint(point.id)}
      />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <CriticalPointForm
          point={selectedPoint}
          onCancel={() => {
            setModalOpen(false);
            setSelectedPoint(null);
          }}
          onSave={handleSave}
        />
      </Modal>
    </div>
  );
};