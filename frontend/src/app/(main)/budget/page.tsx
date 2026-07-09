'use client';

import { useState } from 'react';
import { useCategoryStore } from '@/store/categoryStore';
import { useTransactionStore } from '@/store/transactionStore';
import { Card, CardBody, CardHeader, Input, Button } from '@/components';
import { formatCurrency } from '@/lib/utils';
import { Plus, AlertTriangle } from 'lucide-react';

interface BudgetItem {
  categoryId: string;
  limit: number;
  alert: number;
}

export default function BudgetPage() {
  const { categories } = useCategoryStore();
  const { transactions } = useTransactionStore();
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const expenseCategories = categories.filter((c) => c.type === 'expense');

  const getCategorySpent = (categoryId: string) => {
    const now = new Date();
    return transactions
      .filter((t) => {
        const tDate = new Date(t.date);
        return (
          t.type === 'expense' &&
          t.categoryId === categoryId &&
          tDate.getMonth() === now.getMonth() &&
          tDate.getFullYear() === now.getFullYear()
        );
      })
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const handleSetBudget = (categoryId: string, limit: number, alert: number) => {
    const existing = budgets.find((b) => b.categoryId === categoryId);
    if (existing) {
      setBudgets(
        budgets.map((b) =>
          b.categoryId === categoryId ? { categoryId, limit, alert } : b
        )
      );
    } else {
      setBudgets([...budgets, { categoryId, limit, alert }]);
    }
    setEditingId(null);
  };

  const getBudget = (categoryId: string) => {
    return budgets.find((b) => b.categoryId === categoryId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Presupuesto</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Establece y monitorea tus límites de gasto mensuales</p>
      </div>

      {/* Total Budget Overview */}
      <Card>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Presupuesto Total</p>
              <p className="text-2xl font-bold text-primary-600">
                {formatCurrency(budgets.reduce((sum, b) => sum + b.limit, 0))}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Gastado Este Mes</p>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(
                  expenseCategories.reduce((sum, c) => sum + getCategorySpent(c.id), 0)
                )}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Disponible</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(
                  budgets.reduce((sum, b) => sum + b.limit, 0) -
                    expenseCategories.reduce((sum, c) => sum + getCategorySpent(c.id), 0)
                )}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Budget Items */}
      <div className="space-y-4">
        {expenseCategories.map((category) => {
          const budget = getBudget(category.id);
          const spent = getCategorySpent(category.id);
          const percentage = budget ? (spent / budget.limit) * 100 : 0;
          const isExceeded = budget && spent > budget.limit;
          const isWarning = budget && percentage >= budget.alert;

          return (
            <Card key={category.id} className={isExceeded ? 'border-red-300' : ''}>
              <CardBody>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{category.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {budget
                          ? `${formatCurrency(spent)} / ${formatCurrency(budget.limit)}`
                          : 'Sin presupuesto establecido'}
                      </p>
                    </div>
                  </div>
                  {isExceeded && (
                    <AlertTriangle size={20} className="text-red-600" />
                  )}
                </div>

                {budget ? (
                  <>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2 overflow-hidden">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          isExceeded
                            ? 'bg-red-600'
                            : isWarning
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {percentage.toFixed(1)}% usado
                      </span>
                      <button
                        onClick={() => setEditingId(category.id)}
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Editar
                      </button>
                    </div>
                  </>
                ) : (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setEditingId(category.id)}
                    className="w-full"
                  >
                    <Plus size={16} className="mr-2" />
                    Establecer Presupuesto
                  </Button>
                )}

                {editingId === category.id && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg space-y-3">
                    <Input
                      label="Límite Mensual"
                      type="number"
                      defaultValue={budget?.limit || ''}
                      placeholder="500.00"
                    />
                    <Input
                      label="Alerta en %"
                      type="number"
                      defaultValue={budget?.alert || 80}
                      placeholder="80"
                    />
                    <div className="flex gap-2">
                      <Button variant="primary" size="sm" className="flex-1">
                        Guardar
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setEditingId(null)}
                        className="flex-1"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
