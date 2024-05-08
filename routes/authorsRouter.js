//Start coding here: 
// REQUIRE EXPRESS BECAUSE THAT'S THE ENVIRONMENT WE ARE WORKING WITH
const express = require("express");
// BELOW WE ARE SAYING "EXPRESS, USE THE ROUTER METHOD TO MAKE ROUTER VARIABLE HAPPEN"
const router = express.Router();

// SET UP authorController
const {getAllAuthors, getAuthor, authorSample} = require("../controllers/authorsController");
// SET UP ROUTES
// I WANT TO GET TO THE AUTHORS PAGE TO SEE ALL THE AUTHORS:
// THIS WILL SUBSTITUTE THIS ON THE APP.JS:
// app.get("/authors", (request, response, next) => {
//   response.status(200).json({success: {message: "This route points to the Authors page"}, data: {authorList}, statusCode: 200});
// });
router.get("/authors/sample", authorSample);
router.get("/authors", getAllAuthors);
// THIS WILL SUBSTITUTE THIS ON THE APP.JS:
// app.get("/authors/:_id", (request, response, next) => {
//     response.status(200).json({success: {message: "This route points to the specific author via the ID"}, statusCode: 200});
//     let params = request.params; //store the request.params object in variable
//     console.log(params); //console log variable. Read the server.
  
//     //Stage several if-else if-else statements OR a switch statement to detect if there is a strict match for the following values - 001, 002, 003.
//     if (params._id === '001') {
//         response.status(200).json({success: {message: "This is the 1st page from the Author List"}});
//     } else if (params._id === '002') {
//       response.json("This is the 2nd page from the Author List");
//     } else if (params._id === '003') {
//       response.json("This is the 3rd page from the Author List");
//     } else { //If there is not a match, console.log "This book doesn't exist. Try searching again."
//         console.log("This book doesn't exist. Try searching again.");        
//     };
//   });
router.get("/authors/:_id", getAuthor);

module.exports = router;