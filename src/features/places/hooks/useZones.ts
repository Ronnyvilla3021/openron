// src/features/places/hooks/useZones.ts
import { useState, useEffect } from 'react';
import { placesService } from '../services/placesService'; // Cambia esta línea
import type { SafeZone, CriticalPoint } from '../types/place.types';

export const useZones = () => {
  const [safeZones, setSafeZones] = useState<SafeZone[]>([]);
  const [criticalPoints, setCriticalPoints] = useState<CriticalPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadZones();
  }, []);

  const loadZones = async () => {
  try {
    setLoading(true);
    setError(null);
    const [zones, points] = await Promise.all([
      placesService.getSafeZones(),
      placesService.getCriticalPoints(),
    ]);
    
    console.log('🔍 Zonas seguras recibidas:', zones); // Verificar datos
    console.log('🔍 Puntos críticos recibidos:', points);
    
    // Verificar si tienen radius
    zones.forEach((zone, index) => {
      if (zone.radius === undefined) {
        console.warn(`⚠️ Zona ${index} no tiene radius:`, zone);
      }
    });
    
    setSafeZones(zones);
    setCriticalPoints(points);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Error al cargar zonas');
    console.error('Error loading zones:', err);
  } finally {
    setLoading(false);
  }
};

  const addSafeZone = async (zone: Omit<SafeZone, 'id' | 'createdAt'>) => {
    try {
      const newZone = await placesService.createSafeZone(zone);
      setSafeZones((prev) => [...prev, newZone]);
      return newZone;
    } catch (err) {
      throw err;
    }
  };

  const updateSafeZone = async (id: string, zone: Partial<SafeZone>) => {
    try {
      const updated = await placesService.updateSafeZone(id, zone);
      setSafeZones((prev) => prev.map((z) => (z.id === id ? updated : z)));
      return updated;
    } catch (err) {
      throw err;
    }
  };

  const deactivateSafeZone = async (id: string) => {
    try {
      await placesService.deleteSafeZone(id);
      setSafeZones((prev) => prev.filter((z) => z.id !== id));
    } catch (err) {
      throw err;
    }
  };

  const addCriticalPoint = async (point: Omit<CriticalPoint, 'id' | 'createdAt'>) => {
    try {
      const newPoint = await placesService.createCriticalPoint(point);
      setCriticalPoints((prev) => [...prev, newPoint]);
      return newPoint;
    } catch (err) {
      throw err;
    }
  };

  const updateCriticalPoint = async (id: string, point: Partial<CriticalPoint>) => {
    try {
      const updated = await placesService.updateCriticalPoint(id, point);
      setCriticalPoints((prev) => prev.map((p) => (p.id === id ? updated : p)));
      return updated;
    } catch (err) {
      throw err;
    }
  };

  const deactivateCriticalPoint = async (id: string) => {
    try {
      await placesService.deleteCriticalPoint(id);
      setCriticalPoints((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      throw err;
    }
  };

  return {
    safeZones,
    criticalPoints,
    loading,
    error,
    reload: loadZones,
    addSafeZone,
    updateSafeZone,
    deactivateSafeZone,
    addCriticalPoint,
    updateCriticalPoint,
    deactivateCriticalPoint,
  };
};