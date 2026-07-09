'use client';

import { cn } from '@/lib/utils';
import { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  icon?: ReactNode;
}

export function Input({
  label,
  error,
  helpText,
  icon,
  className,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">{icon}</div>}
        <input
          className={cn(
            'w-full px-4 py-2.5 border-2 rounded-lg transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            'dark:bg-gray-700 dark:text-white dark:border-gray-600',
            icon && 'pl-10',
            error
              ? 'border-red-500 focus:border-red-600 focus:ring-red-500'
              : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-400',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      {helpText && !error && <p className="mt-2 text-sm text-gray-500">{helpText}</p>}
    </div>
  );
}
