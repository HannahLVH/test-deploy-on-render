const bcrypt = require("bcrypt");

const User = require("../models/userModel");

const register = async (request, response, next) => {
    const { username, password } = request.body;
    //Here, we’ll import the bcrypt package to use the hash method, with three parameters - password, the number 10 which will then act as a salt that will be generated with the specified number of rounds and used, and an asynchronous function that has 2 parameters - error and a hashedPassword.

    bcrypt.hash(password, 10, async (error, hashedPassword) => {
        if (error) {
            return next(error)
        }
        //return done(null, user)
        const newUser = new User({
            username: username,
            password: hashedPassword, 
            googleID: "",
        });
        await newUser.save() 
        request.login(newUser, (err) => {
            response.status(201).json({
            success: { message: "New user is created" },
            data: { username },
            statusCode: 201,
            });
        })
    })
};

const login = async (request, response, next) => {
    console.log(request.user);
    response.status(200).json({
        success: { message: "User logged in." },
        data: {username: request.user.username},
        statusCode: 200,
    });
}

const logout = async (request, response, next) => {
    request.logout((error) => {
        if (error) {
            response.json({
                error: { message: "Something went wrong when logging out" },
                statusCode: 400,
            });
         };
        response.json("Successfully logged out");
    });
};

module.exports = { register, login, logout };