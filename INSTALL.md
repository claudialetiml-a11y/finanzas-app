# Instrucciones de Instalación

## 🚀 Quick Start con Docker (Recomendado)

### Requisitos
- Docker y Docker Compose instalados
- Puerto 3000, 3001, 5432, 6379 disponibles

### Pasos

```bash
# 1. Clonar repositorio
git clone https://github.com/claudialetiml-a11y/finanzas-app.git
cd finanzas-app

# 2. Ejecutar docker-compose
docker-compose up -d

# 3. Crear las migraciones de BD
docker-compose exec backend npm run migrate

# 4. ¡Listo! Acceder a:
# Frontend:  http://localhost:3000
# Backend:   http://localhost:3001/api
```

## 🛠️ Instalación Manual (Desarrollo Local)

### Requisitos
- Node.js 20+
- npm o yarn
- PostgreSQL 15+
- Redis 7+

### Backend

```bash
cd backend

# 1. Instalar dependencias
npm install

# 2. Crear archivo .env
cp .env.example .env

# 3. Configurar base de datos en .env
# DATABASE_URL=postgresql://finanzas_user:finanzas_password@localhost:5432/finanzas_app

# 4. Ejecutar migraciones
npm run migrate

# 5. (Opcional) Seed con datos de ejemplo
npm run seed

# 6. Ejecutar en desarrollo
npm run dev

# Backend correrá en http://localhost:3001
```

### Frontend

```bash
cd frontend

# 1. Instalar dependencias
npm install

# 2. Crear archivo .env.local
cp .env.example .env.local

# 3. Ejecutar en desarrollo
npm run dev

# Frontend correrá en http://localhost:3000
```

## 📋 Variables de Entorno

### Backend (.env)

```env
# Server
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/finanzas_app

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# Redis
REDIS_URL=redis://localhost:6379

# API
API_URL=http://localhost:3001
FRONTEND_URL=http://localhost:3000

# OpenAI (opcional)
OPENAI_API_KEY=sk-...
```

### Frontend (.env.local)

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_NAME=FinanzasApp

# Environment
NEXT_PUBLIC_ENV=development
```

## 🐳 Comandos Docker Útiles

```bash
# Iniciar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Detener servicios
docker-compose down

# Ejecutar migraciones
docker-compose exec backend npm run migrate

# Acceder a la BD
docker-compose exec postgres psql -U finanzas_user -d finanzas_app

# Acceder a Redis
docker-compose exec redis redis-cli

# Rebuild
docker-compose build --no-cache
```

## 🔍 Verificar que funciona

### Backend

```bash
# Verificar health check
curl http://localhost:3001/api/health

# Debería retornar:
# {"success":true,"message":"Server is running"}
```

### Frontend

```bash
# Abrir en navegador
http://localhost:3000

# Debería redirigir a login
# URL: http://localhost:3000/login
```

## 🧪 Testing

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

## 📦 Build para Producción

### Backend

```bash
cd backend
npm run build
# Genera: dist/

npm start  # Ejecutar producción
```

### Frontend

```bash
cd frontend
npm run build
npm start  # Ejecutar producción
```

## 🌐 Deployment

### Render (Backend)

1. Conectar repositorio GitHub
2. Crear nuevo Web Service
3. Configurar:
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Environment: Node
   - Add variables from .env
4. Deploy

### Vercel (Frontend)

```bash
npm install -g vercel
vercel login
cd frontend
vercel deploy
```

## 🆘 Troubleshooting

### Error: ECONNREFUSED (Database)

```bash
# Verificar que PostgreSQL está corriendo
psql -U finanzas_user -h localhost -d finanzas_app

# O con Docker:
docker-compose ps
```

### Error: Port already in use

```bash
# Cambiar puerto en .env
PORT=3002

# O matar proceso:
lsof -ti:3001 | xargs kill -9
```

### Error: Module not found

```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

## ✅ Checklist de Verificación

- [ ] Node.js 20+ instalado
- [ ] PostgreSQL corriendo
- [ ] Redis corriendo
- [ ] Backend en http://localhost:3001
- [ ] Frontend en http://localhost:3000
- [ ] Puedo iniciar sesión
- [ ] Las transacciones se sincronizan
- [ ] Los gráficos se cargan

---

¡Listo! 🎉 Ya puedes comenzar a usar FinanzasApp.
