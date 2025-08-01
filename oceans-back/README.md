# 🚀 Ocean Backend

**Ocean Backend** es la API desarrollada para gestionar las operaciones de un restaurante, sirviendo como intermediario entre la base de datos y el frontend. Este sistema permite administrar órdenes, menús, usuarios y otros recursos esenciales.

---

## 🛠️ Tecnologías Utilizadas

Este backend ha sido construido con herramientas modernas que permiten una arquitectura limpia, escalable y segura:

- 🧭 **NestJS** — Framework progresivo para construir aplicaciones Node.js eficientes y mantenibles.
- 🟨 **TypeScript** — Tipado estático para mayor claridad y robustez.
- 🐘 **PostgreSQL** — Base de datos relacional potente y extensible.
- 🔐 **JWT** — Autenticación segura mediante JSON Web Tokens.
- 🔄 **TypeORM** — ORM para interactuar fácilmente con la base de datos.
- 📁 **Multer** — Middleware para la gestión de archivos.
- 📦 **Swagger** — Documentación interactiva de la API.

---

## 📦 Instalación y Ejecución Local

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/tu-usuario/ocean-backend.git
   ```

2. **Ingresar al directorio del proyecto**:

   ```bash
   cd ocean-backend
   ```

3. **Instalar dependencias**:

   ```bash
   npm install
   ```

4. **Crear archivo de variables de entorno**:

   Crea un archivo `.env` con tus variables como:

   ```env
   PORT=3000
   DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/ocean
   JWT_SECRET=tu_clave_secreta
   ```

5. **Ejecutar servidor de desarrollo**:

   ```bash
   npm run start:dev
   ```

6. Accede a la API en:  
   [http://localhost:3000](http://localhost:3000)  
   Accede a la documentación Swagger en:  
   [http://localhost:3000/api](http://localhost:3000/api)

---

## 📁 Estructura del Proyecto

```
ocean-backend/
├── src/
│   ├── auth/            # Módulo de autenticación y login
│   ├── users/           # Gestión de usuarios
│   ├── orders/          # Módulo de órdenes
│   ├── menu/            # Gestión de menús
│   ├── common/          # Middlewares, interceptores, pipes
│   ├── config/          # Configuración global y variables de entorno
│   └── main.ts          # Punto de entrada de la aplicación
├── test/                # Pruebas unitarias
├── .env                 # Variables de entorno
├── nest-cli.json        # Configuración de Nest CLI
├── tsconfig.json        # Configuración de TypeScript
└── package.json         # Dependencias y scripts
```

---

## ✨ Características

- API RESTful modular y escalable.
- Autenticación y autorización mediante JWT.
- Validación de datos con Pipes y DTOs.
- Integración con Swagger para documentación automática.
- Gestión segura de archivos.
- Acceso controlado por roles y permisos.

---

## 📌 Notas Adicionales

- Requiere tener **PostgreSQL** instalado y configurado.
- Se recomienda usar **Node.js ≥ 18**.
- Usa herramientas como Postman o Insomnia para probar los endpoints.

---

## 🧾 Versión

**Ocean Backend** — _v1.0_

---