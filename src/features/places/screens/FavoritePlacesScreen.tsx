// src/features/places/screens/FavoritePlacesScreen.tsx
import { useState } from 'react';
import { usePlaces } from '../hooks/usePlaces';
import { FavoritePlacesTable } from '../components/FavoritePlacesTable';
import { FavoritePlaceForm } from '../components/FavoritePlaceForm';
import { Modal } from '../../../shared/components/modals/Modal';
import type { FavoritePlace, Place } from '../types/place.types';

export const FavoritePlacesScreen = () => {
  const { 
    favoritePlaces, 
    loading, 
    addFavoritePlace, 
    updateFavoritePlace, 
    deactivateFavoritePlace 
  } = usePlaces();
  
  const [selectedPlace, setSelectedPlace] = useState<FavoritePlace | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  if (loading) return <p className="p-6">Cargando lugares favoritos...</p>;

  // Convertir FavoritePlace a Place (para los componentes que usan Place)
  const favoritePlaceToPlace = (favPlace: FavoritePlace): Place => {
    return {
      id: favPlace.id,
      userId: favPlace.userId,
      name: favPlace.name,
      description: '', // Place tiene description opcional
      coordinates: favPlace.coordinates, // Aquí coordinates NO es undefined
      status: favPlace.status,
      createdAt: favPlace.createdAt
    };
  };

  // Convertir Place a FavoritePlace (para los hooks)
  const placeToFavoritePlace = (place: Place): Omit<FavoritePlace, 'id' | 'createdAt'> => {
    return {
      name: place.name,
      coordinates: place.coordinates || { lat: 0, lng: 0 }, // Asegurar que no sea undefined
      status: place.status,
      userId: place.userId || 'default-user-id'
    };
  };

  const handleSave = (place: Place) => {
    // Si el lugar tiene ID, es una actualización
    if (place.id && selectedPlace) {
      const updateData = placeToFavoritePlace(place);
      updateFavoritePlace(selectedPlace.id, updateData);
    } else {
      // Si no tiene ID, es una creación
      const newFavoritePlace = placeToFavoritePlace(place);
      addFavoritePlace(newFavoritePlace);
    }
    
    setModalOpen(false);
    setSelectedPlace(null);
  };

  // Convertir favoritePlaces a Place[] para la tabla
  const placesForTable: Place[] = favoritePlaces.map(favoritePlaceToPlace);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Lugares Favoritos</h1>

      <button
        className="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600"
        onClick={() => { 
          setSelectedPlace(null); 
          setModalOpen(true); 
        }}
      >
        Nuevo Lugar Favorito
      </button>

      <FavoritePlacesTable
        places={placesForTable}
        onEdit={(place) => { 
          // Encontrar el FavoritePlace original
          const originalFavoritePlace = favoritePlaces.find(fp => fp.id === place.id);
          if (originalFavoritePlace) {
            setSelectedPlace(originalFavoritePlace); 
            setModalOpen(true);
          }
        }}
        onDelete={(place) => {
          const placeToDelete = favoritePlaces.find(fp => fp.id === place.id);
          if (placeToDelete) {
            deactivateFavoritePlace(placeToDelete.id);
          }
        }}
      />

      <Modal isOpen={modalOpen} onClose={() => {
        setModalOpen(false);
        setSelectedPlace(null);
      }}>
        <FavoritePlaceForm
          place={selectedPlace ? favoritePlaceToPlace(selectedPlace) : null}
          onCancel={() => {
            setModalOpen(false);
            setSelectedPlace(null);
          }}
          onSave={handleSave}
        />
      </Modal>
    </div>
  );
};