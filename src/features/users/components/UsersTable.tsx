import type { User } from '../types/user.types';
import { UserStatusBadge } from './UserStatusBadge';
import ActionButton from '../../../shared/components/buttons/ActionButton';

interface Props {
  users: User[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}

export const UsersTable = ({ users, onView, onEdit }: Props) => {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left border-b">
          <th>Nombre</th>
          <th>Email</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id} className="border-b">
            <td>{user.fullName}</td>
            <td>{user.email}</td>
            <td><UserStatusBadge status={user.status} /></td>
            <td className="flex gap-2">
              <ActionButton label="Ver" onClick={() => onView(user.id)} />
              <ActionButton label="Editar" onClick={() => onEdit(user.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
