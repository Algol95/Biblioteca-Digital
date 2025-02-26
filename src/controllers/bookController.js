/**
 * Dirección URL para consultas con la API
 * @type {string}
 * @author {Nico Fernández}
 */
const API_URL = "http://localhost:3000/books";

/**
 * Obtiene todos los libros desde la API y devuelve la lista de libros.
 *
 * @async
 * @function
 * @returns {Promise<books[]>} Una promesa que resuelve con la lista de libros.
 * @throws {Error} Si ocurre un error durante la solicitud a la API.
 * @author Nico Fernández
 */
export async function getAllBooks() {
    try {
        const { data: books } = await axios.get(API_URL);
        return books;
    } catch (error) {
        console.error(`Error: ${error.response?.message || error.message}`);
    }
}

/**
 * Obtiene un solo libro desde la API basado en el ID proporcionado.
 *
 * @async
 * @function
 * @param {string} id El ID del libro que se desea obtener.
 * @returns {Promise<book>} Una promesa que resuelve con los detalles del libro.
 * @throws {Error} Si ocurre un error durante la solicitud a la API.
 * @author Nico Fernández
 */
export async function getSingleBook(id) {
    try {
        const { data: book } = await axios.get(`${API_URL}/${id}`);
        return book;
    } catch (error) {
        console.error(`Error: ${error.response?.status || error.message}`);
    }
}