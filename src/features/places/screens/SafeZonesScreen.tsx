// src/features/places/screens/SafeZonesScreen.tsx
import { useState } from 'react';
import { useZones } from '../hooks/useZones';
import { SafeZonesTable } from '../components/SafeZonesTable';
import type { SafeZone } from '../types/place.types';

export const SafeZonesScreen = () => {
  const { 
    safeZones, 
    loading, 
    error, 
    addSafeZone, 
    updateSafeZone, 
    deactivateSafeZone 
  } = useZones();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingZone, setEditingZone] = useState<SafeZone | null>(null);
  const [formData, setFormData] = useState<Omit<SafeZone, 'id' | 'createdAt'>>({
    name: '',
    coordinates: { lat: 0, lng: 0 },
    radius: 100,
    status: 'active'
  });

  const handleAddZone = async (zoneData: Omit<SafeZone, 'id' | 'createdAt'>) => {
    try {
      await addSafeZone(zoneData);
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error al agregar zona:', error);
      alert('Error al agregar la zona');
    }
  };

  const handleEditZone = (zone: SafeZone) => {
    setEditingZone(zone);
    setFormData({
      name: zone.name,
      coordinates: zone.coordinates || { lat: 0, lng: 0 },
      radius: zone.radius || 100,
      status: zone.status
    });
    setIsModalOpen(true);
  };

  const handleUpdateZone = async (zoneData: Partial<SafeZone>) => {
    if (!editingZone) return;
    
    try {
      await updateSafeZone(editingZone.id, zoneData);
      setIsModalOpen(false);
      setEditingZone(null);
      resetForm();
    } catch (error) {
      console.error('Error al actualizar zona:', error);
      alert('Error al actualizar la zona');
    }
  };

  const handleDeactivateZone = async (id: string) => {
    if (confirm('¿Estás seguro de desactivar esta zona segura?')) {
      try {
        await deactivateSafeZone(id);
      } catch (error) {
        console.error('Error al desactivar zona:', error);
        alert('Error al desactivar la zona');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      coordinates: { lat: 0, lng: 0 },
      radius: 100,
      status: 'active'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingZone) {
      handleUpdateZone(formData);
    } else {
      handleAddZone(formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'lat' || name === 'lng') {
      setFormData(prev => ({
        ...prev,
        coordinates: {
          ...prev.coordinates,
          [name]: parseFloat(value) || 0
        }
      }));
    } else if (name === 'radius') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 100
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) || 0 : value
      }));
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded p-4">
        <p className="text-red-800">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Zonas Seguras</h1>
        <button
          onClick={() => {
            setEditingZone(null);
            resetForm();
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Nueva Zona Segura
        </button>
      </div>

      <SafeZonesTable
        zones={safeZones}
        onEdit={handleEditZone}
        onDeactivate={handleDeactivateZone}
      />

      {/* Modal simple para agregar/editar */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingZone ? 'Editar Zona Segura' : 'Nueva Zona Segura'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingZone(null);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Latitud
                    </label>
                    <input
                      type="number"
                      step="any"
                      name="lat"
                      value={formData.coordinates.lat}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Longitud
                    </label>
                    <input
                      type="number"
                      step="any"
                      name="lng"
                      value={formData.coordinates.lng}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Radio (metros)
                  </label>
                  <input
                    type="number"
                    name="radius"
                    value={formData.radius}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingZone(null);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingZone ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SafeZonesScreen;