// Props básicas para un botón de acción reutilizable
type ActionButtonProps = {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
};

// Export DEFAULT (importante)
export default function ActionButton({
  label,
  onClick,
  variant = 'primary',
}: ActionButtonProps) {
  // Clases según el tipo de acción
  const baseClasses =
    'px-3 py-1.5 text-sm rounded-md font-medium transition-colors';

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {label}
    </button>
  );
}
