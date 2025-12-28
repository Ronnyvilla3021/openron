// src/shared/styles/theme/effects.ts

export const shadows = {
  // Box Shadows
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem',    // 2px
  base: '0.25rem',   // 4px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  xl: '0.75rem',     // 12px
  '2xl': '1rem',     // 16px
  '3xl': '1.5rem',   // 24px
  full: '9999px',
};

export const transitions = {
  // Transition Timing Functions
  timing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Transition Durations
  duration: {
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms',
  },

  // Common Transitions
  all: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  colors: 'color, background-color, border-color 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  opacity: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  transform: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
};

// Efectos comunes predefinidos
export const effects = {
  // Cards
  card: 'bg-white rounded-lg shadow-sm border border-neutral-200',
  cardHover: 'bg-white rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow duration-200',
  cardInteractive: 'bg-white rounded-lg shadow-sm border border-neutral-200 hover:shadow-md hover:border-primary-300 transition-all duration-200 cursor-pointer',

  // Elevated surfaces
  elevated: 'bg-white rounded-lg shadow-md',
  elevatedHover: 'bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200',

  // Overlays
  overlay: 'bg-black/50 backdrop-blur-sm',
  overlayLight: 'bg-white/80 backdrop-blur-sm',

  // Focus states
  focusRing: 'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
  focusRingError: 'focus:outline-none focus:ring-2 focus:ring-error-500 focus:ring-offset-2',

  // Disabled states
  disabled: 'opacity-50 cursor-not-allowed',

  // Glassmorphism
  glass: 'bg-white/10 backdrop-blur-md border border-white/20',
};