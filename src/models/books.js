/**
 * Objeto de tipo Book
 *
 * @class Book
 * @typedef {Book}
 * @exports
 * @author {Ángel Aragón}
 */
 export class Book {
    #title
    #author
    #publish_year
    #category
    #synopsis
    #cover_path

    
    /**
     * Crea una instancia de Book.
     *
     * @constructor
     * @param {string} title 
     * @param {string} author 
     * @param {number} publish_year 
     * @param {string} category 
     * @param {string} synopsis 
     * @param {string} cover_path 
     */
    constructor(title, author, publish_year, category, synopsis, cover_path) {
        this.#title = title;
        this.#author = author;
        this.#publish_year = publish_year;
        this.#category = category;
        this.#synopsis = synopsis;
        this.#cover_path = cover_path;
    }
	 
	get title() {  
		return this.#title;  
	}
	
	set title(value) {  
		this.#title = value;  
	}
	 
	get author() {  
		return this.#author;  
	}
	
	set author(value) {  
		this.#author = value;  
	}
	 
	get publish_year() {  
		return this.#publish_year;  
	}
	
	set publish_year(value) {  
		this.#publish_year = value;  
	}
	 
	get category() {  
		return this.#category;  
	}
	
	set category(value) {  
		this.#category = value;  
	}
	 
	get synopsis() {  
		return this.#synopsis;  
	}
	
	set synopsis(value) {  
		this.#synopsis = value;  
	}

	get cover_path() {  
		return this.#cover_path;  
	}
	
	set cover_path(value) {  
		this.#cover_path = value;  
	}
    
}