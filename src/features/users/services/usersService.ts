// src/features/users/services/usersService.ts
import type { User } from '../types/user.types';

const mockUsers: User[] = [
  {
    id: '1',
    fullName: 'Juan Pérez',
    email: 'juan@example.com',
    phone: '999888777',
    status: 'active',
    createdAt: '2025-09-01'
  },
  {
    id: '2',
    fullName: 'María López',
    email: 'maria@example.com',
    status: 'blocked',
    createdAt: '2025-08-20'
  },
  {
    id: '3',
    fullName: 'Carlos Gómez',
    email: 'carlos@example.com',
    status: 'inactive',
    createdAt: '2025-07-10'
  }
];

export const usersService = {
  getUsers: async (): Promise<User[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockUsers;
  },

  updateUserStatus: async (id: string, status: User['status']) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    console.log(`User ${id} updated to ${status}`);
  },

  softDeleteUser: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    console.log(`User ${id} soft deleted`);
  }
};
