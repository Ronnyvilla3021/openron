// src/features/places/hooks/usePlaces.ts
import { useState, useEffect } from 'react';
import type { Place, SafeZone, CriticalPoint } from '../types/place.types';

export const usePlaces = () => {
  // Lugares favoritos
  const [favoritePlaces, setFavoritePlaces] = useState<Place[]>([]);
  // Zonas seguras
  const [safeZones, setSafeZones] = useState<SafeZone[]>([]);
  // Puntos críticos
  const [criticalPoints, setCriticalPoints] = useState<CriticalPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Datos mock iniciales
    const mockFavoritePlaces: Place[] = [
      {
        id: 'p1',
        userId: 'u1',
        name: 'Parque Central',
        coordinates: { lat: -0.1807, lng: -78.4678 },
        status: 'active',
        createdAt: new Date().toISOString(),
      },
    ];

    const mockSafeZones: SafeZone[] = [
      {
        id: 'sz1',
        name: 'Parada Norte',
        coordinates: { lat: -0.1807, lng: -78.4678 },
        radius: 150,
        status: 'active',
        createdAt: new Date().toISOString(),
      },
    ];

    const mockCriticalPoints: CriticalPoint[] = [
      {
        id: 'cp1',
        name: 'Punto Crítico Sur',
        coordinates: { lat: -0.182, lng: -78.470 },
        riskLevel: 'high',
        status: 'active',
        createdAt: new Date().toISOString(),
      },
    ];

    setTimeout(() => {
      setFavoritePlaces(mockFavoritePlaces);
      setSafeZones(mockSafeZones);
      setCriticalPoints(mockCriticalPoints);
      setLoading(false);
    }, 500);
  }, []);

  // CRUD Lugares Favoritos
  const addFavoritePlace = (place: Place) =>
    setFavoritePlaces((prev) => [...prev, place]);
  const updateFavoritePlace = (place: Place) =>
    setFavoritePlaces((prev) => prev.map((p) => (p.id === place.id ? place : p)));
  const deactivateFavoritePlace = (id: string) =>
    setFavoritePlaces((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'inactive' } : p))
    );

  // CRUD Zonas Seguras
  const addSafeZone = (zone: SafeZone) => setSafeZones((prev) => [...prev, zone]);
  const updateSafeZone = (zone: SafeZone) =>
    setSafeZones((prev) => prev.map((z) => (z.id === zone.id ? zone : z)));
  const deactivateSafeZone = (id: string) =>
    setSafeZones((prev) =>
      prev.map((z) => (z.id === id ? { ...z, status: 'inactive' } : z))
    );

  // CRUD Puntos Críticos
  const addCriticalPoint = (point: CriticalPoint) =>
    setCriticalPoints((prev) => [...prev, point]);
  const updateCriticalPoint = (point: CriticalPoint) =>
    setCriticalPoints((prev) => prev.map((p) => (p.id === point.id ? point : p)));
  const deactivateCriticalPoint = (id: string) =>
    setCriticalPoints((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'inactive' } : p))
    );

  return {
    favoritePlaces,
    safeZones,
    criticalPoints,
    loading,
    addFavoritePlace,
    updateFavoritePlace,
    deactivateFavoritePlace,
    addSafeZone,
    updateSafeZone,
    deactivateSafeZone,
    addCriticalPoint,
    updateCriticalPoint,
    deactivateCriticalPoint,
  };
};
