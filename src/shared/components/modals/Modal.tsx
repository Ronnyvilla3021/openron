import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean; // ✅ Se agregó isOpen
}

export const Modal: React.FC<ModalProps> = ({ children, onClose, isOpen }) => {
  if (!isOpen) return null; // ✅ No renderiza si está cerrado

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fondo oscuro */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Contenedor del modal */}
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md p-6 z-10">
        {children}
      </div>
    </div>
  );
};
