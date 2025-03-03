import { initPopovers } from "../utils/popover.js";
import { initModals } from "../utils/modal.js";
import { Controller } from "../controllers/bookController.js";
import { updateBook, createBook, deleteBook } from "../services/bookServices.js";
import { getMetadata } from "../services/getMetadata.js";
import { Book } from "../models/books.js";
import { updateMetaBook } from "../services/bookServices.js";
import { darkModeListGroup, darkModeForm} from "../utils/darkMode.js";
const bookController = new Controller();

/**
 * Variable que referencia el contenedor del grid de libros en el DOM.
 * Se utiliza para manipular y mostrar la lista de libros en la interfaz de usuario.
 *
 * @const {HTMLElement} grid El contenedor del grid de libros.
 * @author {Nico Fernández}
 */
const grid = document.querySelector("#books-grid");

/**
 *  Constante que alberga el elemento con la ID `#tableBooks`
 * @type {document.getElementById}
 * @author {Ángel Aragón}
 */
const tableAdmin = document.getElementById("tableBooks");

/**
 * Constante que alberga el elemento con la ID `#modalBody`
 * @type {document.getElementById}
 * @author {Ángel Aragón}
 */
const modalBody = document.getElementById("modalBody");

/**
 * Constante que alber el elemento con la ID `#modalLabel`
 * @type {document.getElementById}
 * @author {Ángel Aragón}
 */
const modalLabel = document.getElementById("modalLabel");

/**
 * Constante que alber el elemento con la ID `#modalFooter`
 * @type {document.getElementById}
 * @author {Ángel Aragón}
 */
const modalFooter = document.getElementById("modalFooter");

/**
 * Constante que Boolean que es verdadero o falso si se encuentra en la página de admin o no.
 * @type {boolean}
 * @author {Ángel Aragón}
 */
const isAdminPage = window.location.pathname.includes("admin.html");

if(isAdminPage){
  document.getElementById("createBook").addEventListener("click", () => {
    printCreateModal();
  })
}


/**
 * Imprime en el HTML una lista de la colección/array `books[]` pasada por parametro.
 *
 * @export
 * @param {books[]} booksArr
 * @modified Modificado para que detecte en que página está, index.html o admin.html, y devuelva la lista con una estructura HTML u otra. Se inicializan los popovers.
 * Modificado para que se abra una nueva pestaña con el pdf en el evento click de los botones de visualización de libros.
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
                  data-bs-content="Abre una ventana modal para visualizar todos los datos de este libro."
                  id="get${book.id}"
                >
                  ${book.id}
                </button>
              </td>
              <td class="text-truncate" style="max-width: 80px;">${book.title}</td>
              <td>${book.author}</td>
              <td class="text-capitalize">${book.category}</td>
              <td class="d-grid gap-2 d-md-block">
                <button
                  class="btn btn-primary btn--openModal"
                  data-bs-toggle="popover"
                  data-bs-placement="left"
                  data-bs-trigger="hover focus"
                  data-bs-content="Abre una ventana modal para editar este libro."
                  id="upd${book.id}"
                >
                  <i class="bi bi-pencil-square text-light"></i>
                </button>
                <button
                  class="btn btn-secondary btn--openModal"
                  data-bs-toggle="popover"
                  data-bs-placement="left"
                  data-bs-trigger="hover focus"
                  data-bs-content="Busca la información del libro en la API de OpenLibrary."
                  id="dwn${book.id}"
                >
                  <i class="bi bi-database-add text-light"></i>
                </button>
                <button
                  class="btn btn-danger btn--openModal"
                  data-bs-toggle="popover"
                  data-bs-placement="left"
                  data-bs-trigger="hover focus"
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
            document
                .getElementById("get" + book.id)
                .addEventListener("click", () => {
                    printModalBook(book);
            });
            document
                .getElementById("upd" + book.id)
                .addEventListener("click", () => {
                    printUpdModal(book);
            });
            document
                .getElementById("dwn" + book.id)
                .addEventListener("click", () => {
                    printModalMeta(book);
            });
            document
                .getElementById("del" + book.id)
                .addEventListener("click", () => {
                    printDelModal(book);
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
                            class="books__card__img" onerror="this.onerror=null; this.src='https://placehold.co/350x500';">
                        <div class="books__card__body">
                            <h5>${book.title}</h5>
                            <p class="books__card__body__txt">${book.author}</p>
                            <button class="books__card__body__btn btn readButton" data-pdf="${book.pdf_path}"><i class="bi bi-book"></i> Leer Ahora</button>
                        </div>
                    </article>`
            );
            
        });

        grid.addEventListener("click", (event) => {
          if (event.target.classList.contains("readButton")) {
              const pdfUrl = event.target.dataset.pdf;
              if (pdfUrl) {
                  window.open(pdfUrl, "_blank"); // Abrir en nueva pestaña
              } else {
                  console.error("No se encontró la URL del PDF.");
              }
          }
      });
    }
}

/**
 * Método que recoge un Get de todos los libros y llama a `printListBooks(books)` para imprimirlos
 *
 * @export
 * @async
 * @modified  Ahora llama a `printListBooks(books)` para simplificar y evitar repetir código.
 * @author {Nico Fernández}{Ángel Aragón}
 */
export async function printAllBooks() {
    const books = await bookController.getAllBooks();
    printListBooks(books);
}

/**
 * Función actualiza los datos de la ventana Modal con la visualización del objeto `Book` pasado por parametro.
 *
 * @param {object} book
 * @author {Ángel Aragón}
 */
function printModalBook(book) {
    modalLabel.innerHTML = `<i class="bi bi-book-half"></i> ${book.title}`;
    modalBody.innerHTML = ``
    modalBody.innerHTML = `<div class="row">
    <div class="col-md">
      <img src="${book.cover_path}" alt="Portada ${book.title}"
      class="img-fluid" onerror="this.onerror=null; this.src='https://placehold.co/350x500';">
    </div>
    <div class="col-md-8">
      <ul class="list-group">
        <li class="list-group-item"><div class="fw-bold"><i class="bi bi-book"></i> Título</div>${book.title}</li>
        <li class="list-group-item"><div class="fw-bold"><i class="bi bi-person"></i>Autor</div>${book.author}</li>
        <li class="list-group-item"><div class="fw-bold"><i class="bi bi-calendar-date"></i> Año de publicación</div>${book.publish_year}</li>
        <li class="list-group-item text-capitalize"><div class="fw-bold"><i class="bi bi-tags"></i> Categoría</div>${book.category}</li>
        <li class="list-group-item"><div class="fw-bold"><i class="bi bi-blockquote-left"></i> Sinopsis</div>${book.synopsis}</li>
      </ul>
    </div>
  </div>`;

  darkModeListGroup();
}

/**
 * Función actualiza los datos de la ventana Modal con la visualización del objeto `Book` a actualizar y un formulario para actualizarlo.
 *
 * @param {object} book
 * @author {Ángel Aragón}
 */
function printUpdModal(book) {
    modalLabel.innerHTML = `<i class="bi bi-pencil-square"></i> Editar libro <span class="text-primary">ID: ${book.id}</span>`;
    modalBody.innerHTML = `
  <!--------------- VISTA PRELIMINAR DEL LIBRO - AMCA ---------------->
  <div class="row">
    <div class="col-md-5 d-none d-md-block">
      <ul class="list-group">
        <li class="list-group-item"><div class="fw-bold"><i class="bi bi-book"></i> Título</div>${book.title}</li>
        <li class="list-group-item"><div class="fw-bold"><i class="bi bi-person"></i>Autor</div>${book.author}</li>
        <li class="list-group-item"><div class="fw-bold"><i class="bi bi-calendar-date"></i> Año de publicación</div>${book.publish_year}</li>
        <li class="list-group-item text-capitalize"><div class="fw-bold"><i class="bi bi-tags"></i> Categoría</div>${book.category}</li>
        <li class="list-group-item">
        <div class="fw-bold">
          <i class="bi bi-file-image"></i> Portada
        </div>
        <div class="d-flex align-items-center">
          <img src="${book.cover_path}" alt="Portada del libro" class="img-thumbnail me-2" style="width: 50px; height: auto;" onerror="this.onerror=null; this.src='https://placehold.co/350x500';">
            <p class="text-break d-inline-block" style="max-width: 100%;">
            ${book.cover_path}
            </p>
        </div>
        </li>
        <li class="list-group-item"><div class="fw-bold"><i class="bi bi-blockquote-left"></i> Sinopsis</div>${book.synopsis}</li>
      </ul>
    </div>

    <!--------------- FORM UPDATE DEL LIBRO - AMCA ---------------->
    
    <div class="col-md-7">
      <form id="updFormBook"> 
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="updModalTitle"
          placeholder="Título">
          <label for="updModalTitle"><i class="bi bi-book"></i> Título</label>
        </div>
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="updModalAuthor" placeholder="Autor">
          <label for="updModalAuthor"><i class="bi bi-person"></i> Autor</label>
        </div>
        <div class="form-floating mb-3">
          <input type="number" class="form-control" id="updModalPublish_year" placeholder="Año de publicación">
          <label for="updModalPublish_year"><i class="bi bi-calendar-date"></i> Año de publicación</label>
        </div>
        <div class="input-group mb-3">
          <label for="updModalCategory" class="input-group-text"><i class="bi bi-tags"></i></label>
          <select class="form-select" id="updModalCategory" required>
            <option selected disabled value="">Selecciona categoría...</option>
            <option value="fiction">Ficción</option>
            <option value="fantasy">Fantasía</option>
            <option value="thriller">Thriller</option>
            <option value="classics">Clásicos</option>
            <option value="poetry">Poesía</option>
            <option value="history">Historia</option>
          </select>
        </div>
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="updModalPath" placeholder="URL Imágen Portada">
          <label for="updModalPath"><i class="bi bi-link"></i> URL Imágen Portada</label>
        </div>
        <div class="form-floating">
          <textarea class="form-control" placeholder="Sinopsis" id="updModalSynopsis" style="height: 300px"></textarea>
          <label for="updModalSynopsis"><i class="bi bi-blockquote-left"></i> Sinopsis</label>
        </div>
      </form>
    </div>
  </div>`;

    modalFooter.innerHTML = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
  <button type="button" class="btn btn-primary" form="updFormBook" id="btnUpdBook">Actualizar</button>`;

    darkModeListGroup();
    darkModeForm();
    document.getElementById("btnUpdBook").addEventListener("click", () => {
        updateBook(book);
    });
}

/**
 * Muestra en el modal los metadatos de un libro obtenidos desde OpenLibrary.
 *
 * @async
 * @function printModalMeta
 * @param {Object} book - Objeto que representa el libro seleccionado.
 * @param {number|string} book.id - ID único del libro.
 * @param {string} book.title - Título del libro.
 * @param {string} book.author - Autor del libro.
 * @param {string} book.category - Categoría del libro.
 * @param {string} book.synopsis - Sinopsis del libro.
 * 
 * @returns {Promise<void>} - No retorna valor, actualiza el contenido del modal.
 * @author {Nico Fernández}
 */
async function printModalMeta(book) {
  modalBody.innerHTML = ""
  const metaBook = await getMetadata(book.title);
  console.log(metaBook);
  if (!metaBook) {
    modalBody.innerHTML = `<div class="alert alert-danger" role="alert">
    No se encontraron metadatos para el libro seleccionado.</div>`;
    return;
  }
  const metaBookObj = new Book(
    book.id,
    metaBook.title,
    metaBook.author,
    metaBook.publish_year,
    book.category,
    book.synopsis,
    metaBook.cover_path
  );
  modalLabel.innerHTML = `<i class="bi bi-book-half"></i> ${book.title}`;
  modalBody.innerHTML = `<div class="row">
    <div class="col-md">
      <img src="${metaBook.cover_path}" alt="Portada ${metaBook.title}"
      class="img-fluid" onerror="this.onerror=null; this.src='https://placehold.co/600x400';">
    </div>
    <div class="col-md-8">
      <ul class="list-group">
        <li class="list-group-item"><div class="fw-bold"><i class="bi bi-book"></i> Título</div>${metaBook.title}</li>
        <li class="list-group-item"><div class="fw-bold"><i class="bi bi-person"></i>Autor</div>${metaBook.author}</li>
        <li class="list-group-item"><div class="fw-bold"><i class="bi bi-calendar-date"></i> Año de publicación</div>${metaBook.publish_year}</li>
      </ul>
    </div>
  </div>`;
  modalFooter.innerHTML = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
  <button type="button" class="btn btn-primary" form="updFormBook" id="btnUpdMetaBook">Actualizar</button>`;

  darkModeListGroup();
  document.getElementById("btnUpdMetaBook").addEventListener("click", async () => {
    const response = await updateMetaBook(metaBookObj);
  });
}


/**
 * Función que abre un Modal con un formulario para generar un objeto book nuevo
 *
 * @param {object} book 
 * @author {Ángel Aragón}
 */
function printCreateModal(){
  modalLabel.innerHTML = `<i class="bi bi-database-add"></i> Crear nuevo libro</span>`;
  modalBody.innerHTML = `
      <form id="createFormBook" class="needs-validation" novalidate> 
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="createModalTitle" required
          placeholder="Título">
          <div class="valid-feedback">
            Título aceptado
          </div>
          <div class="invalid-feedback">
            El campo no puede estar vacío
          </div>
          <label for="createModalTitle"><i class="bi bi-book"></i> Título</label>
        </div>
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="createModalAuthor" placeholder="Autor" required>
          <div class="valid-feedback">
            Valor aceptado
          </div>
          <div class="invalid-feedback">
            El campo no puede estar vacío
          </div>
          <label for="createModalAuthor"><i class="bi bi-person"></i> Autor</label>
        </div>
        <div class="form-floating mb-3">
          <input type="number" class="form-control" id="createModalPublish_year" placeholder="Año de publicación" required>
          <div class="valid-feedback">
            Valor aceptado
          </div>
          <div class="invalid-feedback">
            El valor es requerido
          </div>
          <label for="createModalPublish_year"><i class="bi bi-calendar-date"></i> Año de publicación</label>
        </div>
        <div class="input-group mb-3">
          <label for="createModalCategory" class="input-group-text"><i class="bi bi-tags"></i></label>
          <select class="form-select" id="createModalCategory" required>
            <option selected disabled value="">Selecciona categoría...</option>
            <option value="fiction">Ficción</option>
            <option value="fantasy">Fantasía</option>
            <option value="thriller">Thriller</option>
            <option value="classics">Clásicos</option>
            <option value="poetry">Poesía</option>
            <option value="history">Historia</option>
          </select>
          <div class="valid-feedback">
            Categoría seleccionada
          </div>
          <div class="invalid-feedback">
            Seleccione una opción valida
          </div>
        </div>
        <div class="form-floating mb-3">
          <input type="url" class="form-control" id="createModalPath" placeholder="URL Imágen Portada" required>
          <div class="valid-feedback">
            Ruta aceptada
          </div>
          <div class="invalid-feedback" id="pathErrorMessage">
            Debe ser una URL válida de imagen (http:// o https://) y terminar en .jpg, .jpeg, .png, .gif o .webp.
          </div>
          <label for="createModalPath"><i class="bi bi-link"></i> URL Imágen Portada</label>
        </div>
        <div class="form-floating mb-3">
          <textarea class="form-control" placeholder="Sinopsis" id="createModalSynopsis" style="height: 300px" required></textarea>
          <div class="valid-feedback">
            Valor aceptado
          </div>
          <div class="invalid-feedback">
            Campo requerido
          </div>
          <label for="createModalSynopsis"><i class="bi bi-blockquote-left"></i> Sinopsis</label>
        </div>
        <!-- TODO: Aplicar input file
          <div class="input-group mb-3">
          <label for="createModalFile" class="input-group-text"><i class="bi bi-file-earmark-pdf"></i> PDF</label>
          <input type="file" class="form-control" id="createModalFile" accept="application/pdf" required>
          <div class="valid-feedback">Archivo válido</div>
          <div class="invalid-feedback">Debes subir un archivo PDF</div>
        </div>
        -->
      </form>
    
  `;

  modalFooter.innerHTML = `<button type="submit" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
  <button type="submit" class="btn btn-primary" form="createFormBook" id="btnCreateBook">Crear</button>`;

  darkModeForm();
  document.getElementById("createFormBook").addEventListener("submit", async function (event) {
    event.preventDefault();
    event.stopPropagation();

    const form = this;
    const imageUrlInput = document.getElementById("createModalPath");
    const imageUrl = imageUrlInput.value.trim();
    const errorMessage = document.getElementById("pathErrorMessage");

    const imageRegex = /^(https?:\/\/.*\.(jpeg|jpg|gif|png|webp))$/i;

    let formIsValid = true;  

    if (!imageUrl) {
        imageUrlInput.classList.remove("is-valid", "is-invalid");
    } else if (!imageRegex.test(imageUrl)) {
        imageUrlInput.classList.add("is-invalid");
        imageUrlInput.classList.remove("is-valid");
        errorMessage.style.display = "block";
        formIsValid = false; 
    } else {
        imageUrlInput.classList.add("is-valid");
        imageUrlInput.classList.remove("is-invalid");
        errorMessage.style.display = "none";
    }

    imageUrlInput.setCustomValidity(imageUrl && !imageRegex.test(imageUrl) ? "URL inválida" : "");

    form.classList.add("was-validated");

    if (formIsValid && form.checkValidity()) {
        
        try {
            const response = await createBook();
            if (response.status == 201) {
                alert("Libro creado correctamente");
                form.reset();  
                form.classList.remove("was-validated");
            } else {
                alert("Error al crear el libro");
            }
        } catch (error) {
            console.error("Error al enviar la solicitud:", error);
        }
    }
});

}


/**
 * Función que abre un Modal, pidiendo permiso para borrar el libro pasado por parametro.
 * @param {Book} book 
 * @author {Ángel Aragón}
 */
function printDelModal(book){
  modalLabel.innerHTML = `<i class="bi bi-trash"></i> Borrar libro "${book.title}"</span>`;
  modalBody.innerHTML = `<p>¿Estás segure de eliminar el libro <b class='text-danger'>"${book.title}"</b> con la id <b class='text-danger'>"${book.id}"</b></p>`
  modalFooter.innerHTML = `<button type="submit" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
  <button type="submit" class="btn btn-danger" id="btnDelBook">Borrar</button>`;

  document.getElementById("btnDelBook").addEventListener("click", () => {
    deleteBook(book.id);
  })
}

printAllBooks();
