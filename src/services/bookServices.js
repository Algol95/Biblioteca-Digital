/**
 * @file bookService.js
 * @description Este archivo contiene funciones para tratar los datos entre Cliente-Servidor.
 * @author {Nico Fernández}
 * @version 1.0.0
 */


import * as printServices from "./printServices.js";
/**
 * Se importa la clase `Controller` desde el archivo `bookController.js`.
 * Se crea una nueva instancia de la clase `Controller` para utilizar sus métodos CRUD.
 * 
 * @module
 * @requires ../controllers/bookController.js
 */
import { Controller } from "../controllers/bookController.js";

/**
 * Se importa la clase `Book` desde el archivo `book.js`.
 * 
 * @module
 * @requires ../models/book.js
 */
import { Book } from "../models/books.js";

/** 
 * Instancia de la clase `Controller` para poder realizar operaciones CRUD sobre los libros.
 * 
 * @type {Controller}
 */
const bookController = new Controller();

/**
 * Añade un listener de eventos a cada elemento de la lista de categorías de la barra lateral.
 *
 * Selecciona todos los elementos con la clase `.sidebar__item` y, cuando se hace clic en uno de ellos,
 * extrae la categoría del atributo `data-category`. Dependiendo de la categoría seleccionada, se ejecuta la función 
 * correspondiente, ya sea para imprimir todos los libros o filtrar los libros por categoría.
 * 
 * @author {Nico Fernández}
 */
document.querySelectorAll(".sidebar__item").forEach((item) => {
    item.addEventListener("click", () => {
        const category = item.dataset.category;
        category === "all" ? printServices.printAllBooks() : filterByCategory(category);
    });
});

/**
 * Filtra los libros por categoría.
 *
 * Esta función obtiene todos los libros a través del controlador `bookController.getAllBooks()`,
 * y luego filtra aquellos que coinciden con la categoría seleccionada. Finalmente, imprime la lista de libros filtrados
 * usando el servicio `printServices.printListBooks()`.
 * 
 * @async
 * @param {string} category La categoría por la cual filtrar los libros.
 * @returns {Promise<void>} Promesa que se resuelve cuando los libros filtrados son impresos.
 * @author {Nico Fernández}
 * @modified Se añadió manejo de errores con try...catch para capturar posibles fallos en la obtención de los libros.
 */
async function filterByCategory(category) {
    try {
        const books = await bookController.getAllBooks();
        const filteredBooks = books.filter((book) => book.category === category);
        printServices.printListBooks(filteredBooks);
    } catch (error) {
        console.error(`Error al filtrar libros por categoría: ${error.message}`);
    }
}

/**
 * Filtra los libros por título.
 *
 * Esta función recibe un título y filtra los libros cuyos títulos contienen el texto proporcionado.
 * Luego imprime la lista de libros filtrados usando el servicio `printServices.printListBooks()`.
 *
 * @async
 * @param {string} title El título que se utilizará para filtrar los libros.
 * @returns {Promise<void>} Promesa que se resuelve cuando los libros filtrados son impresos.
 * @author {Nico Fernández}
 * @modified Se añadió manejo de errores con try...catch para capturar posibles fallos en la obtención de los libros.
 */
export async function filterByTitle(title) {
    try {
        const books = await bookController.getAllBooks();
        const filteredBooks = books.filter((book) =>
            book.title.toLowerCase().includes(title.toLowerCase())
        );
        printServices.printListBooks(filteredBooks);
    } catch (error) {
        console.error(`Error al filtrar libros por título: ${error.message}`);
    }
}

export async function updateBook(book) {
    const updBook = new Book(
        book.id,
        document.getElementById("updModalTitle").value ? document.getElementById("updModalTitle").value : book.title,
        document.getElementById("updModalAuthor").value ? document.getElementById("updModalAuthor").value : book.author,
        document.getElementById("updModalPublish_year").value ? document.getElementById("updModalPublish_year").value : book.publish_year,
        document.getElementById("updModalCategory").value ? document.getElementById("updModalCategory").value : book.category,
        document.getElementById("updModalSynopsis").value ? document.getElementById("updModalSynopsis").value : book.synopsis,
        document.getElementById("updModalPath").value ? document.getElementById("updModalPath").value : book.cover_path,
    )
    console.log(updBook);
    const response = await bookController.updateBook(book.id, updBook);
    console.log(response);

}

/**
 * Actualiza los metadatos de un libro en la base de datos.
 *
 * @async
 * @function updateMetaBook
 * @param {Object} book - Objeto que contiene los datos actualizados del libro.
 * @param {number|string} book.id - ID único del libro.
 * @param {string} book.title - Título del libro.
 * @param {string} book.author - Autor del libro.
 * @param {string} book.category - Categoría del libro.
 * @param {string} book.synopsis - Sinopsis del libro.
 * @param {string} book.publish_year - Año de publicación del libro.
 * @param {string} book.cover_path - URL de la portada del libro.
 * 
 * @returns {Promise<void>} - No retorna valor, pero registra la respuesta en la consola.
 * 
 * @modified Se agregó el log de la respuesta para depuración.
 * @author Nico Fernández
 */
export async function updateMetaBook(book) {
    try {
        const response = await bookController.updateBook(book.id, book);
    }
    catch (error) {
        console.error(`Error al actualizar los metadatos del libro: ${error.message}`);
    }

}