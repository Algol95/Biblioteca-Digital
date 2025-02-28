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