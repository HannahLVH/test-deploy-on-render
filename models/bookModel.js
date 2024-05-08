const mongoose = require("mongoose");

const { Schema } = mongoose;
//fields of form we are looking for
const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, "A title is required"],
  },
  author: {
    type: String,
    required: [true, "The author's name is required"],
  },
  price: {
    type: Number,
    required: [true, "The price is required"],
    min: [1, "Minimum price is 1"],
  },
  starRating: {
    type: Number,
    required: [true, "The rating is required"],
    min: [1, "Minimum number of star rating is 1"],
    max: [5, "Maximum number of start rating is 5"],
  },
  synopsis: {
    type: String,
  },
});

//new variable called Book that has the Mongoose model as the value. The model should be able to create a collection called ‘Book’ and also use the bookSchema for the collection structure
const Book = mongoose.model("Book", bookSchema);

module.exports = Book; //Book constructor object