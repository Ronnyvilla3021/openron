// src/features/places/components/FavoritePlacesTable.tsx
import type { Place } from '../types/place.types';

interface Props {
  places: Place[];
  onEdit: (place: Place) => void;
  onDelete: (place: Place) => void;
}

export const FavoritePlacesTable = ({ places, onEdit, onDelete }: Props) => {
  if (places.length === 0) return <p>No hay lugares favoritos registrados.</p>;

  return (
    <table className="w-full border border-neutral-300 rounded">
      <thead className="bg-neutral-100">
        <tr>
          <th className="p-2 border-b">Nombre</th>
          <th className="p-2 border-b">Coordenadas</th>
          <th className="p-2 border-b">Estado</th>
          <th className="p-2 border-b">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {places.map((place) => (
          <tr key={place.id}>
            <td className="p-2 border-b">{place.name}</td>
            <td className="p-2 border-b">{`${place.coordinates?.lat}, ${place.coordinates?.lng}`}</td>
            <td className="p-2 border-b">{place.status}</td>
            <td className="p-2 border-b flex gap-2">
              <button className="px-2 py-1 bg-yellow-500 text-white rounded" onClick={() => onEdit(place)}>Editar</button>
              <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => onDelete(place)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
