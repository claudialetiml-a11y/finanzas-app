'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useTransactionStore } from '@/store/transactionStore';
import { useAccountStore } from '@/store/accountStore';
import { useCategoryStore } from '@/store/categoryStore';
import { useUIStore } from '@/store/uiStore';
import { authApi, transactionsApi, accountsApi, categoriesApi } from '@/lib/api';
import { useLocalStorage } from '@/hooks/useLocalStorage';

/**
 * Hook para sincronizar datos del backend con el store local
 * Ejecuta on mount para cargar datos persistidos
 */
export function useSyncData() {
  const { setUser } = useAuthStore();
  const { setTransactions } = useTransactionStore();
  const { setAccounts } = useAccountStore();
  const { setCategories, setSubcategories } = useCategoryStore();
  const { addNotification } = useUIStore();
  const [token] = useLocalStorage<string>('finanzas_app_token', '');

  useEffect(() => {
    if (!token) return;

    const syncData = async () => {
      try {
        // Obtener usuario actual
        const userRes = await authApi.getMe();
        if (userRes.data.success) {
          setUser(userRes.data.data);
        }

        // Obtener cuentas
        const accountsRes = await accountsApi.list();
        if (accountsRes.data.success) {
          setAccounts(accountsRes.data.data);
        }

        // Obtener transacciones
        const transRes = await transactionsApi.list();
        if (transRes.data.success) {
          setTransactions(transRes.data.data.transactions);
        }

        // Obtener categorías
        const catRes = await categoriesApi.list();
        if (catRes.data.success) {
          const categories = catRes.data.data;
          setCategories(categories);
          const allSubcategories = categories.flatMap((c: any) => c.subcategories);
          setSubcategories(allSubcategories);
        }
      } catch (error) {
        console.error('Error sincronizando datos:', error);
        addNotification('Error al sincronizar datos', 'error');
      }
    };

    syncData();
  }, [token]);
}

/**
 * Hook para crear una transacción y sincronizar con el backend
 */
export function useCreateTransaction() {
  const { addTransaction } = useTransactionStore();
  const { addNotification } = useUIStore();

  const createTransaction = async (data: any) => {
    try {
      const res = await transactionsApi.create(data);
      if (res.data.success) {
        addTransaction(res.data.data);
        addNotification('Transacción creada exitosamente', 'success');
        return res.data.data;
      }
    } catch (error: any) {
      addNotification(
        error.response?.data?.error || 'Error al crear transacción',
        'error'
      );
      throw error;
    }
  };

  return { createTransaction };
}

/**
 * Hook para actualizar una transacción
 */
export function useUpdateTransaction() {
  const { updateTransaction } = useTransactionStore();
  const { addNotification } = useUIStore();

  const update = async (id: string, data: any) => {
    try {
      const res = await transactionsApi.update(id, data);
      if (res.data.success) {
        updateTransaction(id, res.data.data);
        addNotification('Transacción actualizada', 'success');
        return res.data.data;
      }
    } catch (error: any) {
      addNotification(
        error.response?.data?.error || 'Error al actualizar',
        'error'
      );
      throw error;
    }
  };

  return { update };
}

/**
 * Hook para eliminar una transacción
 */
export function useDeleteTransaction() {
  const { deleteTransaction } = useTransactionStore();
  const { addNotification } = useUIStore();

  const remove = async (id: string) => {
    try {
      const res = await transactionsApi.delete(id);
      if (res.data.success) {
        deleteTransaction(id);
        addNotification('Transacción eliminada', 'success');
      }
    } catch (error: any) {
      addNotification(
        error.response?.data?.error || 'Error al eliminar',
        'error'
      );
      throw error;
    }
  };

  return { remove };
}
