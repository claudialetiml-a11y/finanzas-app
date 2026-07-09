'use client';

import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-600 mb-2">💰</h1>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">FinanzasApp</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Tu gestor bancario inteligente</p>
        </div>
        {children}
      </div>
    </div>
  );
}
