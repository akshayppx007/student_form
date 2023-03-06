const mongoose = require("mongoose");
mongoose.set("strictQuery", false);


const connectDatabase = () => {
    mongoose.connect("mongodb+srv://akshayppx:" + process.env.DB_ENV + "@cluster0.4ezz2so.mongodb.net/studentForm").then((data) => {
     console.log(`mogngodb connected at ${data.connection.host}`)
    });
 }
 
 
 module.exports = connectDatabase;