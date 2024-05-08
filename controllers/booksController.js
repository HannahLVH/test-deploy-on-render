const siteData = require('../data/siteData')
const Book = require('../models/bookModel');

const getAllBooks = async (request, response, next) => {
  if (200) {
    await Book.find({}).then((books) => 
    response.status(200).json({success: { message: "This route points to the Books page with all of the books" },
    data: books, siteData, statusCode: 200,
    })
    )
  /*} else {
    response.status(400).json({
      error: { message: "Resource not found. Search again." },
      statusCode: 400,
    })*/
  }
};

const getBook = async (request, response, next) => {
  const { _id } = request.params;

  /*
  const foundBook = bookInventory.find(bookInventory => bookInventory._id === Number(_id));

  // if (200) {
  //    response.status(200).json({success: { message: "This route points to the Books page with one of the books by the ID" },
  //    data: foundBook, siteData, statusCode: 200,
  //   });    //if NOT searching by ID

    //if searching by the ID, comment out lines 26-29 and uncomment the code block below.
    // /*
  if (200) {
    let params = request.params; //store the request.params object in variable
    console.log(params); //console log variable. Read the server.
    if (params._id === '001') {
      response.status(200).json({success: {message: "This is the 1st page from the Book Inventory "}});
      } else if (params._id === '002') {
      response.json("This is the 2nd page from the Book Inventory");
      } else if (params._id === '003') {
      response.json("This is the 3rd page from the Book Inventory");
      } else { //If there is not a match, console.log "This book doesn't exist. Try searching again."
      console.log("This book doesn't exist. Try searching again.");        
      };
    // */  
   /* 
  } else {
    response.status(400).json({
      error: { message: "Resource not found. Search again." },
      statusCode: 400, */

  await Book.findOne({_id: _id}).then((books) => {
    response.status(200).json({
      success: {message: "This route points to the Books page with one of the books found by the ID"},
      data: books, siteData,
      statusCode: 200
    })
  })
};


module.exports = { getAllBooks, getBook };
