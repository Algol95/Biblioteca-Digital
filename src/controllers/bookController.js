/**
 * Dirección URL para consultas con la API
 * @type {string}
 * @author {Nico Fernández}
 */
const API_URL = "http://localhost:3000/books";

/**
 * Clase que maneja las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los libros.
 * Utiliza solicitudes HTTP con Axios para interactuar con la API.
 *
 * @export
 * @class Controller
 * @author Nico Fernández
 */
export class Controller {
    /**
     * Crea un nuevo libro en la API.
     *
     * @param {Object} book Objeto que contiene la información del libro a crear.
     * @returns {Promise<Object>} El libro creado con los datos recibidos de la API.
     * @memberof Controller
     */
    async createBook(book) {
        try {
            const response = await axios.post(API_URL, book);
            return response.data;
        } catch (error) {
            console.error("Error al crear el libro:", error.message);
        }
    }

    /**
     * Obtiene todos los libros de la API.
     *
     * @returns {Promise<Array>} Lista de libros obtenidos desde la API.
     * @memberof Controller
     */
    async getAllBooks() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error al obtener los libros:", error.message);
        }
    }

    /**
     * Obtiene un solo libro por su ID desde la API.
     *
     * @param {number|string} id El ID del libro a obtener.
     * @returns {Promise<Object>} El libro correspondiente al ID proporcionado.
     * @memberof Controller
     */
    async getSingleBook(id) {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(
                `Error al obtener el libro con ID ${id}:`,
                error.message
            );
        }
    }

    /**
     * Actualiza la información de un libro existente en la API.
     *
     * @param {number|string} id El ID del libro a actualizar.
     * @param {Object} updatedBook El objeto con los datos actualizados del libro.
     * @returns {Promise<Object>} El libro actualizado con los datos de la API.
     * @memberof Controller
     */
    async updateBook(id, updatedBook) {
        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedBook);
            return response.data;
        } catch (error) {
            console.error(
                `Error al actualizar el libro con ID ${id}:`,
                error.message
            );
        }
    }

    /**
     * Elimina un libro por su ID desde la API.
     *
     * @param {number|string} id El ID del libro a eliminar.
     * @returns {Promise<Object>} Los datos del libro eliminado.
     * @memberof Controller
     */
    async deleteBook(id) {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(
                `Error al eliminar el libro con ID ${id}:`,
                error.message
            );
        }
    }
}
