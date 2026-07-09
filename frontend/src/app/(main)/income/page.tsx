'use client';

import { useTransactionStore } from '@/store/transactionStore';
import { useCategoryStore } from '@/store/categoryStore';
import { Card, CardBody, CardHeader } from '@/components';
import { formatCurrency } from '@/lib/utils';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

export default function IncomePage() {
  const { transactions } = useTransactionStore();
  const { categories } = useCategoryStore();

  const incomeTransactions = transactions.filter((t) => t.type === 'income');
  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);

  // Group by category
  const incomeByCategory = categories
    .filter((c) => c.type === 'income')
    .map((category) => {
      const amount = incomeTransactions
        .filter((t) => t.categoryId === category.id)
        .reduce((sum, t) => sum + t.amount, 0);
      return {
        id: category.id,
        name: category.name,
        value: amount,
        icon: category.icon,
      };
    })
    .filter((item) => item.value > 0);

  // Monthly trend
  const monthlyTrend = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - i));
    const month = date.getMonth();
    const year = date.getFullYear();
    const amount = incomeTransactions
      .filter((t) => {
        const tDate = new Date(t.date);
        return tDate.getMonth() === month && tDate.getFullYear() === year;
      })
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      name: date.toLocaleDateString('es-CO', { month: 'short' }),
      value: amount,
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Ingresos</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Análisis de tus ingresos por categoría</p>
      </div>

      {/* Total Income */}
      <Card>
        <CardBody className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">Total de Ingresos</p>
          <h2 className="text-4xl font-bold text-green-600">{formatCurrency(totalIncome)}</h2>
        </CardBody>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ingresos por Mes</h3>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#10b981" name="Ingresos" />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Por Categoría</h3>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={incomeByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {incomeByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      {/* Categories Detail */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Detalle por Categoría</h3>
        </CardHeader>
        <CardBody>
          {incomeByCategory.length > 0 ? (
            <div className="space-y-3">
              {incomeByCategory
                .sort((a, b) => b.value - a.value)
                .map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-2xl">{category.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{category.name}</p>
                        <p className="text-sm text-gray-500">Ingresos recibidos</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{formatCurrency(category.value)}</p>
                      <p className="text-sm text-gray-500">
                        {((category.value / totalIncome) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No hay ingresos registrados</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
