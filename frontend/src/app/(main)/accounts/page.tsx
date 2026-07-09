'use client';

import { useState } from 'react';
import { useAccountStore } from '@/store/accountStore';
import { Card, CardBody, CardHeader, Input, Button } from '@/components';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Trash2, Edit, Plus, Landmark } from 'lucide-react';

export default function AccountsPage() {
  const { accounts, addAccount, updateAccount, deleteAccount, getTotalBalance } = useAccountStore();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bankName: '',
    accountNumber: '',
    accountType: 'savings' as const,
    balance: '',
    currency: 'USD',
  });

  const handleAddAccount = () => {
    if (!formData.name || !formData.balance) {
      alert('Por favor completa los campos requeridos');
      return;
    }

    addAccount({
      name: formData.name,
      bankName: formData.bankName,
      accountNumber: formData.accountNumber,
      accountType: formData.accountType,
      balance: parseFloat(formData.balance),
      currency: formData.currency,
      isDefault: accounts.length === 0,
      userId: '1',
      color: '#0ea5e9',
    });

    setFormData({
      name: '',
      bankName: '',
      accountNumber: '',
      accountType: 'savings',
      balance: '',
      currency: 'USD',
    });
    setShowForm(false);
  };

  const totalBalance = getTotalBalance();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mis Cuentas</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Gestiona tus cuentas bancarias</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} size="lg">
          <Plus size={20} className="mr-2" />
          Nueva Cuenta
        </Button>
      </div>

      {/* Total Balance */}
      <Card>
        <CardBody className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">Saldo Total</p>
          <h2 className="text-4xl font-bold text-primary-600">{formatCurrency(totalBalance)}</h2>
        </CardBody>
      </Card>

      {/* Add Account Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Nueva Cuenta</h3>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nombre de la Cuenta"
                placeholder="Ej: Cuenta Principal"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              />
              <Input
                label="Banco"
                placeholder="Ej: Banco XYZ"
                value={formData.bankName}
                onChange={(e) => setFormData((prev) => ({ ...prev, bankName: e.target.value }))}
              />
              <Input
                label="Número de Cuenta"
                placeholder="****1234"
                value={formData.accountNumber}
                onChange={(e) => setFormData((prev) => ({ ...prev, accountNumber: e.target.value }))}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipo de Cuenta
                </label>
                <select
                  value={formData.accountType}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      accountType: e.target.value as 'savings' | 'checking' | 'credit' | 'investment',
                    }))
                  }
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg"
                >
                  <option value="savings">Ahorros</option>
                  <option value="checking">Corriente</option>
                  <option value="credit">Crédito</option>
                  <option value="investment">Inversión</option>
                </select>
              </div>
              <Input
                label="Saldo Inicial"
                type="number"
                placeholder="0.00"
                value={formData.balance}
                onChange={(e) => setFormData((prev) => ({ ...prev, balance: e.target.value }))}
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleAddAccount} variant="primary">
                Crear Cuenta
              </Button>
              <Button onClick={() => setShowForm(false)} variant="secondary">
                Cancelar
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <Card key={account.id} hover>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                    <Landmark size={24} className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{account.name}</h3>
                    <p className="text-sm text-gray-500">{account.bankName}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Saldo Disponible</p>
                <p className="text-2xl font-bold text-primary-600">
                  {formatCurrency(account.balance, account.currency)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Tipo</p>
                  <p className="font-medium text-gray-900 dark:text-white capitalize">
                    {account.accountType}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Moneda</p>
                  <p className="font-medium text-gray-900 dark:text-white">{account.currency}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="flex-1 py-2 px-3 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <Edit size={16} />
                  Editar
                </button>
                <button
                  onClick={() => deleteAccount(account.id)}
                  className="flex-1 py-2 px-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Eliminar
                </button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {accounts.length === 0 && !showForm && (
        <Card>
          <CardBody className="text-center py-12">
            <Landmark size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No tienes cuentas creadas</p>
            <Button onClick={() => setShowForm(true)} variant="primary" className="mt-4">
              Crear Primera Cuenta
            </Button>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
