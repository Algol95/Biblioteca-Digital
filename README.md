# Biblioteca Digital

Una aplicación web que permite gestionar y leer libros en línea.

## 📚 Características

- Explorar libros por categoría
- Buscar libros por título
- Panel de administración para gestión de libros (operaciones CRUD)
- Integración de metadatos con la API de OpenLibrary
- Diseño adaptable
- Cambio de tema (claro/oscuro) usando localStorage

## 🛠️ Tecnologías

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)![Google Fonts Badge](https://img.shields.io/badge/Google%20Fonts-4285F4?logo=googlefonts&logoColor=fff&style=for-the-badge)![Git Badge](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=fff&style=for-the-badge)![GitHub Badge](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=fff&style=for-the-badge)![Bootstrap Badge](https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=fff&style=for-the-badge)![vscode](https://img.shields.io/badge/vs%20code-0040a6?&logoColor=fff&style=for-the-badge&colorA=0040a6)![Node.js Badge](https://img.shields.io/badge/Node.js-5FA04E?logo=nodedotjs&logoColor=fff&style=for-the-badge)![Open Library](https://img.shields.io/badge/Open%20Library-e1dcc5?&logoColor=fff&style=for-the-badge&colorA=87f6ff)

## 🎨 Diseño Figma

[![Figma Badge](https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=fff&style=for-the-badge)](https://www.figma.com/proto/OKQ1DAllYB1Az4dns2CHrc/MyLibrary?node-id=2-3&p=f&t=xodwXS5V0VafB8LB-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1)

## 📁 Estructura del Proyecto
```
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
│   │   ├── darkMode.js     # Cambio de tema
│   │   ├── modal.js        # Utilidades de ventanas modales
│   │   └── popover.js      # Funcionalidad de popovers
│   └── views/
│       └── admin.html      # Vista del panel de administración
└── index.html              # Vista principal de la aplicación
```

## 🚀 Comenzando

> [!WARNING]
> Para un correcto funcionamiento del proyecto, sigue las instrucciones de instalación antes de ejecutarlo, ya que Github Pages solo entrega archivos estaticos y no funciona JSON server.

### Requisitos previos

- Node.js (última versión LTS)
- npm (incluido con Node.js)

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Algol95/Biblioteca-Digital
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

## Equipo de Desarrollo

- [**Nico Fernández** - *@srlsrx*](https://github.com/srlsrx)
- [**Ángel Miguel Aragón** - *@Algol95*](https://github.com/Algol95)