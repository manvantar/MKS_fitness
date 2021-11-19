// a Book class using ES6 class syntax
class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }

    describeBook(val) {
        
        return "description"+val;
    }
}

// exporting looks different from Node.js but is almost as simple
module.exports= { Book};