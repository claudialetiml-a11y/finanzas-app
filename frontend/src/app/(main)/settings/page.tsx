'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks';
import { useUIStore } from '@/store/uiStore';
import { Card, CardBody, CardHeader, Input, Button, Alert } from '@/components';
import { Settings, Bell, Lock, Palette, Download, LogOut } from 'lucide-react';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useUIStore();
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'notifications' | 'privacy'>('general');
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    budgetWarnings: true,
    weeklyReports: false,
    monthlyReports: true,
  });
  const [saved, setSaved] = useState(false);

  const handleSaveProfile = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleExportData = () => {
    alert('Exportación de datos en desarrollo');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      alert('Cuenta eliminada');
      logout();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Configuración</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Administra tu cuenta y preferencias</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
        {(['general', 'security', 'notifications', 'privacy'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {tab === 'general' && '⚙️ General'}
            {tab === 'security' && '🔐 Seguridad'}
            {tab === 'notifications' && '🔔 Notificaciones'}
            {tab === 'privacy' && '🔒 Privacidad'}
          </button>
        ))}
      </div>

      {/* General Tab */}
      {activeTab === 'general' && (
        <div className="space-y-6">
          {saved && (
            <Alert type="success" title="Guardado">
              Tus cambios han sido guardados correctamente.
            </Alert>
          )}

          {/* Profile Information */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Información de Perfil</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <Input
                label="Nombre"
                value={profileData.name}
                onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
              />
              <Input
                label="Email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
              />
              <Button onClick={handleSaveProfile} variant="primary" className="w-full">
                Guardar Cambios
              </Button>
            </CardBody>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Palette size={20} />
                Apariencia
              </h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Modo Oscuro</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Activa el modo oscuro para menor consumo de batería</p>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    isDarkMode ? 'bg-primary-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      isDarkMode ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Lock size={20} />
                Cambiar PIN
              </h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Cambia tu PIN de 6 dígitos periódicamente para mayor seguridad.
                </p>
                <Button variant="primary" className="w-full">
                  Cambiar PIN
                </Button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sesiones Activas</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="font-medium text-gray-900 dark:text-white">Este dispositivo</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Última actividad: hace 5 minutos</p>
              </div>
              <Button variant="secondary" className="w-full">
                Cerrar todas las otras sesiones
              </Button>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Bell size={20} />
                Preferencias de Notificaciones
              </h3>
            </CardHeader>
            <CardBody className="space-y-4">
              {[
                { key: 'emailAlerts', label: 'Alertas por Email', desc: 'Recibe alertas importantes' },
                { key: 'budgetWarnings', label: 'Advertencias de Presupuesto', desc: 'Notificaciones cuando se aproxime al límite' },
                { key: 'weeklyReports', label: 'Reportes Semanales', desc: 'Resumen semanal de tus finanzas' },
                { key: 'monthlyReports', label: 'Reportes Mensuales', desc: 'Análisis completo del mes' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </div>
                  <button
                    onClick={() =>
                      setNotifications((prev) => ({
                        ...prev,
                        [item.key]: !prev[item.key as keyof typeof notifications],
                      }))
                    }
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      notifications[item.key as keyof typeof notifications] ? 'bg-primary-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        notifications[item.key as keyof typeof notifications] ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
              <Button onClick={handleSaveProfile} variant="primary" className="w-full mt-4">
                Guardar Preferencias
              </Button>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Privacy Tab */}
      {activeTab === 'privacy' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Exportar Datos</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Descarga una copia de todos tus datos en formato JSON para realizar una copia de seguridad o transferencia.
              </p>
              <Button onClick={handleExportData} variant="secondary" className="w-full">
                <Download size={20} className="mr-2" />
                Exportar Datos
              </Button>
            </CardBody>
          </Card>

          <Card className="border-red-200 dark:border-red-800">
            <CardHeader>
              <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">Peligro</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Eliminar tu cuenta es permanente y no se puede deshacer. Asegúrate de haber exportado tus datos primero.
                </p>
                <Button onClick={handleDeleteAccount} variant="danger" className="w-full">
                  Eliminar Cuenta Permanentemente
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
