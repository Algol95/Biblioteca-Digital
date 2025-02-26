import { initPopovers } from "../utils/popover.js";

/**
 * Dirección URL para consultas con la API
 * @type {string}
 * @author {Nico Fernández}
 */
const API_URL = "http://localhost:3000/books";
const grid = document.querySelector("#books-grid");

/**
 *  Constante que alberga el elemento con la ID #tableBooks
 * @type {document.getElementById} 
 * @author {Ángel Aragón}
 */
const tableAdmin = document.getElementById("tableBooks");


/**
 * Constante que Boolean que es verdadero o falso si se encuentra en la página de admin o no.
 * @type {boolean}
 * @author {Ángel Aragón}
 */ 
const isAdminPage = window.location.pathname.includes("admin.html")


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

/**
 * Imprime en el HTML una lista de la colección/array de books pasada por parametro.
 *
 * @export
 * @param {books[]} booksArr 
 * @modified Modificado para que detecte en que página está, index.html o admin.html, y devuelva la lista con una estructura HTML u otra. Se inicializan los popovers.
 * @author {Nico Fernández}{Ángel Aragón}
 */
export function printListBooks(booksArr) {
    if (isAdminPage){
        tableAdmin.innerHTML = "";
        booksArr.forEach(book => {
            tableAdmin.innerHTML += `
            <tr>
              <td>
                <button
                  class="btn btn-outline-primary"
                  class="btn btn-success"
                  data-bs-toggle="popover"
                  data-bs-trigger="hover focus"
                  data-bs-title="Visualizar libro"
                  data-bs-content="Abre una ventana modal para visualizar todos los datos de este libro."
                >
                  ${book.id}
                </button>
              </td>
              <td class="text-truncate" style="max-width: 100px;">${book.title}</td>
              <td>${book.author}</td>
              <td class="text-capitalize">${book.category}</td>
              <td class="d-grid gap-2 d-md-block">
                <button
                  class="btn btn-primary"
                  class="btn btn-success"
                  data-bs-toggle="popover"
                  data-bs-placement="left"
                  data-bs-trigger="hover focus"
                  data-bs-title="Editar libro"
                  data-bs-content="Abre una ventana modal para editar este libro."
                >
                  <i class="bi bi-pencil-square text-light"></i>
                </button>
                <button
                  class="btn btn-danger"
                  class="btn btn-success"
                  data-bs-toggle="popover"
                  data-bs-placement="left"
                  data-bs-trigger="hover focus"
                  data-bs-title="Borrar libro"
                  data-bs-content="Abre una ventana modal para borrar este libro de la base de datos."
                >
                  <i class="bi bi-trash text-light"></i>
                </button>
              </td>
            </tr>
            `;
            
        })
        initPopovers();
    } else {
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
}


/**
 * Método que recoge un Get de todos los libros y llama a printListBooks(books) para imprimirlos
 *
 * @export
 * @async
 * @modified  Ahora llama a printListBooks(books) para simplificar y evitar repetir código.
 * @author {Nico Fernández}{Ángel Aragón}
 */
export async function printAllBooks() {
    const books = await getAllBooks();
    printListBooks(books);
}

printAllBooks();
