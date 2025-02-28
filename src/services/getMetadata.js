/**
 * Obtiene los metadatos de un libro desde OpenLibrary a partir de su título.
 * @author Nico
 * @param {string} title - El título del libro a buscar.
 * @returns {Promise<{title: string, author: string, publish_year: string|number, cover_path: string}>} 
 * Un objeto con los metadatos del libro: título, autor, año de publicación y la URL de la carátula.
 */
export async function getMetadata(title) {
    const API_URL = `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`;
    try{
        const res = await axios.get(API_URL)
        const book = res.data.docs[0]
        if(book){
            return {
                title: book.title,
                author: book.author_name? book.author_name[0]:author,
                publish_year: book.first_publish_year || 'No disponible',
                cover_path: `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` || 'No disponible'
            }
        }
    }catch{

    }
}