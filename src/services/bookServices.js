import * as printServices from "./printService.js";

document.querySelectorAll(".sidebar__item").forEach((item) => {
    item.addEventListener("click", () => {
        const category = item.dataset.category;
        category === "all" ? printServices.printAllBooks() : filterByCategory(category);
    });
});

//----------FILTER & PRINT---------//
async function filterByCategory(category) {
    const books = await printServices.getAllBooks();
    const filteredBooks = books.filter((book) => book.category === category);
    printServices.printGrid(filteredBooks);
}

export async function filterByTitle(title) {
    const books = await printServices.getAllBooks();
    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(title.toLowerCase())
    );
    printServices.printGrid(filteredBooks);
}
