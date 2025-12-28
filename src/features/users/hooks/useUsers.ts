// src/features/users/hooks/useUsers.ts
import { useEffect, useState } from 'react';
import { usersService } from '../services/usersService';
import type { User } from '../types/user.types';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setLoading(true);
    const data = await usersService.getUsers();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users,
    loading,
    reload: loadUsers
  };
};
