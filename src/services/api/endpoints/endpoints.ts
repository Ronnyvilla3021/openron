// src/services/api/endpoints/endpoints.ts - VERSIÓN FINAL CORREGIDA
export const endpoints = {
  // =================== USUARIOS ===================
  users: "/usuarios",
  usersList: "/usuarios/lista",
  userCreate: "/usuarios/crear",
  userUpdate: (id: string) => `/usuarios/actualizar/${id}`,
  userDelete: (id: string) => `/usuarios/eliminar/${id}`,
  userChangeStatus: (id: string) => `/usuarios/cambiar-estado/${id}`,
  
  // =================== LUGARES FAVORITOS ===================
  favoritePlaces: "/lugares-favoritos",
  favoritePlaceCreate: "/lugares-favoritos",  // ⭐ Cambio: Sin /crear
  favoritePlaceUpdate: (id: string) => `/lugares-favoritos/${id}`,  // ⭐ Cambio
  favoritePlaceDelete: (id: string) => `/lugares-favoritos/${id}`,  // ⭐ Cambio
  
  // =================== ZONAS SEGURAS ===================
  safeZones: "/lugares/zonas-seguras",
  safeZoneCreate: "/lugares/zonas-seguras/crear",
  safeZoneUpdate: (id: string) => `/lugares/zonas-seguras/actualizar/${id}`,  // ⭐ Nuevo
  safeZoneDelete: (id: string) => `/lugares/zonas-seguras/eliminar/${id}`,    // ⭐ Nuevo
  
  // =================== PUNTOS CRÍTICOS ===================
  criticalPoints: "/lugares/puntos-criticos",
  criticalPointCreate: "/lugares/puntos-criticos/crear",
  criticalPointUpdate: (id: string) => `/lugares/puntos-criticos/actualizar/${id}`,  // ⭐ Nuevo
  criticalPointDelete: (id: string) => `/lugares/puntos-criticos/eliminar/${id}`,    // ⭐ Nuevo
  
  // =================== CONFIGURACIONES ===================
  settings: "/api/configuracion",
  settingsUpdate: "/api/configuracion/actualizar",
  
  // Tarjeta ID
  idCardConfig: "/api/configuracion/tarjeta-id",
  idCardUpdate: "/api/configuracion/tarjeta-id/actualizar",  // ⭐ Nuevo
  
  // Notificaciones
  notificationsConfig: "/api/configuracion/notificaciones",
  notificationsUpdate: "/api/configuracion/notificaciones/actualizar",  // ⭐ Nuevo
};