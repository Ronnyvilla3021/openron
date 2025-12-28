// src/shared/styles/theme/typography.ts

export const typography = {
  // Font Families
  fontFamily: {
    sans: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ].join(', '),
    mono: [
      'JetBrains Mono',
      'Fira Code',
      'Consolas',
      'Monaco',
      'monospace',
    ].join(', '),
  },

  // Font Sizes
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
    base: ['1rem', { lineHeight: '1.5rem' }],     // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
    '5xl': ['3rem', { lineHeight: '1' }],         // 48px
    '6xl': ['3.75rem', { lineHeight: '1' }],      // 60px
  },

  // Font Weights
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Line Heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
};

// Estilos de texto predefinidos
export const textStyles = {
  // Headings
  h1: 'text-4xl font-bold tracking-tight text-neutral-900',
  h2: 'text-3xl font-bold tracking-tight text-neutral-900',
  h3: 'text-2xl font-semibold tracking-tight text-neutral-900',
  h4: 'text-xl font-semibold text-neutral-900',
  h5: 'text-lg font-semibold text-neutral-900',
  h6: 'text-base font-semibold text-neutral-900',

  // Body
  bodyLarge: 'text-lg font-normal text-neutral-700',
  body: 'text-base font-normal text-neutral-700',
  bodySmall: 'text-sm font-normal text-neutral-600',

  // Labels
  label: 'text-sm font-medium text-neutral-700',
  labelSmall: 'text-xs font-medium text-neutral-600',

  // Captions
  caption: 'text-sm font-normal text-neutral-500',
  captionSmall: 'text-xs font-normal text-neutral-500',

  // Links
  link: 'text-primary-600 hover:text-primary-700 underline cursor-pointer',
  linkSubtle: 'text-neutral-600 hover:text-primary-600 cursor-pointer',

  // Code
  code: 'font-mono text-sm bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-800',
  codeBlock: 'font-mono text-sm bg-neutral-900 text-neutral-100 p-4 rounded-lg',
};