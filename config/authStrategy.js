//increase authentication of the app using different strategies
// require bcrypt, define the User model
const passport = require("passport");
const bcrypt = require("bcrypt");

//Define the LocalStrategy, requiring the passport-local package and using the Strategy class.
const LocalStrategy = require("passport-local").Strategy;

//Define github strategy
const GithubStrategy = require("passport-github").Strategy;

//Define google strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//Require the user model
const User = require("../models/userModel");

/*
const verify = async (request, response, next) => {
    bcrypt.compare(password, user.password, (error, result) => {
        // result == true
        if (error) {
            return done(error);
          }
        return done(null, user);
    });

}

//we have the verify function here as basic authentication (login) to compare from the register function
*/

//Tell passport to use the new LocalStrategy you set up.
passport.use(
    new LocalStrategy(
        //Stage a (new) verify function that is able to use the User model to findOne user by their username.
        (verify = (username, password, done) => {
            User.findOne({ username: username}).then((user) => {
                // IF there is NOT a found user, we’ll use the done parameter as a callback to tell us there is not a user.
                if (!user) {
                    return done(null, false, {message: "User not found"});
                }
                //If there is a user, use bcrypt to compare the password entered with the one stored. Console.log the result to check if there’s a match.
                bcrypt.compare(password, user.password, (error, result) => {
                    //If there’s an error in comparison, return the error with the done callback.
                    if (error) {
                        return done(error);
                    }
                    //Otherwise, return the done callback with the user.
                    return done(null, user);
                });
            });
        })

    )
);


//Implement github strategy
//1. Tell passport to use a new GitHub strategy as a container:
passport.use(new GithubStrategy({ 
    //2. Define key values:
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github",
}, //<- this comma is important, don't forget!
// Stage object () with the following 4 parameters:
    (accessToken, refreshToken, profile, done) => {
        //Arrow function to console log the "profile" parameter to see the user's information
        console.log(profile);
        //return done callback with 2 parameters
        return done(null, profile);
    }
));

//Implement Google strategy:
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/admin"
},
(accessToken, refreshToken, profile, done) => { 
    console.log(profile); 
    return done(null, profile); 
    }
));

//Using the passport documentation, we'll use the syntax to serialize and deSerialize the user.
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});