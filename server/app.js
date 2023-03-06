const express = require("express");
const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const path = require("path");



const app = express();

app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
// path.join(__dirname, '/public'


// routes
const user = require("./routes/userRoute");
app.use("/auth", user);

const form = require("./routes/formRoute");
const { updateForm } = require("./controllers/formController");
app.use("/api", form);


// error middleware
app.use(errorMiddleware);

module.exports = app;
