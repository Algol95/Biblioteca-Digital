import { initPopovers } from "../utils/popover.js";
import { initModals } from "../utils/modal.js";
import { Controller } from "../controllers/bookController.js";
const bookController = new Controller()

/**
 * Variable que referencia el contenedor del grid de libros en el DOM.
 *
 * Se utiliza para manipular y mostrar la lista de libros en la interfaz de usuario.
 *
 * @const {HTMLElement} grid El contenedor del grid de libros.
 * @author Nico Fernández
 */
const grid = document.querySelector("#books-grid");

/**
 *  Constante que alberga el elemento con la ID #tableBooks
 * @type {document.getElementById}
 * @author {Ángel Aragón}
 */
const tableAdmin = document.getElementById("tableBooks");

/**
 * Constante que alberga el elemento con la ID #modalBody
 * @type {document.getElementById}
 */
const modalBody = document.getElementById("modalBody");

/**
 * Constante que alber el elemento con la ID #modalLabel
 *
 * @type {document.getElementById}
 */
const modalLabel = document.getElementById("modalLabel");

/**
 * Constante que Boolean que es verdadero o falso si se encuentra en la página de admin o no.
 * @type {boolean}
 * @author {Ángel Aragón}
 */
const isAdminPage = window.location.pathname.includes("admin.html");

/**
 * Imprime en el HTML una lista de la colección/array de books pasada por parametro.
 *
 * @export
 * @param {books[]} booksArr
 * @modified Modificado para que detecte en que página está, index.html o admin.html, y devuelva la lista con una estructura HTML u otra. Se inicializan los popovers.
 * @author {Nico Fernández}{Ángel Aragón}
 */
export function printListBooks(booksArr) {
  if (isAdminPage) {
    tableAdmin.innerHTML = "";
    booksArr.forEach((book) => {
      tableAdmin.innerHTML += `
            <tr>
              <td>
                <button
                  class="btn btn-outline-primary btn--openModal"
                  data-bs-toggle="popover"
                  data-bs-trigger="hover focus"
                  data-bs-title="Visualizar libro"
                  data-bs-content="Abre una ventana modal para visualizar todos los datos de este libro."
                  id="get${book.id}"
                >
                  ${book.id}
                </button>
              </td>
              <td class="text-truncate" style="max-width: 100px;">${book.title}</td>
              <td>${book.author}</td>
              <td class="text-capitalize">${book.category}</td>
              <td class="d-grid gap-2 d-md-block">
                <button
                  class="btn btn-primary btn--openModal"
                  data-bs-toggle="popover"
                  data-bs-placement="left"
                  data-bs-trigger="hover focus"
                  data-bs-title="Editar libro"
                  data-bs-content="Abre una ventana modal para editar este libro."
                  id="upd${book.id}"
                >
                  <i class="bi bi-pencil-square text-light"></i>
                </button>
                <button
                  class="btn btn-danger btn--openModal"
                  data-bs-toggle="popover"
                  data-bs-placement="left"
                  data-bs-trigger="hover focus"
                  data-bs-title="Borrar libro"
                  data-bs-content="Abre una ventana modal para borrar este libro de la base de datos."
                  id="del${book.id}"
                  >
                  <i class="bi bi-trash text-light"></i>
                </button>
              </td>
            </tr>
            `;
    });

    booksArr.forEach((book) => {
      document.getElementById("get" + book.id).addEventListener("click", () => {
        printModalBook(book);
      });
    });
    initPopovers();
    initModals();
  } else {
    grid.innerHTML = "";
    booksArr.forEach((book) => {
      grid.insertAdjacentHTML(
        "beforeend",
        `<article class="books__card">
                        <img src="${book.cover_path}" alt="Portada ${book.title}"
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
    const books = await bookController.getAllBooks();
    printListBooks(books);
}

function printModalBook(book) {
  modalLabel.innerHTML = `<i class="bi bi-book-half"></i> ${book.title}`;
  modalBody.innerHTML = `<div class="row">
    <div class="col-md">
      <img src="../images/cover_${book.id}.jpg" alt="Portada ${book.title}"
      class="img-fluid" onerror="this.onerror=null; this.src='https://placehold.co/600x400';">
    </div>
    <div class="col-md-8">
      <ul class="list-group">
        <li class="list-group-item"><div class="fw-bold">Título</div><i class="bi bi-book"></i>${book.title}</li>
        <li class="list-group-item"><div class="fw-bold">Autor</div><i class="bi bi-person"></i>${book.author}</li>
        <li class="list-group-item"><div class="fw-bold">Año de publicación</div>${book.publish_year}</li>
        <li class="list-group-item text-capitalize"><div class="fw-bold">Categoría</div>${book.category}</li>
        <li class="list-group-item"><div class="fw-bold">Sinopsis</div>${book.synopsis}</li>
      </ul>
    </div>
  </div>`;
}

printAllBooks();
