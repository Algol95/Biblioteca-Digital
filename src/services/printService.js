const API_URL = "http://localhost:3000/books";
const grid = document.querySelector("#books-grid");
//----------------GET FUNCTION----------------//

//READ - Get All the Books
export async function getAllBooks() {
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
export function printGrid(booksArr) {
    grid.innerHTML = "";
    booksArr.forEach((book) => {
        grid.insertAdjacentHTML(
            "beforeend",
            `<article class="books__card">
                    <img src="./src/images/cover_${book.id}.jpg" alt="Portada ${book.title}"
                        class="books__card__img" onerror="this.onerror=null; this.src='https://placehold.co/600x400';">
                    <div class="books__card__body">
                        <h5>${book.title}</h5>
                        <p class="books__card__body__txt">${book.author}</p>
                        <button class="books__card__body__btn btn"><i class="bi bi-book"></i> Leer Ahora</button>
                    </div>
                </article>`
        );
    });
}

export async function printAllBooks() {
    const books = await getAllBooks();
    grid.innerHTML = "";
    books.forEach((book) => {
        grid.insertAdjacentHTML(
            "beforeend",
            `<article class="books__card">
                    <img src="./src/images/cover_${book.id}.jpg" alt="Portada ${book.title}"
                        class="books__card__img" onerror="this.onerror=null; this.src='https://placehold.co/600x400';">
                    <div class="books__card__body">
                        <h5>${book.title}</h5>
                        <p class="books__card__body__txt">${book.author}</p>
                        <button class="books__card__body__btn btn"><i class="bi bi-book"></i> Leer Ahora</button>
                    </div>
                </article>`
        );
    });
}

printAllBooks();
