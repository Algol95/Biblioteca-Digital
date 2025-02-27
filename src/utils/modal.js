/**
 * Inicializa el evento para abrir ventana modal
 * @author {Ángel Aragón}
 * @export
 */
export function initModals() {
    const modalButtons = document.querySelectorAll(".btn--openModal");
    
    modalButtons.forEach(button => {
        button.addEventListener("click", function () {
            const myModal = new bootstrap.Modal(document.getElementById("modal"));
            myModal.show();
          });
    });
}