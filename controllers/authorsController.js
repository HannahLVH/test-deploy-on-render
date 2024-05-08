//Start coding here: 
const siteData = require("../data/siteData");
//const Author = require("../data/Author");
const Author = require("../models/authorModel");


const authorSample = async (request, response, next) => {
    const miniAuthor = new Author({
        firstName: "Hannah",
        lastName: "Lopez",
        birthYear: 1990,
        bio: "Born in CDMX"
    })
    console.log(miniAuthor);
    try {
        miniAuthor.save();
        if(200){
            await response.status(200).json({success: {message: "This route points to the author sample"}, date: miniAuthor, statusCode: 200
            })
        }
    } catch (error) {
        response.status(400).json({
            error: {message: "Resource not found. Search again."},
            statusCode: 400
        })   
    }
}

const getAllAuthors = async (request, response, next) => {
    
    //if (200) {
        await Author.find({}).then((authors) =>
        response.status(200).json({success: {message: "This route points to the Authors page with all of the authors"},
        data: authors, siteData, 
        statusCode: 200,
        })
    )
    /*
    } else {
        response.status(400).json({
            error: {message: "Resource not found. Search again."},
            statusCode: 400,
        })
    }    
    console.log(miniAuthor);
    try {
        miniAuthor.save();
        response.json("It works!")
        if(200){
            response.json("It works");
        }
    } catch (error) {
        response.status(400).json({
            error: {message: "Resource not found."},
            statusCode: 400
        })   
    */
    //}
};

const getAuthor = async (request, response, next) => {
    const {_id} = request.params;

    //const foundAuthor = Author.find(Author => Author._id === Number(_id));

    // if (200) {
    //     response.status(200).json({success: {message: "This route points to the Authors page with all of the authors by the ID"},
    //     data: foundAuthor, siteData, statusCode: 200,
    //     });   //if NOT searching by ID
    /*
    
    if (200) {
        let params = request.params;
        console.log(params);
        if (params._id === "001") {
            response.status(200).json({success: {message: "This is the 1st author from the Author Inventory"}});
            } else if (params._id === "002") {
            response.status(200).json({success: {message: "This is the 2nd author from the Author Inventory"}});
            } else if (params._id === "003") {
            response.status(200).json({success: {message: "This is the 3rd author from the Author Inventory"}});    
            } else {
                console.log("This author doesn't exist. Try searching again");
            };
    } else {
        response.status(400).json({
        error: {message: "Resource not found. Search again."},
        statusCode: 400,
        })
    }
    */
    await Author.findOne({_id: _id}).then((authors) => {
        response.status(200).json({
          success: {message: "This route points to the Authors page with one of the author found by the ID"},
          data: authors, siteData,
          statusCode: 200
        })
      })
};

module.exports = {getAllAuthors, getAuthor, authorSample};