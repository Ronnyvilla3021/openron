// src/features/places/services/placesService.ts - VERSIÓN CORREGIDA
import client from "@/services/api/client/client";
import { endpoints } from "@/services/api/endpoints/endpoints";
import type { SafeZone, CriticalPoint, FavoritePlace, RiskLevel } from "../types/place.types";

// =================== Mapeo para lugares favoritos ===================
const mapFavoritePlaceToBackend = (place: Omit<FavoritePlace, 'id' | 'createdAt'>) => ({
  nombre: place.name,
  coordenadas: place.coordinates,
  estado: place.status,
  userId: place.userId,
});

const mapFavoritePlaceFromBackend = (backendPlace: any): FavoritePlace => ({
  id: backendPlace.id?.toString() || backendPlace.idLugarTuristico?.toString() || '',
  userId: backendPlace.userId?.toString() || backendPlace.idCliente?.toString() || '',
  name: backendPlace.nombre || backendPlace.nombreLugar || backendPlace.name || '',
  coordinates: backendPlace.coordenadas || backendPlace.detallesMongo?.ubicacionLugar || { lat: 0, lng: 0 },
  status: backendPlace.estado || backendPlace.estadoLugar === 'activo' ? 'active' : 'inactive',
  createdAt: backendPlace.createdAt || backendPlace.fechaCreacion || backendPlace.createLugar || new Date().toISOString(),
});

// =================== Mapeo para zonas seguras ===================
const mapSafeZoneFromBackend = (backendZone: any): SafeZone => {
  console.log('📦 Datos recibidos del backend (zona):', backendZone);
  
  let ubicacion = { lat: 0, lng: 0 };
  let radio = 100;
  
  if (backendZone.detallesMongo?.ubicacionLugar) {
    ubicacion = backendZone.detallesMongo.ubicacionLugar;
  } else if (backendZone.coordenadas) {
    ubicacion = backendZone.coordenadas;
  }
  
  if (backendZone.detallesMongo?.radio !== undefined) {
    radio = backendZone.detallesMongo.radio;
  } else if (backendZone.radio !== undefined) {
    radio = backendZone.radio;
  }
  
  return {
    id: backendZone.idLugarTuristico?.toString() || backendZone.id?.toString() || '',
    name: backendZone.nombreLugar || backendZone.name || '',
    coordinates: ubicacion,
    radius: Number(radio) || 100,
    status: backendZone.estadoLugar === 'activo' ? 'active' : 'inactive',
    createdAt: backendZone.createLugar || backendZone.createdAt || new Date().toISOString(),
  };
};

const mapSafeZoneToBackend = (zone: Omit<SafeZone, 'id' | 'createdAt'>): any => {
  return {
    nombreLugar: zone.name,
    coordenadas: zone.coordinates,
    radio: zone.radius,
    descripcion: `Zona segura: ${zone.name}`
  };
};

// =================== Mapeo para puntos críticos ===================
const mapCriticalPointFromBackend = (backendPoint: any): CriticalPoint => {
  console.log('📦 Datos recibidos del backend (punto):', backendPoint);
  
  let ubicacion = { lat: 0, lng: 0 };
  let nivelRiesgo = 'medium';
  
  if (backendPoint.detallesMongo?.ubicacionLugar) {
    ubicacion = backendPoint.detallesMongo.ubicacionLugar;
  } else if (backendPoint.coordenadas) {
    ubicacion = backendPoint.coordenadas;
  }
  
  if (backendPoint.detallesMongo?.nivelRiesgo) {
    const riesgo = backendPoint.detallesMongo.nivelRiesgo;
    nivelRiesgo = riesgo === 'bajo' ? 'low' : riesgo === 'alto' ? 'high' : 'medium';
  }
  
  return {
    id: backendPoint.idLugarTuristico?.toString() || backendPoint.id?.toString() || '',
    name: backendPoint.nombreLugar || backendPoint.name || '',
    coordinates: ubicacion,
    riskLevel: nivelRiesgo as RiskLevel,
    status: backendPoint.estadoLugar === 'activo' ? 'active' : 'inactive',
    createdAt: backendPoint.createLugar || backendPoint.createdAt || new Date().toISOString(),
  };
};

const mapCriticalPointToBackend = (point: Omit<CriticalPoint, 'id' | 'createdAt'>): any => {
  const mapRiskLevelToBackend = (nivel: RiskLevel): string => {
    switch (nivel) {
      case 'low': return 'bajo';
      case 'medium': return 'medio';
      case 'high': return 'alto';
      default: return 'medio';
    }
  };
  
  return {
    nombreLugar: point.name,
    coordenadas: point.coordinates,
    nivelRiesgo: mapRiskLevelToBackend(point.riskLevel),
    descripcion: `Punto crítico: ${point.name}`
  };
};

// =================== Servicio principal ===================
export const placesService = {
  // ========== Lugares favoritos ==========
  getFavoritePlaces: async (): Promise<FavoritePlace[]> => {
    try {
      const { data } = await client.get(endpoints.favoritePlaces);
      return Array.isArray(data) ? data.map(mapFavoritePlaceFromBackend) : [];
    } catch (error) {
      console.error('Error obteniendo lugares favoritos:', error);
      return [];
    }
  },

  createFavoritePlace: async (place: Omit<FavoritePlace, 'id' | 'createdAt'>): Promise<FavoritePlace> => {
    const backendPlace = mapFavoritePlaceToBackend(place);
    const { data } = await client.post(endpoints.favoritePlaces, backendPlace);
    return mapFavoritePlaceFromBackend(data);
  },

  updateFavoritePlace: async (id: string, place: Partial<FavoritePlace>): Promise<FavoritePlace> => {
    const backendPlace: any = {};
    if (place.name) backendPlace.nombre = place.name;
    if (place.coordinates) backendPlace.coordenadas = place.coordinates;
    if (place.status) backendPlace.estado = place.status;
    
    const { data } = await client.put(`${endpoints.favoritePlaces}/${id}`, backendPlace);
    return mapFavoritePlaceFromBackend(data);
  },

  deleteFavoritePlace: async (id: string): Promise<void> => {
    await client.delete(`${endpoints.favoritePlaces}/${id}`);
  },

  // ========== Zonas seguras ==========
  getSafeZones: async (): Promise<SafeZone[]> => {
    try {
      const { data } = await client.get(endpoints.safeZones);
      return Array.isArray(data) ? data.map(mapSafeZoneFromBackend) : [];
    } catch (error) {
      console.error('Error obteniendo zonas seguras:', error);
      return [];
    }
  },

  createSafeZone: async (zone: Omit<SafeZone, 'id' | 'createdAt'>): Promise<SafeZone> => {
    const backendZone = mapSafeZoneToBackend(zone);
    const { data } = await client.post(endpoints.createSafeZone, backendZone);
    return mapSafeZoneFromBackend(data.data || data);
  },

  updateSafeZone: async (id: string, zone: Partial<SafeZone>): Promise<SafeZone> => {
    try {
      const backendZone: any = {};
      if (zone.name) backendZone.nombreLugar = zone.name;
      if (zone.coordinates) backendZone.coordenadas = zone.coordinates;
      if (zone.radius !== undefined) backendZone.radio = zone.radius;
      if (zone.status) {
        backendZone.estadoLugar = zone.status === 'active' ? 'activo' : 'inactivo';
      }
      
      // ⚠️ Necesitas crear el endpoint PUT en el backend primero
      const { data } = await client.put(`${endpoints.safeZones}/${id}`, backendZone);
      return mapSafeZoneFromBackend(data.data || data);
    } catch (error) {
      console.error('Error en updateSafeZone:', error);
      throw new Error('Endpoint updateSafeZone no implementado en el backend');
    }
  },

  deleteSafeZone: async (id: string): Promise<void> => {
    try {
      // ⚠️ Necesitas crear el endpoint DELETE en el backend primero
      await client.delete(`${endpoints.safeZones}/${id}`);
    } catch (error) {
      console.error('Error en deleteSafeZone:', error);
      throw new Error('Endpoint deleteSafeZone no implementado en el backend');
    }
  },

  // ========== Puntos críticos ==========
  getCriticalPoints: async (): Promise<CriticalPoint[]> => {
    try {
      const { data } = await client.get(endpoints.criticalPoints);
      return Array.isArray(data) ? data.map(mapCriticalPointFromBackend) : [];
    } catch (error) {
      console.error('Error obteniendo puntos críticos:', error);
      return [];
    }
  },

  createCriticalPoint: async (point: Omit<CriticalPoint, 'id' | 'createdAt'>): Promise<CriticalPoint> => {
    const backendPoint = mapCriticalPointToBackend(point);
    const { data } = await client.post(endpoints.createCriticalPoint, backendPoint);
    return mapCriticalPointFromBackend(data.data || data);
  },

  updateCriticalPoint: async (id: string, point: Partial<CriticalPoint>): Promise<CriticalPoint> => {
    try {
      const backendPoint: any = {};
      if (point.name) backendPoint.nombreLugar = point.name;
      if (point.coordinates) backendPoint.coordenadas = point.coordinates;
      if (point.riskLevel) {
        backendPoint.nivelRiesgo = point.riskLevel === 'low' ? 'bajo' : 
                                   point.riskLevel === 'high' ? 'alto' : 'medio';
      }
      if (point.status) {
        backendPoint.estadoLugar = point.status === 'active' ? 'activo' : 'inactivo';
      }
      
      // ⚠️ Necesitas crear el endpoint PUT en el backend primero
      const { data } = await client.put(`${endpoints.criticalPoints}/${id}`, backendPoint);
      return mapCriticalPointFromBackend(data.data || data);
    } catch (error) {
      console.error('Error en updateCriticalPoint:', error);
      throw new Error('Endpoint updateCriticalPoint no implementado en el backend');
    }
  },

  deleteCriticalPoint: async (id: string): Promise<void> => {
    try {
      // ⚠️ Necesitas crear el endpoint DELETE en el backend primero
      await client.delete(`${endpoints.criticalPoints}/${id}`);
    } catch (error) {
      console.error('Error en deleteCriticalPoint:', error);
      throw new Error('Endpoint deleteCriticalPoint no implementado en el backend');
    }
  },
};