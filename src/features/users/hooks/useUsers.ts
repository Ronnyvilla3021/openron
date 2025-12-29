// src/features/users/hooks/useUsers.ts
import { useEffect, useState } from "react";
import { usersService } from "../services/usersService";
import type { User } from "../types/user.types"; // Usa import type

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    usersService.getAll()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  return { users, loading };
};