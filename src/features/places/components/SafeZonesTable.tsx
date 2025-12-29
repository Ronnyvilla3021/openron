// src/features/places/components/SafeZonesTable.tsx
import type { SafeZone } from '../types/place.types';

interface SafeZonesTableProps {
  zones: SafeZone[];
  onEdit: (zone: SafeZone) => void;
  onDeactivate: (id: string) => void;
}

export const SafeZonesTable = ({ zones, onEdit, onDeactivate }: SafeZonesTableProps) => {
  if (!zones || zones.length === 0) {
    return <div>No hay zonas seguras registradas</div>;
  }

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Coordenadas</th>
          <th>Radio (metros)</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {zones.map((zone) => {
          // Asegurar que radius existe y es un número
          const radius = zone.radius ?? 100;
          const radiusText = typeof radius === 'number' 
            ? radius.toFixed(2) 
            : '100.00'; // Valor por defecto si no es número
          
          return (
            <tr key={zone.id}>
              <td>{zone.name || 'Sin nombre'}</td>
              <td>
                {zone.coordinates 
                  ? `Lat: ${zone.coordinates.lat?.toFixed(6) || '0'}, Lng: ${zone.coordinates.lng?.toFixed(6) || '0'}`
                  : 'Sin coordenadas'
                }
              </td>
              <td>{radiusText} m</td>
              <td>
                <span className={`px-2 py-1 rounded ${zone.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {zone.status === 'active' ? 'Activa' : 'Inactiva'}
                </span>
              </td>
              <td>
                <button onClick={() => onEdit(zone)}>Editar</button>
                <button onClick={() => onDeactivate(zone.id)}>Desactivar</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};