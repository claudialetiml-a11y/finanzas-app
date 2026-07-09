'use client';

import { useState, useEffect } from 'react';
import { useAuthWithBackend } from '@/hooks/useAuthWithBackend';
import { useRouter } from 'next/navigation';
import { Card, CardBody, Input, Button, Alert } from '@/components';
import { PIN_LENGTH } from '@/lib/constants';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { PinInput } from '@/components';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { login } = useAuthWithBackend();
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pinError, setPinError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handlePinComplete = (completedPin: string) => {
    setPin(completedPin);
    setPinError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setPinError('');
    setError('');

    let isValid = true;

    if (!email) {
      setEmailError('El email es requerido');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Por favor ingresa un email válido');
      isValid = false;
    }

    if (!pin) {
      setPinError('El PIN es requerido');
      isValid = false;
    } else if (pin.length !== PIN_LENGTH) {
      setPinError(`El PIN debe tener ${PIN_LENGTH} dígitos`);
      isValid = false;
    }

    if (!isValid) return;

    setIsLoading(true);
    const success = await login(email, pin);
    if (!success) {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardBody className="space-y-6">
        {error && (
          <Alert type="error" title="Error de autenticación">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            type="email"
            label="Email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
            }}
            error={emailError}
            disabled={isLoading}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              PIN (6 dígitos)
            </label>
            <PinInput
              length={PIN_LENGTH}
              onComplete={handlePinComplete}
              onChangePin={(value) => {
                setPin(value);
                setPinError('');
              }}
              disabled={isLoading}
              error={!!pinError}
            />
            {pinError && <p className="mt-2 text-sm text-red-500">{pinError}</p>}
          </div>

          <Button
            type="submit"
            size="lg"
            loading={isLoading}
            className="w-full"
          >
            Iniciar Sesión
          </Button>
        </form>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          ¿No tienes cuenta?{' '}
          <Link href="/register" className="text-primary-600 hover:text-primary-700 font-medium">
            Regístrate aquí
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}
