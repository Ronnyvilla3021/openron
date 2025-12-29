// src/features/users/types/user.types.ts

export type UserStatus = 'active' | 'inactive' | 'blocked';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  status: UserStatus;
  createdAt: string;
}

export interface UserFilters {
  status?: UserStatus;
  search?: string;
}

export interface UserFormData {
  fullName: string;
  email: string;
  phone?: string;
  status: UserStatus;
}