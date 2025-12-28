// src/features/users/screens/UserDetailScreen.tsx

import { useState } from 'react';
import type { User, UserStatus } from '../types/user.types';
import { Button } from '../../../shared/components/buttons/Button';
import { ConfirmDialog } from '../../../shared/components/modals/ConfirmDialog';

/**
 * Props del detalle de usuario
 * (por ahora recibimos el usuario directamente)
 */
interface Props {
  user: User;
  onBack: () => void;
}

export const UserDetailScreen = ({ user, onBack }: Props) => {
  // Estado local del usuario (simula update)
  const [status, setStatus] = useState<UserStatus>(user.status);
  const [showConfirm, setShowConfirm] = useState(false);

  /**
   * Cambiar estado del usuario (UPDATE simulado)
   */
  const handleStatusChange = (newStatus: UserStatus) => {
    setStatus(newStatus);
    console.log('Estado actualizado:', newStatus);
  };

  /**
   * Soft delete (desactivar cuenta)
   */
  const handleDeactivate = () => {
    console.log('Usuario desactivado (soft delete)');
    setStatus('inactive');
    setShowConfirm(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Detalle de Usuario</h1>

        {/* Botón volver */}
        <Button variant="secondary" onClick={onBack}>
          Volver
        </Button>
      </div>

      {/* Información básica */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <p className="text-sm text-neutral-500">Nombre completo</p>
          <p className="font-medium">{user.fullName}</p>
        </div>

        <div>
          <p className="text-sm text-neutral-500">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>

        {user.phone && (
          <div>
            <p className="text-sm text-neutral-500">Teléfono</p>
            <p className="font-medium">{user.phone}</p>
          </div>
        )}

        <div>
          <p className="text-sm text-neutral-500">Estado actual</p>
          <p className="font-medium capitalize">{status}</p>
        </div>
      </div>

      {/* Acciones */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="font-semibold">Acciones de Administrador</h2>

        {/* Cambiar estado */}
        <div className="flex gap-2">
          <Button onClick={() => handleStatusChange('active')}>
            Activar
          </Button>

          {/* 
            ⚠️ CAMBIO IMPORTANTE
            Antes: variant="warning" (NO EXISTÍA)
            Ahora: variant="danger" (SÍ EXISTE)
          */}
          <Button
            variant="danger"
            onClick={() => handleStatusChange('blocked')}
          >
            Bloquear
          </Button>
        </div>

        {/* Soft delete */}
        <Button
          variant="danger"
          onClick={() => setShowConfirm(true)}
        >
          Desactivar cuenta
        </Button>
      </div>

      {/* Modal de confirmación */}
      {showConfirm && (
        <ConfirmDialog
                  title="Desactivar usuario"
                  message="¿Estás seguro de que deseas desactivar esta cuenta?"
                  onConfirm={handleDeactivate}
                  onCancel={() => setShowConfirm(false)} open={false}        />
      )}
    </div>
  );
};
