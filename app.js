const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const {restricToLoggedInUserOnly}=require("./middleware/auth.js");

const path = require("path");
const ejsMate = require("ejs-mate")
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose');



const contentsrouter=require("./routes/content.js");
const userrouter=require("./routes/user.js");


async function main() {
    await mongoose.connect('mongodb://localhost:27017/mydatabase');
}
main()
    .then(() => {
        console.log("connected to database");

    })

    .catch((err) => {
        console.log(err);
    })


app.use(cookieParser());


app.use("/blogs",restricToLoggedInUserOnly,contentsrouter);
app.use("/user",userrouter);



app.listen(3000, () => {
    console.log("listening on port 3000");
});