//define express 
const express = require("express");
const passport = require("passport");

//const { response } = require("express"); 
//random lines of code such as this one can generate in your Back End while you are doing psuedocode, which may not have the correct syntax. Comment lines of code like this out.

//Define express and router using express.Router()
const router = express.Router();

//Add the following to the constant variable where the controllers are summoned: {createBook, editBook, deleteBook, createAuthor, editAuthor, deleteAuthor} and require the adminController file
const {createBook, editBook, deleteBook, createAuthor, editAuthor, deleteAuthor} = require("../controllers/adminController")

///-------- 
//Make a comment that says "checkAuthentication routing"

//Underneath that, make a comment that says "checkAuthentication route"
//------
const checkAuthentication = (request, response, next) => {
    if (request.isAuthenticated()) {
        return next();
    } else {
        response.redirect(403, "/unauthenticated");
    }
};
//Then, stage a get route of /admin where there is a callback function that has the below routes inside of it.
//you need to get to admin page to get any other resource
router.get("/admin", checkAuthentication, (request, response, next) => {
/*
    try {
           //Add res.json message to test route
    response.json("Admin test successful");
    //Write a comment that says "/auth"
    //------
    //Remember that: .get(), .post(), .put(), and .delete() are routing methods that allow CRUD Operations to happen. It will lead to the function found in the controller. Make sure to use router for all of the routes.
// THE FOLLOWING ARE NOT GET METHODS:
    //Path 1: /create-book
    router.post("/create-book", createBook);
    //Path 2: /books/:id/edit
    router.put("/books/:_id/edit", editBook);
    //Path 3: /books/:id/delete
    router.delete("/books/:_id/delete", deleteBook);

    //Path 4: /create-author
    //Path 5: /authors/:id/edit
    //Path 6: /authors/:id/delete
        
    } catch (error) {
        console.log(error);
    } finally {
        console.log("Server crashed and its down")
    }
*/
    router.get("/auth", (request, response, next) => {
        response.json("Authenticated");
    });
   
    router.post("/create-book", createBook);
    router.put("/books/:_id/edit", editBook);
    router.delete("/books/:_id/delete", deleteBook);

    router.post("/create-author", createAuthor);
    router.put("/authors/:_id/edit", editAuthor);
    router.delete("/authors/:_id/delete", deleteAuthor);

});

/*
//BONUS: refactor the above route to use a try-catch statement. What happens if you try to console log an error in the catch statement?
 //--- for testing purposes as you build nested routes if NOT using get ----
 router.get("/admin/create-book/", (request, response, next) => {
    response.json("You're in the admin path to create a book")
})
//comment this out. What happens in the browser?
*/

//optional to test

router.get("/admin/auth", (request, response, next) => {
    response.json("Authenticated");
});


router.get("/unauthenticated", (request, response, next) => {
    response.redirect("/");
});

// Implement Google Strategy:


// Implement Github Strategy: 
//1. GET to the path of /login/github and a second parameter that allows passport to authenticate a string of github:
router.get("/login/github", passport.authenticate("github"));

//2. GET to the path of /login/github/failed with a callback that has a res.status.json where the message states that "There is a problem with Github Authentication":
router.get("/login/github/failed", (req, res, next) => {
    res.json({message: "There is a problem with Github Authentication"});
});

//3.  GET to the path of /auth/github with passport authentication of the github route and providing a successRedirect to / AND a failureRedirect to /login/github/failed
router.get("/auth/githu", passport.authenticate("github", {
    successRedirect: "/",
    failureRedirect: "/login/github/failed",
}));

//Implement Google Strategy

//1. GET to the path of /login/google with passport authentication of the google route and providing a scope object of an array with a string of profile
router.get('/login/google', passport.authenticate('google', { scope: ['profile'] }));

//2. GET to the path of /login/google/failed with a callback that has a res.status.json where the message states that "There is a problem with Google Authentication".
router.get('/login/google/failed', (req, res, next) => {
    res.json({ message: 'There is a problem with Google authentication.' });
});

//3. GET to the path of /auth/google with passport authentication of the google route and providing a successRedirect to / AND a failureRedirect to /login/local/failed
router.get('/auth/google/admin', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login/google/failed'
}));



// Then make a comment that says "/unauthenticated"

module.exports = router;