// src/features/places/screens/FavoritePlacesScreen.tsx
import { useState } from 'react';
import { usePlaces } from '../hooks/usePlaces'; // Similar a useZones
import { FavoritePlacesTable } from '../components/FavoritePlacesTable';
import { FavoritePlaceForm } from '../components/FavoritePlaceForm';
import { Modal } from '../../../shared/components/modals/Modal';
import type { Place } from '../types/place.types';

export const FavoritePlacesScreen = () => {
  const { favoritePlaces, loading, addFavoritePlace, updateFavoritePlace, deactivateFavoritePlace } = usePlaces();
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  if (loading) return <p className="p-6">Cargando lugares favoritos...</p>;

  const handleSave = (place: Place) => {
    if (favoritePlaces.find((p) => p.id === place.id)) {
      updateFavoritePlace(place);
    } else {
      addFavoritePlace(place);
    }
    setModalOpen(false);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Lugares Favoritos</h1>

      <button
        className="px-3 py-1 bg-primary-500 text-white rounded"
        onClick={() => { setSelectedPlace(null); setModalOpen(true); }}
      >
        Nuevo Lugar Favorito
      </button>

      <FavoritePlacesTable
        places={favoritePlaces}
        onEdit={(place) => { setSelectedPlace(place); setModalOpen(true); }}
        onDelete={(place) => deactivateFavoritePlace(place.id)}
      />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <FavoritePlaceForm
          place={selectedPlace}
          onCancel={() => setModalOpen(false)}
          onSave={handleSave}
        />
      </Modal>
    </div>
  );
};
