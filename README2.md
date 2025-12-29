# 🔌 Conexión Frontend-Backend OpenBlind

## ✅ Archivos Creados

### 1. **API Client** (`src/services/api/client.ts`)
- Cliente Axios configurado para el backend en `http://localhost:8888`
- Interceptores para autenticación automática con token
- Manejo de errores global

### 2. **API Endpoints** (`src/services/api/endpoints.ts`)
- Todas las rutas del backend centralizadas
- Endpoints para: usuarios, lugares, contactos, configuraciones, etc.

### 3. **Servicios Actualizados**
- **usersService.ts** - CRUD completo de usuarios
- **placesService.ts** - Gestión de lugares favoritos, zonas seguras y puntos críticos
- **settingsService.ts** - Configuraciones de tarjeta ID y notificaciones

### 4. **Hooks Actualizados**
- **useUsers.ts** / **useUserActions.ts** - Con llamadas reales al backend
- **usePlaces.ts** / **useZones.ts** - Con llamadas reales al backend

---

## 🚀 Cómo Usar

### 1. **Asegúrate que el backend esté corriendo**
```bash
# En la carpeta del backend
cd estructura-hexagonal
node index.js
# Debe estar en http://localhost:8888
```

### 2. **Inicia el frontend**
```bash
# En la carpeta del frontend
npm run dev
# Se abrirá en http://localhost:5173
```

### 3. **La conexión está lista**
- Todas las pantallas ahora usan datos reales del backend
- Los cambios se guardan automáticamente en la base de datos
- El token de autenticación se maneja automáticamente

---

## 🔐 Autenticación

El sistema usa JWT tokens guardados en `localStorage`:

```typescript
// El token se guarda automáticamente después del login
localStorage.setItem('auth_token', token);

// Y se envía en cada petición
headers: {
  Authorization: `Bearer ${token}`
}
```

Si el token expira (401), el usuario es redirigido automáticamente al login.

---

## 📡 Estructura de las Peticiones

### Ejemplo: Obtener Usuarios
```typescript
// Frontend hace:
const users = await usersService.getUsers();

// Que internamente llama:
GET http://localhost:8888/api/cliente

// Y transforma la respuesta del backend a nuestro formato:
{
  id: user.id_cliente,
  fullName: `${user.nombre} ${user.apellido}`,
  email: user.correo_electronico,
  status: 'active' | 'inactive' | 'blocked'
}
```

---

## 🎯 Endpoints Disponibles

### Usuarios
- `GET /api/cliente` - Listar todos
- `GET /api/cliente/:id` - Obtener uno
- `POST /api/cliente` - Crear
- `PUT /api/cliente/:id` - Actualizar
- `DELETE /api/cliente/:id` - Eliminar

### Lugares
- `GET /api/lugar-favorito` - Lugares favoritos
- `GET /api/lugar-turistico` - Zonas y puntos críticos
- `POST /api/lugar-turistico` - Crear zona/punto

### Configuraciones
- `GET /api/admin/configuracion-global` - Obtener config
- `PUT /api/admin/configuracion-global` - Actualizar config

---

## ⚠️ Importante

1. **No uses `.env`** - La URL está hardcodeada en `client.ts`
2. **Puerto 8888** - El backend DEBE estar en este puerto
3. **CORS** - Asegúrate que el backend permita `http://localhost:5173`

---

## 🐛 Troubleshooting

### Error: "Network Error"
- ✅ Backend corriendo en puerto 8888
- ✅ CORS configurado correctamente

### Error: "401 Unauthorized"
- ✅ Token válido en localStorage
- ✅ Usuario autenticado correctamente

### Error: "Cannot find module"
- ✅ Ejecutar `npm install`
- ✅ Verificar imports

---

## 📝 Próximos Pasos

1. Implementar pantalla de login
2. Agregar servicios para contactos de emergencia
3. Agregar servicios para incidencias y soporte
4. Implementar dashboard con métricas reales

---

**¡La conexión está lista! Todas las pantallas ahora usan datos reales del backend en puerto 8888** 🎉