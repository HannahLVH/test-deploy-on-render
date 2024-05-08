//require mongoose
const mongoose = require("mongoose");
const passport = require("passport");

//use destructuring to assign the schema to mongoose
const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        //required
        //unique
    },
    password: {
        type: String,
        //required
        //unique
    },
    googleId: {
        type: String,
        //required
        //unique
    }
})

//new variable called User that has the Mongoose model as the value. The model should be able to create a collection called ‘User’ and also use the userSchema for the collection structure
const User = mongoose.model("User", userSchema); //make sure User has upper case U

module.exports = User;
