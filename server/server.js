const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");




// config
dotenv.config({path: "server/config/config.env"});

// database
connectDatabase();





app.listen(process.env.PORT , () => {
    console.log(`server started at port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});