const mongoose = require("mongoose");

const { Schema } = mongoose;

const authorSchema = new Schema ({
    firstName: {
        type: String,
        required:[true, "A first name is required"],
        minLength: [1, "Minimum one character"],                 
    },
    lastName: {
        type: String,
        required:[true, "A last name is required"],
        minLength: [1, "Minimum one character"],             
    },
    birthYear: {
        type: Number,
        required:[true, "The birth year is required"],
        minLength: [4, "Enter full year of birth"],
        maxLength: [4, "Enter full year of birth"]     
    },
    bio: {
        type: String,
        required:[true, "A bio is required"],
        minLength: [10, "A minimum of 10 characters is required"],    
    }
})

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;