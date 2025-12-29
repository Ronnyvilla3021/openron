// src/features/users/services/usersService.ts
import client from "@/services/api/client/client";
import { endpoints } from "@/services/api/endpoints/endpoints";
import type { User, UserStatus } from "../types/user.types";

// =================== MAPEO DE DATOS ===================
const mapUserFromBackend = (backendUser: any): User => {
  console.log('📦 Usuario recibido del backend:', backendUser);
  
  return {
    id: backendUser.idUsuario?.toString() || backendUser.id?.toString() || '',
    fullName: backendUser.nameUsers || backendUser.nombre || '',
    email: backendUser.emailUser || backendUser.email || '',
    phone: backendUser.phoneUser || backendUser.telefono || '',
    status: mapStatusFromBackend(backendUser.estado || backendUser.status),
    createdAt: backendUser.createdAt || backendUser.fechaCreacion || new Date().toISOString(),
  };
};

const mapUserToBackend = (user: Omit<User, 'id' | 'createdAt'>) => ({
  nameUsers: user.fullName,
  emailUser: user.email,
  phoneUser: user.phone || '',
  userName: user.email.split('@')[0],
  passwordUser: 'Temporal123!', // ⚠️ Contraseña temporal
  estado: mapStatusToBackend(user.status),
});

const mapStatusFromBackend = (status: string): UserStatus => {
  const statusMap: Record<string, UserStatus> = {
    'activo': 'active',
    'active': 'active',
    'inactivo': 'inactive',
    'inactive': 'inactive',
    'bloqueado': 'blocked',
    'blocked': 'blocked',
  };
  return statusMap[status.toLowerCase()] || 'active';
};

const mapStatusToBackend = (status: UserStatus): string => {
  const statusMap: Record<UserStatus, string> = {
    'active': 'activo',
    'inactive': 'inactivo',
    'blocked': 'bloqueado',
  };
  return statusMap[status];
};

// =================== SERVICIO ===================
export const usersService = {
  getAll: async (): Promise<User[]> => {
    try {
      const { data } = await client.get(endpoints.usersList);
      console.log('📥 Usuarios recibidos:', data);
      return Array.isArray(data) ? data.map(mapUserFromBackend) : [];
    } catch (error) {
      console.error('❌ Error obteniendo usuarios:', error);
      return [];
    }
  },

  getById: async (id: string): Promise<User> => {
    const { data } = await client.get(`${endpoints.users}/obtener/${id}`);
    return mapUserFromBackend(data);
  },

  createUser: async (user: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
    const backendUser = mapUserToBackend(user);
    console.log('📤 Creando usuario:', backendUser);
    const { data } = await client.post(endpoints.userCreate, backendUser);
    return mapUserFromBackend(data.data || data);
  },

  updateUser: async (id: string, user: Partial<User>): Promise<User> => {
    const backendUser: any = {};
    if (user.fullName) backendUser.nameUsers = user.fullName;
    if (user.email) backendUser.emailUser = user.email;
    if (user.phone) backendUser.phoneUser = user.phone;
    if (user.status) backendUser.estado = mapStatusToBackend(user.status);
    
    console.log('📤 Actualizando usuario:', backendUser);
    const { data } = await client.put(endpoints.userUpdate(id), backendUser);
    return mapUserFromBackend(data.data || data);
  },

  updateStatus: async (id: string, status: UserStatus): Promise<User> => {
    const { data } = await client.put(endpoints.userChangeStatus(id), { 
      estado: mapStatusToBackend(status)
    });
    return mapUserFromBackend(data.data || data);
  },

  softDelete: async (id: string): Promise<void> => {
    await client.delete(endpoints.userDelete(id));
  },

  deleteUser: async (id: string): Promise<void> => {
    await client.delete(endpoints.userDelete(id));
  },
};