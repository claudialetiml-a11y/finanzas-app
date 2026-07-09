'use client';

import { useState } from 'react';
import { useTransactionStore } from '@/store/transactionStore';
import { useCategoryStore } from '@/store/categoryStore';
import { Card, CardBody, CardHeader, Input, Button } from '@/components';
import { formatCurrency, getMonthYear } from '@/lib/utils';
import { Download, BarChart3 } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';

export default function ReportsPage() {
  const { transactions } = useTransactionStore();
  const { categories } = useCategoryStore();
  const [reportType, setReportType] = useState<'monthly' | 'yearly' | 'quarterly'>('monthly');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Generate monthly report data
  const generateMonthlyData = () => {
    const months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date(selectedYear, i, 1);
      const month = i + 1;
      const year = selectedYear;

      const income = transactions
        .filter((t) => {
          const tDate = new Date(t.date);
          return (
            t.type === 'income' &&
            tDate.getMonth() === i &&
            tDate.getFullYear() === year
          );
        })
        .reduce((sum, t) => sum + t.amount, 0);

      const expense = transactions
        .filter((t) => {
          const tDate = new Date(t.date);
          return (
            t.type === 'expense' &&
            tDate.getMonth() === i &&
            tDate.getFullYear() === year
          );
        })
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        month: date.toLocaleDateString('es-CO', { month: 'short' }),
        income,
        expense,
        net: income - expense,
      };
    });

    return months;
  };

  // Generate category comparison for selected month
  const generateCategoryComparison = () => {
    return categories
      .map((category) => {
        const amount = transactions
          .filter((t) => {
            const tDate = new Date(t.date);
            return (
              t.categoryId === category.id &&
              tDate.getMonth() === selectedMonth - 1 &&
              tDate.getFullYear() === selectedYear
            );
          })
          .reduce((sum, t) => sum + t.amount, 0);

        return {
          name: category.name,
          value: amount,
        };
      })
      .filter((item) => item.value > 0);
  };

  const monthlyData = generateMonthlyData();
  const categoryData = generateCategoryComparison();

  const totalIncome = monthlyData.reduce((sum, m) => sum + m.income, 0);
  const totalExpense = monthlyData.reduce((sum, m) => sum + m.expense, 0);
  const totalNet = totalIncome - totalExpense;

  const handleDownloadPDF = () => {
    alert('Descarga de PDF implementada en la versión completa');
  };

  const handleDownloadExcel = () => {
    alert('Descarga de Excel implementada en la versión completa');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reportes</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Análisis detallado de tus finanzas</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleDownloadPDF} variant="secondary" size="lg">
            <Download size={20} className="mr-2" />
            Descargar PDF
          </Button>
          <Button onClick={handleDownloadExcel} variant="secondary" size="lg">
            <Download size={20} className="mr-2" />
            Descargar Excel
          </Button>
        </div>
      </div>

      {/* Report Type Selection */}
      <Card>
        <CardBody>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="monthly"
                checked={reportType === 'monthly'}
                onChange={(e) => setReportType(e.target.value as 'monthly' | 'yearly' | 'quarterly')}
                className="w-4 h-4"
              />
              <span className="text-gray-700 dark:text-gray-300">Mensual</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="quarterly"
                checked={reportType === 'quarterly'}
                onChange={(e) => setReportType(e.target.value as 'monthly' | 'yearly' | 'quarterly')}
                className="w-4 h-4"
              />
              <span className="text-gray-700 dark:text-gray-300">Trimestral</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="yearly"
                checked={reportType === 'yearly'}
                onChange={(e) => setReportType(e.target.value as 'monthly' | 'yearly' | 'quarterly')}
                className="w-4 h-4"
              />
              <span className="text-gray-700 dark:text-gray-300">Anual</span>
            </label>
          </div>
        </CardBody>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardBody className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Total Ingresos</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Total Egresos</p>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpense)}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Neto</p>
            <p className={`text-2xl font-bold ${totalNet > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(totalNet)}
            </p>
          </CardBody>
        </Card>
      </div>

      {/* Monthly Trend Chart */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tendencia {selectedYear}</h3>
        </CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#10b981" name="Ingresos" />
              <Bar dataKey="expense" fill="#ef4444" name="Egresos" />
              <Line
                type="monotone"
                dataKey="net"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Neto"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Gastos por Categoría - {getMonthYear(selectedMonth, selectedYear)}
          </h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            {categoryData
              .sort((a, b) => b.value - a.value)
              .map((item) => (
                <div key={item.name} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                  <div className="flex items-center gap-4">
                    <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-primary-500 h-2 rounded-full transition-all"
                        style={{
                          width: `${(
                            (item.value / categoryData.reduce((sum, i) => sum + i.value, 0)) *
                            100
                          ).toFixed(1)}%`,
                        }}
                      />
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white w-24 text-right">
                      {formatCurrency(item.value)}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </CardBody>
      </Card>

      {/* Date Selection */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Período de Reporte</h3>
        </CardHeader>
        <CardBody className="flex gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mes
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(selectedYear, i, 1).toLocaleDateString('es-CO', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Año
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
            >
              {Array.from({ length: 5 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
