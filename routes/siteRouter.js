const express = require("express");
const passport = require("passport");

const router = express.Router();

const { register, login, logout } = require("../controllers/siteController");

router.post("/register", register);

router.post("/login", 
    //On the new line, we’re going to authenticate our login locally. 
    //Tell passport to authenticate two parameters:
    passport.authenticate("local", {
        failureRedirect: "/login/error",
        failureMessage: true,
    }), //<- this comma is important, don't forget!!
login);

router.get("/login/error", (request, response, next) => {
    response.json("Login error");
});

router.get("/logout", logout);

module.exports = router;