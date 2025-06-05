import React, { forwardRef } from 'react';

interface AccessibleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const AccessibleInput = forwardRef<HTMLInputElement, AccessibleInputProps>(
  ({ label, error, hint, required, id, className = '', ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className="mb-4">
        <label 
          htmlFor={inputId}
          className="block text-sm font-semibold mb-2 text-gray-900"
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-label="required">*</span>
          )}
        </label>
        
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-3 border rounded-lg min-h-[44px]
            focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500
            transition-colors duration-200
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${className}
          `}
          aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
          aria-invalid={!!error}
          required={required}
          {...props}
        />
        
        {hint && !error && (
          <p id={hintId} className="mt-2 text-sm text-gray-600">
            {hint}
          </p>
        )}
        
        {error && (
          <p 
            id={errorId}
            className="mt-2 text-sm text-red-600"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

AccessibleInput.displayName = 'AccessibleInput'; 