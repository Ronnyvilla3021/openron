// src/features/places/hooks/usePlaces.ts - SOLUCIÓN RÁPIDA
import { useState, useEffect } from 'react';
import { placesService } from '../services/placesService';
import type { FavoritePlace } from '../types/place.types'; // Solo FavoritePlace

export const usePlaces = () => {
  const [favoritePlaces, setFavoritePlaces] = useState<FavoritePlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFavoritePlaces();
  }, []);

  const loadFavoritePlaces = async () => {
    try {
      setLoading(true);
      setError(null);
      const places = await placesService.getFavoritePlaces();
      setFavoritePlaces(places);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar lugares');
      console.error('Error loading places:', err);
    } finally {
      setLoading(false);
    }
  };

  // CRUD Lugares Favoritos (mantener igual)
  const addFavoritePlace = async (place: Omit<FavoritePlace, 'id' | 'createdAt'>) => {
    try {
      const newPlace = await placesService.createFavoritePlace(place);
      setFavoritePlaces((prev) => [...prev, newPlace]);
      return newPlace;
    } catch (err) {
      console.error('Error adding favorite place:', err);
      throw err;
    }
  };

  const updateFavoritePlace = async (id: string, place: Partial<FavoritePlace>) => {
    try {
      const updated = await placesService.updateFavoritePlace(id, place);
      setFavoritePlaces((prev) => prev.map((p) => (p.id === id ? updated : p)));
      return updated;
    } catch (err) {
      console.error('Error updating favorite place:', err);
      throw err;
    }
  };

  const deactivateFavoritePlace = async (id: string) => {
    try {
      await placesService.deleteFavoritePlace(id);
      setFavoritePlaces((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Error deactivating favorite place:', err);
      throw err;
    }
  };

  return {
    favoritePlaces,
    loading,
    error,
    reload: loadFavoritePlaces,
    addFavoritePlace,
    updateFavoritePlace,
    deactivateFavoritePlace,
  };
};