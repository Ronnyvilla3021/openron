import type { User } from '../types/user.types';
import { useUsers } from '../hooks/useUsers';
import { UsersTable } from '../components/UsersTable';

interface UsersListScreenProps {
  onSelectUser: (user: User) => void;
  onCreate: () => void;
  onEdit: (user: User) => void;
}

export const UsersListScreen = ({ onSelectUser, onCreate, onEdit }: UsersListScreenProps) => {
  const { users, loading } = useUsers();

  if (loading) return <p className="p-6 text-neutral-500">Cargando usuarios...</p>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Gestión de Usuarios</h1>
        <button onClick={onCreate} className="px-3 py-1 bg-primary-500 text-white rounded">
          Crear Usuario
        </button>
      </div>

      <UsersTable
        users={users}
        onView={(id: string) => {
          const selected = users.find(u => u.id === id);
          if (selected) onSelectUser(selected);
        }}
        onEdit={(id: string) => {
          const selected = users.find(u => u.id === id);
          if (selected) onEdit(selected);
        }}
      />
    </div>
  );
};
