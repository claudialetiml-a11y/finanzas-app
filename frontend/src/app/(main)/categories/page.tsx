'use client';

import { useState } from 'react';
import { useCategoryStore } from '@/store/categoryStore';
import { Card, CardBody, CardHeader, Input, Button, Alert } from '@/components';
import { Trash2, Edit, Plus, Tag } from 'lucide-react';

export default function CategoriesPage() {
  const { categories, addCategory, deleteCategory, subcategories, addSubcategory } =
    useCategoryStore();
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showSubcategoryForm, setShowSubcategoryForm] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    type: 'expense' as 'income' | 'expense',
    icon: '',
  });
  const [subcategoryForm, setSubcategoryForm] = useState({
    name: '',
    icon: '',
  });

  const handleAddCategory = () => {
    if (!categoryForm.name) {
      alert('El nombre de la categoría es requerido');
      return;
    }

    addCategory({
      userId: '1',
      name: categoryForm.name,
      type: categoryForm.type,
      icon: categoryForm.icon || '📌',
      color: categoryForm.type === 'income' ? '#10b981' : '#ef4444',
    });

    setCategoryForm({ name: '', type: 'expense', icon: '' });
    setShowCategoryForm(false);
  };

  const handleAddSubcategory = () => {
    if (!subcategoryForm.name || !selectedCategoryId) {
      alert('Por favor completa todos los campos');
      return;
    }

    addSubcategory({
      categoryId: selectedCategoryId,
      name: subcategoryForm.name,
      icon: subcategoryForm.icon || '📌',
    });

    setSubcategoryForm({ name: '', icon: '' });
    setShowSubcategoryForm(false);
  };

  const incomeCategories = categories.filter((c) => c.type === 'income');
  const expenseCategories = categories.filter((c) => c.type === 'expense');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Categorías</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Organiza tus ingresos y gastos</p>
        </div>
        <Button onClick={() => setShowCategoryForm(!showCategoryForm)} size="lg">
          <Plus size={20} className="mr-2" />
          Nueva Categoría
        </Button>
      </div>

      {/* Add Category Form */}
      {showCategoryForm && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Nueva Categoría</h3>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Nombre de Categoría"
                placeholder="Ej: Alimentación"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm((prev) => ({ ...prev, name: e.target.value }))}
              />
              <Input
                label="Emoji/Icono"
                placeholder="🍽️"
                value={categoryForm.icon}
                onChange={(e) => setCategoryForm((prev) => ({ ...prev, icon: e.target.value }))}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipo
                </label>
                <select
                  value={categoryForm.type}
                  onChange={(e) =>
                    setCategoryForm((prev) => ({
                      ...prev,
                      type: e.target.value as 'income' | 'expense',
                    }))
                  }
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg"
                >
                  <option value="expense">Egreso</option>
                  <option value="income">Ingreso</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleAddCategory} variant="primary">
                Crear Categoría
              </Button>
              <Button onClick={() => setShowCategoryForm(false)} variant="secondary">
                Cancelar
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Income Categories */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="text-green-600">↑</span>
          Categorías de Ingresos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {incomeCategories.map((category) => (
            <Card key={category.id}>
              <CardBody>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{category.icon}</span>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{category.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {subcategories.filter((s) => s.categoryId === category.id).length} subcategorías
                    </p>
                  </div>
                  <button
                    onClick={() => deleteCategory(category.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategoryId(category.id);
                    setShowSubcategoryForm(true);
                  }}
                  className="w-full mt-4 py-2 px-3 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors text-sm font-medium"
                >
                  Agregar Subcategoría
                </button>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Expense Categories */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="text-red-600">↓</span>
          Categorías de Egresos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {expenseCategories.map((category) => (
            <Card key={category.id}>
              <CardBody>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{category.icon}</span>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{category.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {subcategories.filter((s) => s.categoryId === category.id).length} subcategorías
                    </p>
                  </div>
                  <button
                    onClick={() => deleteCategory(category.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategoryId(category.id);
                    setShowSubcategoryForm(true);
                  }}
                  className="w-full mt-4 py-2 px-3 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors text-sm font-medium"
                >
                  Agregar Subcategoría
                </button>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Subcategory Modal */}
      {showSubcategoryForm && selectedCategoryId && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Nueva Subcategoría
            </h3>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input
              label="Nombre de Subcategoría"
              placeholder="Ej: Verduras"
              value={subcategoryForm.name}
              onChange={(e) =>
                setSubcategoryForm((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <Input
              label="Emoji/Icono"
              placeholder="🥬"
              value={subcategoryForm.icon}
              onChange={(e) =>
                setSubcategoryForm((prev) => ({ ...prev, icon: e.target.value }))
              }
            />
            <div className="flex gap-3">
              <Button onClick={handleAddSubcategory} variant="primary">
                Crear Subcategoría
              </Button>
              <Button onClick={() => setShowSubcategoryForm(false)} variant="secondary">
                Cancelar
              </Button>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
