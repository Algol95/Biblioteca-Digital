/**
 * Elemento del botón de cambio de tema.
 * @type {HTMLElement}
 */
const themeToggle = document.querySelector(".header__theme-toggle");

/**
 * Elemento del cuerpo del documento.
 * @type {HTMLElement}
 */
const bodyElement = document.querySelector("body");

/**
 * Obtiene el tema actual almacenado en el localStorage.
 * @type {string | null}
 */
const currentTheme = localStorage.getItem("theme");

/**
 * Colores del tema claro.
 * @type {Object<string, string>}
 */
const lightTheme = {
    "--color-primary": "#101422",
    "--color-secondary": "#98A0AF",
    "--color-tertiary": "#283255",
    "--color-border": "#BBBBBB",
    "--color-background": "#FFFFFF",
};

/**
 * Colores del tema oscuro.
 * @type {Object<string, string>}
 */
const darkTheme = {
    "--color-primary": "#FFFFFF",
    "--color-secondary": "#98A0AF",
    "--color-tertiary": "#4A5689",
    "--color-border": "#2A2A2A",
    "--color-background": "#101422",
};

/**
 * Aplica el tema guardado o por defecto el tema claro.
 */
if (currentTheme === "dark") {
    applyTheme(darkTheme);
    bodyElement.classList.add("dark-theme");
    themeToggle.classList.replace("bi-brightness-high", "bi-moon-fill");
} else {
    applyTheme(lightTheme);
    themeToggle.classList.replace("bi-moon-fill", "bi-brightness-high");
}

/**
 * Aplica el tema inmediatamente cuando la página se carga.
 */
window.addEventListener("DOMContentLoaded", () => {
    if (currentTheme === "dark") {
        applyTheme(darkTheme);
        bodyElement.classList.add("dark-theme");
        themeToggle.classList.replace("bi-brightness-high", "bi-moon-fill");
        updateBootstrapTheme("dark");
    }
});

/**
 * Alterna entre tema claro y oscuro al hacer clic en el botón.
 */
themeToggle.addEventListener("click", () => {
    if (bodyElement.classList.contains("dark-theme")) {
        bodyElement.classList.remove("dark-theme");
        applyTheme(lightTheme);
        localStorage.setItem("theme", "light");
        themeToggle.classList.replace("bi-moon-fill", "bi-brightness-high");
        updateBootstrapTheme("light");
    } else {
        bodyElement.classList.add("dark-theme");
        applyTheme(darkTheme);
        localStorage.setItem("theme", "dark");
        themeToggle.classList.replace("bi-brightness-high", "bi-moon-fill");
        updateBootstrapTheme("dark");
    }
});

/**
 * Aplica los colores del tema seleccionado al documento.
 * @param {Object<string, string>} theme - Objeto con las variables CSS del tema.
 */
function applyTheme(theme) {
    for (const [property, value] of Object.entries(theme)) {
        document.documentElement.style.setProperty(property, value);
    }
}

/**
 * Actualiza el tema de Bootstrap en función del tema seleccionado.
 * @param {string} theme - Tema seleccionado ("light" o "dark").
 */
function updateBootstrapTheme(theme) {
    const isDark = theme === "dark";
    const mainElement = document.querySelector("main");
    if (mainElement) {
        if (isDark) {
            mainElement.style.backgroundColor = "#1a1e2e";
            bodyElement.style.backgroundColor = "#1a1e2e";
        } else {
            mainElement.style.backgroundColor = "";
            bodyElement.style.backgroundColor = "";
        }
    }
    const tables = document.querySelectorAll(".table");
    tables.forEach((table) => {
        if (isDark) {
            table.classList.add("table-dark");
        } else {
            table.classList.remove("table-dark");
        }
    });
    const buttons = document.querySelectorAll(
        ".btn-primary, .btn-outline-primary"
    );
    buttons.forEach((button) => {
        if (isDark) {
            button.style.borderColor = "#4A5689";
            if (button.classList.contains("btn-primary")) {
                button.style.backgroundColor = "#4A5689";
            }
        } else {
            button.style.borderColor = "";
            button.style.backgroundColor = "";
        }
    });
    const modals = document.querySelectorAll(".modal-content");
    modals.forEach((modal) => {
        if (isDark) {
            modal.style.backgroundColor = "#101422";
            modal.style.borderColor = "#2A2A2A";
        } else {
            modal.style.backgroundColor = "";
            modal.style.borderColor = "";
        }
    });
}
