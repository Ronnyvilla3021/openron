// src/features/places/hooks/useZones.ts
import { useState, useEffect } from 'react';
import type { SafeZone, CriticalPoint } from '../types/place.types';

export const useZones = () => {
  const [safeZones, setSafeZones] = useState<SafeZone[]>([]);
  const [criticalPoints, setCriticalPoints] = useState<CriticalPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockSafeZones: SafeZone[] = [
      { id: 'sz1', name: 'Parada Norte', coordinates: { lat: -0.1807, lng: -78.4678 }, radius: 150, status: 'active', createdAt: new Date().toISOString() },
    ];
    const mockCriticalPoints: CriticalPoint[] = [
      { id: 'cp1', name: 'Punto Crítico Sur', coordinates: { lat: -0.182, lng: -78.470 }, riskLevel: 'high', status: 'active', createdAt: new Date().toISOString() },
    ];
    setTimeout(() => {
      setSafeZones(mockSafeZones);
      setCriticalPoints(mockCriticalPoints);
      setLoading(false);
    }, 500);
  }, []);

  const addSafeZone = (zone: SafeZone) => setSafeZones((prev) => [...prev, zone]);
  const updateSafeZone = (zone: SafeZone) => setSafeZones((prev) => prev.map((z) => (z.id === zone.id ? zone : z)));
  const deactivateSafeZone = (id: string) => setSafeZones((prev) => prev.map((z) => (z.id === id ? { ...z, status: 'inactive' } : z)));

  const addCriticalPoint = (point: CriticalPoint) => setCriticalPoints((prev) => [...prev, point]);
  const updateCriticalPoint = (point: CriticalPoint) => setCriticalPoints((prev) => prev.map((p) => (p.id === point.id ? point : p)));
  const deactivateCriticalPoint = (id: string) => setCriticalPoints((prev) => prev.map((p) => (p.id === id ? { ...p, status: 'inactive' } : p)));

  return {
    safeZones,
    criticalPoints,
    loading,
    addSafeZone,
    updateSafeZone,
    deactivateSafeZone,
    addCriticalPoint,
    updateCriticalPoint,
    deactivateCriticalPoint,
  };
};
