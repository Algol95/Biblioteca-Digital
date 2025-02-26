/**
 * Inicializa los popovers de bootstrap
 * @author {Ángel Aragón}
 * @export
 */
export function initPopovers() {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    popoverTriggerList.forEach(popoverTriggerEl => {
        new bootstrap.Popover(popoverTriggerEl);
    });
}