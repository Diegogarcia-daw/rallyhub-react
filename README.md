RallyHub - Racing Store

Proyecto de e-commerce especializado en material de competición, desarrollado como proyecto de desenvolvimiento web entorno cliente.

🛠️ Stack Tecnológico
* [cite_start]**Frontend**: React (Vite) 
* [cite_start]**Estilos**: Tailwind CSS (Diseño Responsive) 
* [cite_start]**Backend/DB**: Firebase (Auth & Firestore) 
* **Enrutado**: React Router Dom

Instalación y Configuración
[cite_start]Instrucciones para ejecutar el proyecto en local:

1. Clonar el repositorio:
   `git clone <url-del-repo>`
2. Instalar dependencias:
   `npm install`
3. Configurar variables de entorno:
   * Crear un proyecto en la consola de Firebase.
   * Copiar las credenciales en `src/services/firebase.js`.
4. Ejecutar en modo desarrollo:
   `npm run dev`

📁 Estructura del Proyecto
* `/src/pages`: Vistas principales de la aplicación.
* `/src/components`: Componentes reutilizables (Navbar, Cards, etc).
* `/src/context`: Gestión del estado global (Carrito y Usuario).
* `/src/services`: Configuración de servicios externos (Firebase).