// src/features/places/components/CriticalPointsTable.tsx
import React from 'react';
import type { CriticalPoint } from '../types/place.types';

interface CriticalPointsTableProps {
  points: CriticalPoint[];
  onEdit: (point: CriticalPoint) => void;
  onDelete: (point: CriticalPoint) => void;
}

export const CriticalPointsTable: React.FC<CriticalPointsTableProps> = ({ points, onEdit, onDelete }) => {
  return (
    <table className="w-full border border-neutral-200 rounded">
      <thead className="bg-neutral-100">
        <tr>
          <th className="px-4 py-2 text-left">Nombre</th>
          <th className="px-4 py-2 text-left">Lat</th>
          <th className="px-4 py-2 text-left">Lng</th>
          <th className="px-4 py-2 text-left">Nivel de riesgo</th>
          <th className="px-4 py-2 text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {points.map((point) => (
          <tr key={point.id} className="border-t border-neutral-200">
            <td className="px-4 py-2">{point.name}</td>
            <td className="px-4 py-2">{point.coordinates.lat}</td>
            <td className="px-4 py-2">{point.coordinates.lng}</td>
            <td className="px-4 py-2 capitalize">{point.riskLevel}</td>
            <td className="px-4 py-2 flex gap-2">
              <button onClick={() => onEdit(point)} className="px-2 py-1 bg-yellow-400 text-white rounded">Editar</button>
              <button onClick={() => onDelete(point)} className="px-2 py-1 bg-red-500 text-white rounded">Desactivar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
