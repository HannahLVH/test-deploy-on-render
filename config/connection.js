const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDb is connected")
};


/*
mongoose
.connect(process.env.DB_URL)
.then(()=>console.log("MongoDB is connected"))
.catch((err) => console.log(err));
*/
