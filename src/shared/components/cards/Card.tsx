// src/shared/components/cards/Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'default' | 'bordered' | 'elevated' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  headerAction,
  footer,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  className = ''
}) => {
  const variantClasses = {
    default: 'bg-white rounded-lg shadow-sm border border-neutral-200',
    bordered: 'bg-white rounded-lg border-2 border-neutral-200',
    elevated: 'bg-white rounded-lg shadow-md',
    ghost: 'bg-transparent border border-neutral-200 rounded-lg'
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const hoverClass = hoverable
    ? 'hover:shadow-md hover:border-primary-200 transition-all duration-200 cursor-pointer'
    : '';

  return (
    <div
      className={`
        ${variantClasses[variant]}
        ${hoverClass}
        ${className}
      `}
    >
      {(title || subtitle || headerAction) && (
        <div className={`flex items-start justify-between ${paddingClasses[padding]} ${!footer && !children ? '' : 'border-b border-neutral-200'}`}>
          <div className="flex-1">
            {title && (
              <h3 className="text-lg font-semibold text-neutral-900">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-neutral-600 mt-1">{subtitle}</p>
            )}
          </div>
          {headerAction && (
            <div className="ml-4 flex-shrink-0">{headerAction}</div>
          )}
        </div>
      )}

      {children && (
        <div className={paddingClasses[padding]}>
          {children}
        </div>
      )}

      {footer && (
        <div className={`${paddingClasses[padding]} border-t border-neutral-200 bg-neutral-50 rounded-b-lg`}>
          {footer}
        </div>
      )}
    </div>
  );
};