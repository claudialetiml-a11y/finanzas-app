# 💰 FinanzasApp - Gestor Bancario Inteligente

Una aplicación de gestión financiera personal con dashboard con IA, múltiples cuentas bancarias, presupuesto mensual y análisis avanzado.

## 🎯 Características

- 🔐 Autenticación con PIN de 6 dígitos + Session Management
- 💳 Múltiples cuentas bancarias
- 💵 Gestión de ingresos, egresos y gastos
- 📊 Dashboard inteligente con IA
- 📈 Análisis de presupuesto vs gastos reales
- 🏷️ Categorías y subcategorías personalizadas
- 🔍 Filtros avanzados (palabra, fecha, mes, año, categoría)
- 📱 CRUD completo (crear, editar, eliminar)
- 📉 Reportes y gráficos interactivos
- 💡 Insights automáticos y recomendaciones
- 🔄 Sincronización localStorage + Backend
- 🌙 Modo oscuro/claro
- 📱 Responsive design (mobile-first)

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **React 18**
- **Tailwind CSS + shadcn/ui**
- **Zustand** (estado local)
- **Redux Toolkit + RTK Query**
- **Recharts** (gráficos)
- **React Hook Form + Zod**
- **date-fns**

### Backend (Próximamente)
- Node.js + Express
- PostgreSQL + Prisma
- Redis
- JWT + bcrypt
- OpenAI API

## 🚀 Quick Start

```bash
# Clonar repo
git clone https://github.com/claudialetiml-a11y/finanzas-app.git
cd finanzas-app/frontend

# Instalar dependencias
npm install

# Variables de entorno
cp .env.example .env.local

# Ejecutar desarrollo
npm run dev

# Abrir en http://localhost:3000
```

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (main)/
│   │   │   ├── dashboard/
│   │   │   ├── transactions/
│   │   │   ├── accounts/
│   │   │   ├── budget/
│   │   │   ├── categories/
│   │   │   └── reports/
│   │   ├── settings/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   ├── forms/
│   │   ├── cards/
│   │   └── charts/
│   ├── store/
│   │   ├── auth/
│   │   ├── transactions/
│   │   ├── accounts/
│   │   └── ui/
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   └── utils/
├── public/
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## 🎨 Características Principales

### 1️⃣ Autenticación (PIN 6 dígitos)
- Registro de usuario
- Login con PIN
- Biometría opcional
- Session management
- Logout

### 2️⃣ Dashboard IA
- Resumen de ingresos/egresos
- Gráficos de tendencias
- Alertas presupuestarias
- Insights con IA
- Predicciones de gasto

### 3️⃣ Gestión de Transacciones
- CRUD completo
- Historial editable
- Eliminación soft/hard
- Categorización

### 4️⃣ Filtros Avanzados
- Por palabra clave
- Por fecha (rango)
- Por mes/año
- Por categoría/subcategoría
- Por tipo (ingreso/egreso/gasto)
- Por cuenta

### 5️⃣ Presupuesto
- Presupuesto mensual configurable
- Alertas por categoría
- Comparativas vs real
- Proyecciones

### 6️⃣ Reportes
- Gráficos mensuales/anuales
- Exportar a PDF/Excel
- Análisis por categoría
- Comparativas periódicas

## 📝 Roadmap

- [x] Estructura base Frontend (Next.js)
- [x] Sistema de tipos TypeScript
- [x] Store global (Zustand + Redux)
- [x] Layouts y componentes base
- [ ] Autenticación con PIN
- [ ] Dashboard básico
- [ ] CRUD Transacciones
- [ ] Filtros avanzados
- [ ] Gráficos Recharts
- [ ] Backend API
- [ ] IA Dashboard
- [ ] Reportes
- [ ] Deploy

## 👤 Autor

**claudialetiml-a11y**

## 📄 Licencia

MIT
