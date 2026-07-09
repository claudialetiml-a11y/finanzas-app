'use client';

import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { useLocalStorage } from './useLocalStorage';
import { authApi } from '@/lib/api';
import { useRouter } from 'next/navigation';

export function useAuthWithBackend() {
  const router = useRouter();
  const { setUser, setError, clearError } = useAuthStore();
  const { addNotification } = useUIStore();
  const [_, setToken] = useLocalStorage<string>('finanzas_app_token', '');

  const login = async (email: string, pin: string) => {
    try {
      clearError();
      const res = await authApi.login(email, pin);

      if (res.data.success) {
        const { user, token } = res.data.data;
        setUser(user);
        setToken(token);
        addNotification('Bienvenido!', 'success');
        router.push('/dashboard');
        return true;
      }
    } catch (error: any) {
      const message = error.response?.data?.error || 'Error al iniciar sesión';
      setError(message);
      addNotification(message, 'error');
      return false;
    }
  };

  const register = async (email: string, name: string, pin: string) => {
    try {
      clearError();
      const res = await authApi.register(email, name, pin);

      if (res.data.success) {
        const { user, token } = res.data.data;
        setUser(user);
        setToken(token);
        addNotification('Cuenta creada exitosamente!', 'success');
        router.push('/dashboard');
        return true;
      }
    } catch (error: any) {
      const message = error.response?.data?.error || 'Error al registrarse';
      setError(message);
      addNotification(message, 'error');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken('');
    addNotification('Sesión cerrada', 'info');
    router.push('/login');
  };

  return { login, register, logout };
}
