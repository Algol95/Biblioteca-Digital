# Biblioteca Digital

Una aplicación web que permite gestionar y leer libros en línea.

## 📚 Características

- Explorar libros por categoría
- Buscar libros por título
- Panel de administración para gestión de libros (operaciones CRUD)
- Integración de metadatos con la API de OpenLibrary
- Diseño adaptable

## 🛠️ Tecnologías

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5.3.3
- Axios
- JSON Server

## 📁 Estructura del Proyecto
biblioteca-digital/
├── server/
│   └── db.json              # Archivo de base de datos JSON
├── src/
│   ├── controllers/
│   │   └── bookController.js # Lógica de interacción con la API
│   ├── models/
│   │   └── books.js         # Definición de la clase Book
│   ├── services/
│   │   ├── bookServices.js     # Servicios relacionados con libros
│   │   ├── getMetaData.js      # Obtener los metadatos desde open library
│   │   ├── printServices.js    # Servicios de renderizado UI
│   │   └── searchServices.js   # Funcionalidad de búsqueda
│   ├── static/
│   │   └── pdf/            # Almacenamiento de archivos PDF
│   ├── styles/
│   │   ├── styles.css      # Estilos globales
│   │   └── index.css       # Estilos de la página principal
│   ├── utils/
│   │   ├── burgerMenu.js   # Funcionalidad del menú móvil
│   │   ├── modal.js        # Utilidades de ventanas modales
│   │   └── popover.js      # Funcionalidad de popovers
│   └── views/
│       └── admin.html      # Vista del panel de administración
└── index.html              # Vista principal de la aplicación

## 🚀 Comenzando

### Requisitos previos

- Node.js (última versión LTS)
- npm (incluido con Node.js)

### Instalación

1. Clona el repositorio:
```bash
git clone [url-del-repositorio]
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor JSON
```bash
npm run api
```

4. Abre `index.html` en tu navegador para acceder a la aplicación principal.

5. Accede a `src/views/admin.html` para el panel de administración.

## 💻 Uso
### Interfaz de Usuario
- Explora libros en la página principal
- Utiliza la barra lateral para filtrar libros por categoría
- Usa la barra de búsqueda para encontrar libros por título
- Haz clic en "Leer Ahora" para abrir el PDF del libro

### Panel de Administración
- Visualiza todos los libros en formato tabla
- Añade nuevos libros
- Edita libros existentes
- Elimina libros
- Actualiza metadatos de libros desde OpenLibrary
