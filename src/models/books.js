/**
 * Objeto de tipo Book
 *
 * @class Book
 * @typedef {Book}
 * @exports
 * @author {Ángel Aragón}
 */
 export class Book {
   

    
    /**
     * Crea una instancia de Book.
     *
     * @constructor
     * @param {string} id
     * @param {string} title 
     * @param {string} author 
     * @param {number} publish_year 
     * @param {string} category 
     * @param {string} synopsis 
     * @param {string} cover_path 
     * @param {string} pdf_path
     */
    constructor(title, author, publish_year, category, synopsis, cover_path, pdf_path) {
        
        this.title = title;
        this.author = author;
        this.publish_year = publish_year;
        this.category = category;
        this.synopsis = synopsis;
        this.cover_path = cover_path;
        this.pdf_path = pdf_path;
    }
    
}