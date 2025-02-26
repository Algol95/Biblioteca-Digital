/**
 * Dirección URL para consultas con la API
 * @type {string}
 * @author {Nico Fernández}
 */
const API_URL = "http://localhost:3000/books";

//READ - Get All Books
export async function getAllBooks() {
    try {
        const { data: books } = await axios.get(API_URL);
        return books;
    } catch (error) {
        console.error(`Error: ${error.response?.message || error.message}`);
    }
}

// READ - Get only one Book
export async function getSingleBook(id) {
    try {
        const { data: book } = await axios.get(`${API_URL}/${id}`);
        return book;
    } catch (error) {
        console.error(`Error: ${error.response?.status || error.message}`);
    }
}