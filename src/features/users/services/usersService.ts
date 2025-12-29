// src/features/users/services/usersService.ts
import client from "@/services/api/client/client";
import { endpoints } from "@/services/api/endpoints/endpoints";
import type { User, UserStatus } from "../types/user.types";

// Mapear de frontend a backend
const mapUserToBackend = (user: Omit<User, 'id' | 'createdAt'>) => ({
  nameUsers: user.fullName,
  emailUser: user.email,
  phoneUser: user.phone || '',
  userName: user.email.split('@')[0], // Generar username del email
  passwordUser: 'Temporal123!', // Contraseña temporal - necesitarías manejar esto mejor
  estado: user.status,
});

const mapUserFromBackend = (backendUser: any): User => ({
  id: backendUser.id?.toString() || backendUser.idUsuario?.toString() || '',
  fullName: backendUser.nameUsers || backendUser.nombre || '',
  email: backendUser.emailUser || backendUser.email || '',
  phone: backendUser.phoneUser || backendUser.telefono || '',
  status: backendUser.estado || backendUser.status || 'active',
  createdAt: backendUser.createdAt || backendUser.fechaCreacion || new Date().toISOString(),
});

export const usersService = {
  getAll: async (): Promise<User[]> => {
    const { data } = await client.get(`${endpoints.users}/lista`);
    // Mapear datos del backend al frontend
    return Array.isArray(data) ? data.map(mapUserFromBackend) : [];
  },

  getById: async (id: string): Promise<User> => {
    const { data } = await client.get(`${endpoints.users}/obtener/${id}`);
    return mapUserFromBackend(data);
  },

  createUser: async (user: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
    const backendUser = mapUserToBackend(user);
    const { data } = await client.post(`${endpoints.users}/crear`, backendUser);
    return mapUserFromBackend(data);
  },

  updateUser: async (id: string, user: Partial<User>): Promise<User> => {
    const backendUser: any = {};
    if (user.fullName) backendUser.nameUsers = user.fullName;
    if (user.email) backendUser.emailUser = user.email;
    if (user.phone) backendUser.phoneUser = user.phone;
    if (user.status) backendUser.estado = user.status;
    
    const { data } = await client.put(`${endpoints.users}/actualizar/${id}`, backendUser);
    return mapUserFromBackend(data);
  },

  updateStatus: async (id: string, status: UserStatus): Promise<User> => {
    const { data } = await client.put(`${endpoints.users}/cambiar-estado/${id}`, { 
      estado: status 
    });
    return mapUserFromBackend(data);
  },

  softDelete: async (id: string): Promise<void> => {
    await client.delete(`${endpoints.users}/eliminar/${id}`);
  },

  deleteUser: async (id: string): Promise<void> => {
    await client.delete(`${endpoints.users}/eliminar/${id}`);
  },
};