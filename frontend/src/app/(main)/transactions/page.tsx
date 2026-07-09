'use client';

import { useState, useEffect } from 'react';
import { useTransactionStore } from '@/store/transactionStore';
import { useCategoryStore } from '@/store/categoryStore';
import { useAccountStore } from '@/store/accountStore';
import { Card, CardBody, CardHeader, Input, Button, Alert } from '@/components';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Trash2, Edit, Plus, Filter } from 'lucide-react';
import { Transaction } from '@/types';

interface FilterState {
  searchTerm: string;
  type: 'all' | 'income' | 'expense';
  categoryId: string;
  startDate: string;
  endDate: string;
}

export default function TransactionsPage() {
  const {
    transactions,
    filteredTransactions,
    setFilter,
    applyFilters,
    deleteTransaction,
    addTransaction,
  } = useTransactionStore();
  const { categories } = useCategoryStore();
  const { accounts } = useAccountStore();

  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    type: 'all',
    categoryId: '',
    startDate: '',
    endDate: '',
  });

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense' as 'income' | 'expense',
    categoryId: '',
    accountId: accounts[0]?.id || '',
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    setFilter({
      searchTerm: filters.searchTerm,
      type: filters.type === 'all' ? undefined : (filters.type as 'income' | 'expense'),
      categoryId: filters.categoryId || undefined,
      startDate: filters.startDate ? new Date(filters.startDate) : undefined,
      endDate: filters.endDate ? new Date(filters.endDate) : undefined,
    });
    applyFilters();
  };

  const handleClearFilters = () => {
    setFilters({
      searchTerm: '',
      type: 'all',
      categoryId: '',
      startDate: '',
      endDate: '',
    });
    setFilter({});
  };

  const handleAddTransaction = () => {
    if (!formData.description || !formData.amount || !formData.categoryId) {
      alert('Por favor completa todos los campos');
      return;
    }

    addTransaction({
      userId: '1',
      accountId: formData.accountId,
      type: formData.type,
      amount: parseFloat(formData.amount),
      currency: 'USD',
      categoryId: formData.categoryId,
      description: formData.description,
      date: new Date(),
      isRecurring: false,
    });

    setFormData({
      description: '',
      amount: '',
      type: 'expense',
      categoryId: '',
      accountId: accounts[0]?.id || '',
    });
    setShowForm(false);
  };

  const displayTransactions = filteredTransactions.length > 0 ? filteredTransactions : transactions;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Transacciones</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Gestiona tus ingresos y gastos</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} size="lg">
          <Plus size={20} className="mr-2" />
          Nueva Transacción
        </Button>
      </div>

      {/* Add Transaction Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Nueva Transacción</h3>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Descripción"
                placeholder="Ej: Compra en supermercado"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              />
              <Input
                label="Monto"
                type="number"
                placeholder="100.00"
                value={formData.amount}
                onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipo
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      type: e.target.value as 'income' | 'expense',
                    }))
                  }
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                >
                  <option value="expense">Egreso</option>
                  <option value="income">Ingreso</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Categoría
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, categoryId: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleAddTransaction} variant="primary">
                Agregar Transacción
              </Button>
              <Button onClick={() => setShowForm(false)} variant="secondary">
                Cancelar
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Filter size={20} />
            Filtros
          </h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Input
              placeholder="Buscar..."
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tipo
              </label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg"
              >
                <option value="all">Todos</option>
                <option value="income">Ingresos</option>
                <option value="expense">Egresos</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categoría
              </label>
              <select
                value={filters.categoryId}
                onChange={(e) => handleFilterChange('categoryId', e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg"
              >
                <option value="">Todas</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <Input
              type="date"
              label="Desde"
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
            />
            <Input
              type="date"
              label="Hasta"
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
            />
          </div>
          <div className="flex gap-3 mt-4">
            <Button onClick={handleApplyFilters} variant="primary">
              Aplicar Filtros
            </Button>
            <Button onClick={handleClearFilters} variant="secondary">
              Limpiar
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {displayTransactions.length} Transacciones
          </h3>
        </CardHeader>
        <CardBody>
          {displayTransactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Descripción</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Categoría</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Fecha</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Monto</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {displayTransactions.map((transaction) => {
                    const category = categories.find((c) => c.id === transaction.categoryId);
                    return (
                      <tr
                        key={transaction.id}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <td className="py-3 px-4 text-gray-900 dark:text-white">{transaction.description}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                          {category?.icon} {category?.name}
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                          {formatDate(transaction.date)}
                        </td>
                        <td
                          className={`py-3 px-4 text-right font-semibold ${
                            transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {transaction.type === 'income' ? '+' : '-'}
                          {formatCurrency(transaction.amount, transaction.currency)}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => deleteTransaction(transaction.id)}
                              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No hay transacciones que mostrar</p>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
