// REQUIRE EXPRESS BECAUSE THAT'S THE ENVIRONMENT WE ARE WORKING WITH
const express = require("express");
// BELOW WE ARE SAYING "EXPRESS, USE THE ROUTER METHOD TO MAKE ROUTER VARIABLE HAPPEN"
const router = express.Router();
// CALL OUR CONTROLLERS (ROUTER AND CONTROLLERS WORK TOGETHER)
// THIS CONTROLLERS ARE LOCATED IN THE CONTROLLERS FILE INSIDE THE CONTROLLERS FOLDER
const { getAllBooks, getBook } = require("../controllers/booksController");
// THE ROUTER POINTS US TO THE PATH
router.get("/books", getAllBooks);

router.get("/books/:_id", getBook);

module.exports = router;
