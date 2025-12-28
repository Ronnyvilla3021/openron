import { useState } from 'react';
import type { User, UserStatus } from '../types/user.types';

interface Props {
  user: User | null;
  onCancel: () => void;
  onSave: (user: User) => void;
}

export const UserFormScreen = ({ user, onCancel, onSave }: Props) => {
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [status, setStatus] = useState<UserStatus>(user?.status || 'active');

  // Handler para crear o actualizar el usuario
  const handleSubmit = () => {
    const newUser: User = {
      id: user?.id ?? Date.now().toString(),
      fullName,
      email,
      phone: phone || undefined, // opcional
      status,
      createdAt: user?.createdAt ?? new Date().toISOString(), // obligatorio
    };
    onSave(newUser);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">{user ? 'Editar Usuario' : 'Crear Usuario'}</h1>

      <div className="space-y-2">
        <label>Nombre completo</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
      </div>

      <div className="space-y-2">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
      </div>

      <div className="space-y-2">
        <label>Teléfono (opcional)</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
      </div>

      <div className="space-y-2">
        <label>Estado</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as UserStatus)}
          className="border px-2 py-1 rounded w-full"
        >
          <option value="active">Activo</option>
          <option value="inactive">Inactivo</option>
          <option value="blocked">Bloqueado</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button onClick={onCancel} className="px-3 py-1 bg-gray-300 rounded">
          Cancelar
        </button>
        <button onClick={handleSubmit} className="px-3 py-1 bg-primary-500 text-white rounded">
          Guardar
        </button>
      </div>
    </div>
  );
};
