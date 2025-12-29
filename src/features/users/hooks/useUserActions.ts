// src/features/users/hooks/useUserActions.ts
import { useState } from 'react';
import { usersService } from '../services/usersService';
import type { User, UserStatus } from '../types/user.types';

export const useUserActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (user: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
    try {
      setLoading(true);
      setError(null);
      const newUser = await usersService.createUser(user);
      return newUser;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear usuario';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: string, user: Partial<User>): Promise<User> => {
    try {
      setLoading(true);
      setError(null);
      const updated = await usersService.updateUser(id, user);
      return updated;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar usuario';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (id: string, status: UserStatus): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await usersService.updateStatus(id, status);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar estado';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string, soft: boolean = true): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      if (soft) {
        await usersService.softDelete(id); // Cambia: softDeleteUser por softDelete
      } else {
        await usersService.deleteUser(id);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar usuario';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createUser,
    updateUser,
    updateUserStatus,
    deleteUser,
    loading,
    error
  };
};