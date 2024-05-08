//Define a constant variable respectively and require the bookInventory and authorInventory files at the top of the file.
//const bookInventory = require("../data/bookInventory");
//const authorInventory = require("../data/authorInventory");


//BOOK
const Book = require("../models/bookModel");
//AUTHOR
const Author = require("../models/authorModel");

//--------- GIVEN TO YOU :D -------
const createBook = async (request, response, next) => { //async function
    const { title, author, price, starRating, synopsis } = request.body; //form inputs that the user enters on the form

    //save the data over a blueprint for every NEW instance
    const newBook = new Book({
        title: title,
        author: author,
        price: price,
        starRating: starRating,
        synopsis: synopsis,
      });
    
    

    //check if the book is saved
    try { //if we try to go there AND it was created = hooray!
        await newBook.save(); //save new book entry
        response
        .status(201)
        .json({ success: "A new book is created", data: newBook, statusCode: 201 });
    } catch (error) { //if not then try again
        response
        .status(400)
        .json({ error: "Something happened while creating a book", data: newBook, statusCode: 400 });
    }
};

//editBook -> similar to getBook controller
const editBook = async (request, response, next) => {
    const { _id } = request.params; //am I finding the right book?

    const { title, author, price, starRating, synopsis } = request.body; //book Data found

    const updatedBook = {
        title: title,
        author: author,
        price: price,
        startRating: starRating,
        synopsis: synopsis,
    };

    //find book by ID then update
    //this is looking in the bookModel now instead of bookInventory
    await Book.findByIdAndUpdate({ _id: _id }, updatedBook); 

    //check if book was updated
    try {
        response.status(200).json({
            success: `The book with id ${_id} is updated successfully`,
            data: updatedBook,
            statusCode: 200,
          });
    } catch (error) { //if book wasn't updated, try again
        response
        .status(400)
        .json({ error: "Something happened while editing a book", statusCode: 400 });
    }
};

//deleteBook
const deleteBook = async (request, response, next) => {
    const { _id } = request.params;

    //this is looking in the bookModel now instead of bookInventory
    await Book.findByIdAndDelete({ _id: _id });
    //check to see if we found the right book to delete
    try {
        response.status(200).json({
            success: `The book with id ${_id} is deleted successfully`,
            statusCode: 200,
          });
    } catch (error) { //check if there isn't a match
        response
        .status(400)
        .json({ error: "Something happened while deleting a book", statusCode: 400 });
    }
};


const createAuthor = async (request, response, next) => { //async function
    const {firstName, lastName, birthYear, bio  } = request.body; //form inputs that the user enters on the form

    //save the data over a blueprint for every NEW instance
    const newAuthor = new Author({
        firstName: firstName, 
        lastName: lastName, 
        birthYear: birthYear, 
        bio: bio
      });
    
    //check if the book is saved
    try { //if we try to go there AND it was created = hooray!
        await newAuthor.save(); //save new book entry
        response
        .status(201)
        .json({ success: "A new author is created", data: newAuthor, statusCode: 201 });
    } catch (error) { //if not then try again
        response
        .status(400)
        .json({ error: "Something happened while creating an author", data: newAuthor, statusCode: 400 });
    }
};



const editAuthor = async (request, response, next) => {
    const {_id} = request.params;
    const {firstName, lastName, birthYear, bio} = request.body;

    const updatedAuthor = {
        firstName: firstName,
        lastName: lastName,
        birthYear: birthYear,
        bio: bio
    };

    await Author.findByIdAndDelete({ _id: _id }, updatedAuthor);
    try {
        response.status(200).json({
            success: `The author with id ${_id} is updated successfully`,
            data: updatedAuthor,
            statusCode: 200,
          });
    } catch (error) { //check if there isn't a match
        response
        .status(400)
        .json({ error: "Something happened while updating an author", statusCode: 400 });
    }
};

//deleteAuthor
const deleteAuthor = async (request, response, next) => {
    const { _id } = request.params;
    await Author.findByIdAndDelete({_id: _id});
    try {
        response.status(200).json({
            success: `The author with id ${_id} is deleted successfully`,
            statusCode: 200,
          });
    } catch (error) { //check if there isn't a match
        response
        .status(400)
        .json({ error: "Something happened while deleting an author", statusCode: 400 });
    }
};

module.exports = {createBook, editBook, deleteBook, createAuthor, editAuthor, deleteAuthor};

// CODE ALONG: createAuthor, editAuthor, deleteAuthor