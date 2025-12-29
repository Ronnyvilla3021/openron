// src/features/places/services/placesService.ts
import client from "@/services/api/client/client";
import { endpoints } from "@/services/api/endpoints/endpoints";
import type { SafeZone, CriticalPoint, FavoritePlace, RiskLevel } from "../types/place.types";

// =================== MAPEO LUGARES FAVORITOS ===================
const mapFavoritePlaceFromBackend = (backendPlace: any): FavoritePlace => {
  console.log('📦 Lugar favorito recibido:', backendPlace);
  
  return {
    id: backendPlace.id?.toString() || backendPlace.idLugarFavorito?.toString() || '',
    userId: backendPlace.userId?.toString() || backendPlace.idCliente?.toString() || '',
    name: backendPlace.nombre || backendPlace.nombreLugar || '',
    coordinates: backendPlace.coordenadas || backendPlace.ubicacion || { lat: 0, lng: 0 },
    status: backendPlace.estado === 'activo' ? 'active' : 'inactive',
    createdAt: backendPlace.createdAt || backendPlace.fechaCreacion || new Date().toISOString(),
  };
};

const mapFavoritePlaceToBackend = (place: Omit<FavoritePlace, 'id' | 'createdAt'>) => ({
  nombre: place.name,
  coordenadas: place.coordinates,
  estado: place.status === 'active' ? 'activo' : 'inactivo',
  userId: place.userId,
});

// =================== MAPEO ZONAS SEGURAS ===================
const mapSafeZoneFromBackend = (backendZone: any): SafeZone => {
  console.log('📦 Zona segura recibida:', backendZone);
  
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
    name: backendZone.nombreLugar || '',
    coordinates: ubicacion,
    radius: Number(radio) || 100,
    status: backendZone.estadoLugar === 'activo' ? 'active' : 'inactive',
    createdAt: backendZone.createLugar || backendZone.createdAt || new Date().toISOString(),
  };
};

const mapSafeZoneToBackend = (zone: Omit<SafeZone, 'id' | 'createdAt'>) => ({
  nombreLugar: zone.name,
  coordenadas: zone.coordinates,
  radio: zone.radius,
  descripcion: `Zona segura: ${zone.name}`,
  estadoLugar: zone.status === 'active' ? 'activo' : 'inactivo',
});

// =================== MAPEO PUNTOS CRÍTICOS ===================
const mapCriticalPointFromBackend = (backendPoint: any): CriticalPoint => {
  console.log('📦 Punto crítico recibido:', backendPoint);
  
  let ubicacion = { lat: 0, lng: 0 };
  let nivelRiesgo: RiskLevel = 'medium';
  
  if (backendPoint.detallesMongo?.ubicacionLugar) {
    ubicacion = backendPoint.detallesMongo.ubicacionLugar;
  } else if (backendPoint.coordenadas) {
    ubicacion = backendPoint.coordenadas;
  }
  
  if (backendPoint.detallesMongo?.nivelRiesgo) {
    const riesgo = backendPoint.detallesMongo.nivelRiesgo;
    nivelRiesgo = riesgo === 'bajo' ? 'low' : riesgo === 'alto' ? 'high' : 'medium';
  } else if (backendPoint.nivelRiesgo) {
    const riesgo = backendPoint.nivelRiesgo;
    nivelRiesgo = riesgo === 'bajo' ? 'low' : riesgo === 'alto' ? 'high' : 'medium';
  }
  
  return {
    id: backendPoint.idLugarTuristico?.toString() || backendPoint.id?.toString() || '',
    name: backendPoint.nombreLugar || '',
    coordinates: ubicacion,
    riskLevel: nivelRiesgo,
    status: backendPoint.estadoLugar === 'activo' ? 'active' : 'inactive',
    createdAt: backendPoint.createLugar || backendPoint.createdAt || new Date().toISOString(),
  };
};

const mapCriticalPointToBackend = (point: Omit<CriticalPoint, 'id' | 'createdAt'>) => {
  const mapRiskLevel = (nivel: RiskLevel): string => {
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
    nivelRiesgo: mapRiskLevel(point.riskLevel),
    descripcion: `Punto crítico: ${point.name}`,
    estadoLugar: point.status === 'active' ? 'activo' : 'inactivo',
  };
};

// =================== SERVICIO ===================
export const placesService = {
  // ========== Lugares favoritos ==========
  getFavoritePlaces: async (): Promise<FavoritePlace[]> => {
    try {
      const { data } = await client.get(endpoints.favoritePlaces);
      console.log('📥 Lugares favoritos recibidos:', data);
      return Array.isArray(data) ? data.map(mapFavoritePlaceFromBackend) : [];
    } catch (error) {
      console.error('❌ Error obteniendo lugares favoritos:', error);
      return [];
    }
  },

  createFavoritePlace: async (place: Omit<FavoritePlace, 'id' | 'createdAt'>): Promise<FavoritePlace> => {
    const backendPlace = mapFavoritePlaceToBackend(place);
    console.log('📤 Creando lugar favorito:', backendPlace);
    const { data } = await client.post(endpoints.favoritePlaceCreate, backendPlace);
    return mapFavoritePlaceFromBackend(data.data || data);
  },

  updateFavoritePlace: async (id: string, place: Partial<FavoritePlace>): Promise<FavoritePlace> => {
    const backendPlace: any = {};
    if (place.name) backendPlace.nombre = place.name;
    if (place.coordinates) backendPlace.coordenadas = place.coordinates;
    if (place.status) backendPlace.estado = place.status === 'active' ? 'activo' : 'inactivo';
    
    console.log('📤 Actualizando lugar favorito:', backendPlace);
    const { data } = await client.put(endpoints.favoritePlaceUpdate(id), backendPlace);
    return mapFavoritePlaceFromBackend(data.data || data);
  },

  deleteFavoritePlace: async (id: string): Promise<void> => {
    await client.delete(endpoints.favoritePlaceDelete(id));
  },

  // ========== Zonas seguras ==========
  getSafeZones: async (): Promise<SafeZone[]> => {
    try {
      const { data } = await client.get(endpoints.safeZones);
      console.log('📥 Zonas seguras recibidas:', data);
      return Array.isArray(data) ? data.map(mapSafeZoneFromBackend) : [];
    } catch (error) {
      console.error('❌ Error obteniendo zonas seguras:', error);
      return [];
    }
  },

  createSafeZone: async (zone: Omit<SafeZone, 'id' | 'createdAt'>): Promise<SafeZone> => {
    const backendZone = mapSafeZoneToBackend(zone);
    console.log('📤 Creando zona segura:', backendZone);
    const { data } = await client.post(endpoints.safeZoneCreate, backendZone);
    return mapSafeZoneFromBackend(data.data || data);
  },

  updateSafeZone: async (id: string, zone: Partial<SafeZone>): Promise<SafeZone> => {
    const backendZone: any = {};
    if (zone.name) backendZone.nombreLugar = zone.name;
    if (zone.coordinates) backendZone.coordenadas = zone.coordinates;
    if (zone.radius !== undefined) backendZone.radio = zone.radius;
    if (zone.status) backendZone.estadoLugar = zone.status === 'active' ? 'activo' : 'inactivo';
    
    console.log('📤 Actualizando zona segura:', backendZone);
    const { data } = await client.put(endpoints.safeZoneUpdate(id), backendZone);
    return mapSafeZoneFromBackend(data.data || data);
  },

  deleteSafeZone: async (id: string): Promise<void> => {
    await client.delete(endpoints.safeZoneDelete(id));
  },

  // ========== Puntos críticos ==========
  getCriticalPoints: async (): Promise<CriticalPoint[]> => {
    try {
      const { data } = await client.get(endpoints.criticalPoints);
      console.log('📥 Puntos críticos recibidos:', data);
      return Array.isArray(data) ? data.map(mapCriticalPointFromBackend) : [];
    } catch (error) {
      console.error('❌ Error obteniendo puntos críticos:', error);
      return [];
    }
  },

  createCriticalPoint: async (point: Omit<CriticalPoint, 'id' | 'createdAt'>): Promise<CriticalPoint> => {
    const backendPoint = mapCriticalPointToBackend(point);
    console.log('📤 Creando punto crítico:', backendPoint);
    const { data } = await client.post(endpoints.criticalPointCreate, backendPoint);
    return mapCriticalPointFromBackend(data.data || data);
  },

  updateCriticalPoint: async (id: string, point: Partial<CriticalPoint>): Promise<CriticalPoint> => {
    const backendPoint: any = {};
    if (point.name) backendPoint.nombreLugar = point.name;
    if (point.coordinates) backendPoint.coordenadas = point.coordinates;
    if (point.riskLevel) {
      backendPoint.nivelRiesgo = point.riskLevel === 'low' ? 'bajo' : 
                                 point.riskLevel === 'high' ? 'alto' : 'medio';
    }
    if (point.status) backendPoint.estadoLugar = point.status === 'active' ? 'activo' : 'inactivo';
    
    console.log('📤 Actualizando punto crítico:', backendPoint);
    const { data } = await client.put(endpoints.criticalPointUpdate(id), backendPoint);
    return mapCriticalPointFromBackend(data.data || data);
  },

  deleteCriticalPoint: async (id: string): Promise<void> => {
    await client.delete(endpoints.criticalPointDelete(id));
  },
};