// src/shared/utils/styles.ts

/**
 * Combina clases de forma segura
 */
export const cn = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(' ');

/* =====================
   TEXTO
   ===================== */
export const sizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
} as const;

/* =====================
   ESPACIADO
   ===================== */
export const spacing = {
  none: '',
  xs: 'p-2',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-12',
} as const;

/* =====================
   COLORES DE ESTADO (SAFE)
   ===================== */
export const statusColors = {
  active: 'bg-success-100 text-success-700 border-success-200',
  inactive: 'bg-neutral-100 text-neutral-700 border-neutral-200',
  pending: 'bg-warning-100 text-warning-700 border-warning-200',
  error: 'bg-error-100 text-error-700 border-error-200',
  processing: 'bg-info-100 text-info-700 border-info-200',
} as const;

/* =====================
   FOCUS RINGS
   ===================== */
export const focusRing = {
  primary: 'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
  error: 'focus:outline-none focus:ring-2 focus:ring-error-500 focus:ring-offset-2',
  success: 'focus:outline-none focus:ring-2 focus:ring-success-500 focus:ring-offset-2',
} as const;

/* =====================
   ANIMACIONES
   ===================== */
export const hoverScale =
  'transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]';

export const smoothTransition =
  'transition-all duration-200 ease-in-out';

/* =====================
   SOMBRAS
   ===================== */
export const shadows = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
} as const;

/* =====================
   BORDES
   ===================== */
export const rounded = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
} as const;

/* =====================
   GRADIENTES
   ===================== */
export const gradients = {
  primary: 'bg-gradient-to-r from-primary-500 to-primary-700',
  secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-700',
  success: 'bg-gradient-to-r from-success-500 to-success-700',
  warm: 'bg-gradient-to-r from-warning-400 to-error-500',
  cool: 'bg-gradient-to-r from-info-400 to-primary-600',
  sunset: 'bg-gradient-to-r from-warning-300 via-error-400 to-error-600',
} as const;

/* =====================
   FORMULARIOS
   ===================== */
export const formStates = {
  default: 'border-neutral-300 focus:border-primary-500',
  error: 'border-error-500 focus:border-error-600',
  success: 'border-success-500 focus:border-success-600',
  disabled: 'bg-neutral-100 cursor-not-allowed opacity-60',
} as const;

/* =====================
   TRUNCATE
   ===================== */
export const truncate = {
  1: 'truncate',
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
} as const;

/* =====================
   FLEX LAYOUTS ✅ (ESTO ARREGLA TU ERROR)
   ===================== */
export const flexLayouts = {
  center: 'flex items-center justify-center',
  between: 'flex items-center justify-between',
  start: 'flex items-start',
  end: 'flex items-end',
  column: 'flex flex-col',
  columnCenter: 'flex flex-col items-center justify-center',
} as const;

/* =====================
   GRID
   ===================== */
export const gridLayouts = {
  cols2: 'grid grid-cols-1 md:grid-cols-2 gap-4',
  cols3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
  cols4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4',
} as const;
