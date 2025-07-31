# 🌊 Oceans API - Backend

Este es el backend del sistema de gestión de órdenes para restaurantes, desarrollado con **NestJS**. La aplicación permite la creación de productos, el manejo de órdenes (crear, cerrar) y la visualización de un dashboard con todas las órdenes registradas. Además, cuenta con subida de archivos, validaciones robustas y documentación interactiva mediante Swagger.

---

## 🚀 Características

- ✅ Gestión de productos
- ✅ Creación y cierre de órdenes con productos seleccionados
- ✅ Dashboard para visualizar todas las órdenes creadas
- ✅ Validación de DTOs usando `class-validator`
- ✅ Carga de archivos usando `multer`
- ✅ Documentación Swagger (`/api/docs`)
- ✅ Configuración por variables de entorno (`.env`)
- ✅ Soporte para CORS y peticiones grandes (hasta 50MB)