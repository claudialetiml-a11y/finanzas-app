# 💰 FinanzasApp - Frontend

Aplicación de gestión financiera personal con Next.js 14, TypeScript y Tailwind CSS.

## 🚀 Características Implementadas

### ✅ Autenticación
- Login con PIN de 6 dígitos
- Registro de nuevos usuarios
- Session management
- Logout

### ✅ Dashboard
- Resumen de ingresos y egresos
- Gráficos interactivos (Recharts)
- Transacciones recientes
- Alertas e insights

### ✅ Transacciones
- CRUD completo
- Filtros avanzados (palabra, fecha, mes, año, categoría)
- Tabla con sorteo
- Edición y eliminación

### ✅ Cuentas Bancarias
- Crear múltiples cuentas
- Gestionar balance
- Seleccionar cuenta activa
- Editar y eliminar

### ✅ Categorías
- Categorías de ingresos y egresos
- Subcategorías personalizadas
- Emojis/iconos
- Gestión completa

### ✅ Reportes
- Reportes mensuales, trimestrales y anuales
- Gráficos de tendencias
- Análisis por categoría
- Descargar PDF y Excel (simulado)

### ✅ Presupuesto
- Establecer límites por categoría
- Monitoreo en tiempo real
- Alertas visuales
- Progreso de gastos

### ✅ Ingresos & Egresos
- Vista detallada por tipo
- Gráficos por categoría
- Análisis de tendencias
- Comparativas

### ✅ Configuración
- Perfil de usuario
- Tema oscuro/claro
- Seguridad (cambiar PIN)
- Notificaciones
- Privacidad y datos

## 🛠️ Stack Tecnológico

```json
{
  "frontend": {
    "framework": "Next.js 14",
    "language": "TypeScript",
    "styling": "Tailwind CSS",
    "state": "Zustand + Redux Toolkit",
    "forms": "React Hook Form + Zod",
    "charts": "Recharts",
    "icons": "Lucide React",
    "http": "Axios"
  }
}
```

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Variables de entorno
cp .env.example .env.local

# Ejecutar en desarrollo
npm run dev

# Abrir en navegador
# http://localhost:3000
```

## 📁 Estructura de Carpetas

```
src/
├── app/                    # App Router de Next.js
│   ├── (auth)/            # Rutas de autenticación
│   ├── (main)/            # Rutas protegidas
│   └── layout.tsx         # Layout global
├── components/            # Componentes reutilizables
│   ├── layout/           # Sidebar y TopBar
│   └── [...].tsx         # Componentes base
├── hooks/                 # Hooks personalizados
├── lib/                   # Utilidades
│   ├── utils.ts          # Funciones helper
│   └── constants.ts      # Constantes
├── store/                 # Zustand stores
│   ├── authStore.ts      # Autenticación
│   ├── transactionStore.ts
│   ├── accountStore.ts
│   ├── categoryStore.ts
│   └── uiStore.ts
├── types/                 # Tipos TypeScript
└── utils/                 # Funciones utilitarias
```

## 🔐 Seguridad

- ✅ Validación de PIN en frontend
- ✅ Input sanitization con Zod
- ✅ HTTPS ready
- ✅ Session management
- ⏳ CSRF protection (backend)
- ⏳ Rate limiting (backend)

## 🎨 Diseño

- Responsive (Mobile-first)
- Modo oscuro/claro
- Accesibilidad (a11y)
- Colores personalizables
- Animaciones suaves

## 📊 Gráficos Soportados

- Line Charts (Tendencias)
- Bar Charts (Comparativas)
- Pie Charts (Distribución)
- Area Charts (Acumulativos)
- Composed Charts (Combinados)

## ⏳ Próximas Mejoras

- [ ] Integración con backend
- [ ] Autenticación biométrica
- [ ] PWA (Progressive Web App)
- [ ] Soporte offline
- [ ] Exportar PDF/Excel
- [ ] Análisis con IA (OpenAI)
- [ ] Notificaciones push
- [ ] Sincronización en tiempo real (WebSocket)
- [ ] Multi-currency
- [ ] Recurrencias automáticas

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

MIT - Consulta el archivo LICENSE para detalles.

## 👤 Autor

**claudialetiml-a11y**

## 💬 Soporte

Para preguntas o problemas, abre un issue en el repositorio.

---

**Hecho con ❤️ usando Next.js y Tailwind CSS**
