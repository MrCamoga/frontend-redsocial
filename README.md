# 🧑‍🤝‍🧑 Red Social

Proyecto de red social desarrollado con **React**, **Redux**, **Express** y **MongoDB**, que permite a los usuarios registrarse, iniciar sesión, crear publicaciones con imágenes, comentar, dar "likes", y visualizar perfiles personales.

---

## 🚀 Funcionalidades

- 🔐 **Registro e inicio de sesión** con autenticación JWT.
- 📝 **Crear y eliminar publicaciones**, con opción de subir imágenes.
- 💬 **Comentar** publicaciones.
- ❤️ **Dar "like"** a publicaciones y comentarios.
- 👤 **Ver perfil del usuario** con pestañas de:
  - Publicaciones
  - Multimedia
- 🌐 **Estado global** manejado con **Redux**.

---

## 🛠️ Tecnologías utilizadas

### 🔷 Frontend
- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [SASS](https://sass-lang.com/)

### 🔶 Backend
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

---

## 📦 Instalación y uso

### 1. Clona el repositorio

```bash
git clone https://github.com/MrCamoga/TheBridge-Backend-mongoose front
cd front
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Configura la URL de la API

Edita el archivo `src/config.jsx` y cambia la URL de la API si es necesario:

```js
export const API_URL = "http://localhost:3000";
```

### 4. Ejecutar en modo desarrollo

```bash
npm run dev
```

### 5. Generar versión de producción

```bash
npm run build
```

El resultado estará en la carpeta `dist/`.

---

## 🔧 Requisitos adicionales

- Tener el **backend corriendo** (por defecto en `http://localhost:3000`)
- Tener una base de datos **MongoDB** activa y configurada en el backend