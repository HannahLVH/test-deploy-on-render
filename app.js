require("dotenv").config();
require("./config/connection");
require("./config/authStrategy");

// IMPORT PACKAGES
const express = require("express");
// MIDDLEWARE = MIDDLE PERSON
const morgan = require("morgan");
const path = require("path");

// INIT THE APP AND THE PORT
const app = express();
// Convert the port from a hard coded number via the environment variable (process.env) method.
//const PORT = 4000; <-change this, to this (below):
const PORT = process.env.PORT || 3000;
//Then define the port on .env file so when you prepare for deployment, you’re not exposing your port number on GitHub.
//Require cors and helmet:
const cors = require("cors"); //DEFINE CORS AFTER THE PORT
const helmet = require("helmet");
//Require session and passport:
const session = require("express-session");
const passport = require("passport");

app.use(morgan("dev"));

//--------------------------------------
//Define the routing variable for authorsRoutes
const booksRoutes = require('./routes/booksRouter');
const authorsRoutes = require('./routes/authorsRouter');
// Summon adminRoutes files
const adminRoutes = require("./routes/adminRouter");
const siteRoutes = require("./routes/siteRouter")



//use cors
app.use(cors()); //add () because is a middleware method
// use helmet
app.use(helmet());
// J-SON
app.use(express.json());
// ENCODE FORMS
app.use(express.urlencoded({ extended: true })); //if FALSE - querystring library, if TRUE - the qs library, default is true 
// USE PUBLIC DIRECTORY
app.use(express.static(path.join(__dirname + "/public")));

//Tell the app to use express-session, with the secret key and the value that is stored within the .env file, then resave key with a value of false and the saveUnitialized key with a value of false. 


app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
); //every user that visits your site will be assigned a unique session, and this allows you to store the user state

//Next, tell the app to initialize passport 
app.use(passport.initialize()); //tells Node to initialize the authentication module so that Node can authenticate request

//Then, tell the app to tell passport to use the session.
app.use(passport.session()); //allows Passport to work with Express-session in order to keep track of a users state. This is connected to the serializeUser and deserializeUser in the UserSchema (next slide)

// Array containing 3 objects, each object representing information about an author. This is a representation of information that would actually be stored in a database. Since we're not to databases yet, we'll use this array instead. 



//Test this route. Is it operational? If not, what can you do to make it work? What file are you getting the data from?
// Site data is not defined
// Require siteData folder inside app.js like below:

const siteData = require('./data/siteData');

app.get("/", (request, response, next) => {
  response.status(200).json({success: {message: "This route points to the Home page"} , statusCode: 200});
});

//const {signedIn} = require("./data/siteData");

/*
// ADMIN ROUTE IS FOR AUTHENTICATION

app.get("/admin", (request, response, next) => {
  // SEND A MESSAGE
  let auth = signedIn; //WILL SUMMON A LINE OF CODE IF YOU'RE TRYING TO TARGET VALUES FROM DATA FILES
  response.status(200).json({success: {message: "Admin page successful. Restricted access only"}, data: {auth}, statusCode: 200});
})

app.get("/site-routes", (request, response, next) => {
  let msg = "Our server is going to crash for a while until we fix our app according to the classwork. Use this page as a temporary landing page until the index works.";
  response.status(200).json({success: {message: "Site router successful."}, admin: {msg}, statusCode: 200})
})*/

// All Book routes have been moved to their own folders and files. Do the same for the authors.

// THE FOLLOWING app.get("/authors"...) GOT SUBSTITUTED BY THE router.get("/authors", getAllAuthors) ON authorsRouter.js:

// app.get("/authors", (request, response, next) => {
//   response.status(200).json({success: {message: "This route points to the Authors page"}, data: {authorList}, statusCode: 200});
// });

// THE FOLLOWING app.get("/authors/:_id"...) GOT SUBSTITUTED BY THE router.get("/authors/:_id", getAuthor) ON authorsRouter.js:

// app.get("/authors/:_id", (request, response, next) => {
//   response.status(200).json({success: {message: "This route points to the specific author via the ID"}, statusCode: 200});
//   let params = request.params; //store the request.params object in variable
//   console.log(params); //console log variable. Read the server.

//   //Stage several if-else if-else statements OR a switch statement to detect if there is a strict match for the following values - 001, 002, 003.
//   if (params._id === '001') {
//       response.status(200).json({success: {message: "This is the 1st page from the Author List"}});
//   } else if (params._id === '002') {
//     response.json("This is the 2nd page from the Author List");
//   } else if (params._id === '003') {
//     response.json("This is the 3rd page from the Author List");
//   } else { //If there is not a match, console.log "This book doesn't exist. Try searching again."
//       console.log("This book doesn't exist. Try searching again.");        
//   };
// });

//Tell the app to use the routing variables you defined earlier, booksRoutes and authorsRoutes
app.use(booksRoutes);
app.use(authorsRoutes);
//Summon adminRoutes:
app.use(adminRoutes); //this refers to the adminRoutes above that is summoning the adminRouter file
app.use(siteRoutes);

app.listen(PORT, () => {
  console.log(`Carol's bookstore server is listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}/`)
});
