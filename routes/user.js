
const { v4: uuidv4 } = require('uuid');
const { setUser } = require("../service/auth.js");


const express = require("express");
const router = express.Router();

const User = require("../module/users.js");


router.get("/signup", (req, res) => {

    res.render("signup");

})


router.get("/login", (req, res) => {

    res.render("login");

})


router.post("/adduser", async (req, res, next) => {

    try {
        const newuser = new User(req.body.user);
        await newuser.save().then(() => {
            console.log(newuser);

        }).catch((err) => {
            console.log(err);
        })


    } catch (err) {
        next(err);

    }
    res.redirect("/blogs");
})

router.post("/validateuser", async (req, res, next) => {
    const { email, password } = req.body.user;
    const userlogin = await User.findOne({ email, password });

    console.log(userlogin);
    if (!userlogin) {
        res.render("login")
    }
    else {
        
       const token= setUser(userlogin);
        res.cookie("uid", token);

        res.redirect("/blogs/everycontents");

    }


})

router.get('/logout', (req, res) => {
    res.clearCookie('uid'); // Clear the session cookie
    res.redirect("/user/login");
});






module.exports = router;