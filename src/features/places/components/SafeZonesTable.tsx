// src/features/places/components/SafeZonesTable.tsx
import type { SafeZone } from '../types/place.types';
import ActionButton from '../../../shared/components/buttons/ActionButton';

interface Props {
  zones: SafeZone[];
  onEdit: (zone: SafeZone) => void;
  onDelete: (zone: SafeZone) => void;
}

const SafeZonesTable = ({ zones, onEdit, onDelete }: Props) => {
  if (!zones.length) return <p>No hay zonas registradas.</p>;

  return (
    <table className="w-full text-sm border">
      <thead>
        <tr className="text-left border-b">
          <th>Nombre</th>
          <th>Coordenadas</th>
          <th>Radio (m)</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {zones.map((zone) => (
          <tr key={zone.id} className="border-b">
            <td>{zone.name}</td>
            <td>{`${zone.coordinates.lat.toFixed(5)}, ${zone.coordinates.lng.toFixed(5)}`}</td>
            <td>{zone.radius}</td>
            <td>{zone.status}</td>
            <td className="flex gap-2">
              <ActionButton label="Editar" onClick={() => onEdit(zone)} />
              <ActionButton label="Eliminar" onClick={() => onDelete(zone)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SafeZonesTable;
