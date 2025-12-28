// src/features/places/types/place.types.ts
export type LocationStatus = 'active' | 'inactive';
export type RiskLevel = 'low' | 'medium' | 'high';

export interface Place {
  id: string;
  userId: string;
  name: string;
  description?: string;
  coordinates?: { lat: number; lng: number };
  status: LocationStatus;
  createdAt: string;
}

export interface SafeZone {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  radius: number; // metros
  status: LocationStatus;
  createdAt: string;
}

export interface CriticalPoint {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  riskLevel: RiskLevel;
  status: LocationStatus;
  createdAt: string;
}

export interface FavoritePlace {
  id: string;
  userId: string;
  name: string;
  coordinates: { lat: number; lng: number };
  status: LocationStatus;
  createdAt: string;
}
