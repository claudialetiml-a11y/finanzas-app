#!/bin/bash

set -e

echo "🚀 Iniciando FinanzasApp..."

echo "📦 Instalando dependencias del backend..."
cd backend
npm install

echo "🔄 Ejecutando migraciones de BD..."
npm run migrate

echo "📦 Instalando dependencias del frontend..."
cd ../frontend
npm install

echo "✅ Setup completado!"
echo ""
echo "📝 Próximos pasos:"
echo ""
echo "1️⃣  Backend:"
echo "   cd backend && npm run dev"
echo ""
echo "2️⃣  Frontend (en otra terminal):"
echo "   cd frontend && npm run dev"
echo ""
echo "3️⃣  O usar Docker:"
echo "   docker-compose up -d"
echo ""
echo "🌐 URLs:"
echo "   Frontend:  http://localhost:3000"
echo "   Backend:   http://localhost:3001/api"
echo "   Database:  localhost:5432"
echo "   Redis:     localhost:6379"
