import React, { forwardRef } from 'react';

interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  ariaLabel?: string;
}

export const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ variant = 'primary', size = 'medium', children, ariaLabel, className = '', ...props }, ref) => {
    const baseClasses = `
      inline-flex items-center justify-center font-semibold rounded-lg 
      transition-all duration-200 focus:outline-none focus:ring-4 
      disabled:opacity-50 disabled:cursor-not-allowed
      min-h-[44px] min-w-[44px]
    `;

    const variantClasses = {
      primary: 'bg-blue-800 text-white hover:bg-blue-900 focus:ring-blue-400',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-300',
      outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-300'
    };

    const sizeClasses = {
      small: 'px-4 py-2 text-sm',
      medium: 'px-6 py-3 text-base',
      large: 'px-8 py-4 text-lg'
    };

    const buttonClasses = `
      ${baseClasses}
      ${variantClasses[variant]}
      ${sizeClasses[size]}
      ${className}
    `.trim();

    return (
      <button
        ref={ref}
        className={buttonClasses}
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton'; 