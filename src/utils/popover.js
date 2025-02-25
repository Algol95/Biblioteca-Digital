/** 
 * Inicializa los popovers de bootstrap
 * @author {Ángel Aragón}
 * @file  */

document.addEventListener("DOMContentLoaded", function () {
    var popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    var popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
});