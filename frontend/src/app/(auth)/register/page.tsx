'use client';

import { useState, useEffect } from 'react';
import { useAuthWithBackend } from '@/hooks/useAuthWithBackend';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Card, CardBody, Input, Button, Alert } from '@/components';
import { PIN_LENGTH } from '@/lib/constants';
import { PinInput } from '@/components';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { register } = useAuthWithBackend();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    pin: '',
    confirmPin: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handlePinChange = (field: 'pin' | 'confirmPin', value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido';
    }

    if (!formData.name) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.pin) {
      newErrors.pin = 'El PIN es requerido';
    } else if (formData.pin.length !== PIN_LENGTH) {
      newErrors.pin = `El PIN debe tener ${PIN_LENGTH} dígitos`;
    }

    if (!formData.confirmPin) {
      newErrors.confirmPin = 'Por favor confirma tu PIN';
    } else if (formData.pin !== formData.confirmPin) {
      newErrors.confirmPin = 'Los PINs no coinciden';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    const success = await register(formData.email, formData.name, formData.pin);
    if (!success) {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardBody className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Crear Cuenta</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Ingresa tus datos para comenzar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            label="Email"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, email: e.target.value }));
              setErrors((prev) => ({ ...prev, email: '' }));
            }}
            error={errors.email}
            disabled={isLoading}
          />

          <Input
            type="text"
            label="Nombre Completo"
            placeholder="Juan Pérez"
            value={formData.name}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, name: e.target.value }));
              setErrors((prev) => ({ ...prev, name: '' }));
            }}
            error={errors.name}
            disabled={isLoading}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              PIN (6 dígitos)
            </label>
            <PinInput
              length={PIN_LENGTH}
              onComplete={(pin) => handlePinChange('pin', pin)}
              onChangePin={(value) => handlePinChange('pin', value)}
              disabled={isLoading}
              error={!!errors.pin}
            />
            {errors.pin && <p className="mt-2 text-sm text-red-500">{errors.pin}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Confirmar PIN
            </label>
            <PinInput
              length={PIN_LENGTH}
              onComplete={(pin) => handlePinChange('confirmPin', pin)}
              onChangePin={(value) => handlePinChange('confirmPin', value)}
              disabled={isLoading}
              error={!!errors.confirmPin}
            />
            {errors.confirmPin && <p className="mt-2 text-sm text-red-500">{errors.confirmPin}</p>}
          </div>

          <Button
            type="submit"
            size="lg"
            loading={isLoading}
            className="w-full"
          >
            Crear Cuenta
          </Button>
        </form>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
            Inicia sesión
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}
