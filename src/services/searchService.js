import { filterByTitle } from "./bookServices.js";
const searchInputs = document.querySelectorAll('input[type="search"]');

/**
 * Maneja la funcionalidad de búsqueda de libros por título, filtrando los libros
 * según el texto introducido por el usuario en los campos de búsqueda.
 *
 * @param {Event} event - El evento generado por el input del usuario.
 * @author {Nico Fernández}
 */
searchInputs.forEach(input => {
    input.addEventListener('input', async event=>{
        const title = event.target.value
        filterByTitle(title)
    })
})
