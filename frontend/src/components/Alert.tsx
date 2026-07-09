'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { X } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

export function Alert({ type, title, children, onClose, className }: AlertProps) {
  const typeClasses = {
    success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-200',
    error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-200',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-200',
    info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-200',
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div
      className={cn(
        'border rounded-lg p-4 flex gap-3',
        typeClasses[type],
        className
      )}
    >
      <div className="flex-shrink-0 text-lg font-bold">{icons[type]}</div>
      <div className="flex-grow">
        {title && <h3 className="font-semibold mb-1">{title}</h3>}
        <div className="text-sm">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:opacity-75 transition-opacity"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}
