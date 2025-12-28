// src/features/users/components/UserStatusBadge.tsx
import type { UserStatus } from '../types/user.types';

export const UserStatusBadge = ({ status }: { status: UserStatus }) => {
  const styles = {
    active: 'bg-green-100 text-green-700',
    blocked: 'bg-red-100 text-red-700',
    inactive: 'bg-gray-100 text-gray-700'
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>
      {status.toUpperCase()}
    </span>
  );
};
