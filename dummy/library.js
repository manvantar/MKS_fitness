// import the book module
const {favoriteBook,Book}= require('./book.js');

// create some books and get their descriptions
let book = new Book();
console.log("My favorite book is " + book.describeBook("This is my book") + ".");
//console.log("I also like " + booksILike[0].describeBook() + " and " + booksILike[1].describeBook());