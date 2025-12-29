// src/services/api/endpoints/endpoints.ts
export const endpoints = {
  users: "/usuarios",
  favoritePlaces: "/lugares-favoritos",
  settings: "/api/configuracion",
  
  // Zonas seguras
  safeZones: "/lugares/zonas-seguras",           // GET
  createSafeZone: "/lugares/zonas-seguras/crear", // POST
  
  // Puntos críticos  
  criticalPoints: "/lugares/puntos-criticos",     // GET
  createCriticalPoint: "/lugares/puntos-criticos/crear", // POST
};