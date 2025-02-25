

/**
 * Dirección URL de la API
 *
 * @type {"http://localhost:3000/books"}
 */
const API_URL = "http://localhost:3000/books";

/**
 * Description placeholder
 *
 * @type {*}
 */
const grid = document.querySelector("#books-grid")


/**
 * Description placeholder
 *
 * @type {*}
 */
const tableBooks = document.getElementById("tableBooks");
//----------------GET FUNCTION----------------//


//READ - Get All the Books
async function getAllBooks() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const books = await res.json();
        return books;
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

// READ - Get only one Book
async function getSingleBook(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const book = await res.json();
        return book;
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

//----------------PRINT FUNCTION----------------//
async function printGrid(category) {
    if (category === "all") {
        try {
            const books = await getAllBooks();
            grid.innerHTML = "";
            books.forEach((book) => {
                grid.insertAdjacentHTML(
                    "beforeend",
                    `<article class="books__card">
                <img src="./src/images/cover_${book.id}.jpg" alt="Portada ${book.title}"
                    class="books__card__img">
                <div class="books__card__body">
                    <h5>${book.title}</h5>
                    <p class="books__card__body__txt">${book.author}</p>
                    <button class="books__card__body__btn btn"><i class="bi bi-book"></i> Leer Ahora</button>
                </div>
            </article>`
                );
            });
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    } else {
        try {
            const books = await getAllBooks();
            grid.innerHTML = "";
            const filteredBooks = books.filter(
                (book) => book.category === category
            );
            filteredBooks.forEach((book) => {
                grid.insertAdjacentHTML(
                    "beforeend",
                    `<article class="books__card">
                <img src="./src/images/cover_${book.id}.jpg" alt="Portada ${book.title}"
                    class="books__card__img">
                <div class="books__card__body">
                    <h5>${book.title}</h5>
                    <p class="books__card__body__txt">${book.author}</p>
                    <button class="books__card__body__btn btn"><i class="bi bi-book"></i> Leer Ahora</button>
                </div>
            </article>`
                );
            });
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    }
}

printGrid("all")

async function printAllAdminMenu(){

}
