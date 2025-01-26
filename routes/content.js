const express = require("express");
const router = express.Router();

const Content = require("../module/content.js");
const Comment = require("../module/comment.js");
const User = require("../module/users.js");



router.get("/", (req, res) => {
    res.render("blogs");
})



router.post("/addcontent", async (req, res, next) => {

    try {
        const newcontent = new Content(req.body.content);

        newcontent.createdby = req.user._id;

        await newcontent.save().then(() => {
            console.log(newcontent);


        }).catch((err) => {
            console.log(err);
        })

    } catch (err) {
        next(err);

    }

    res.redirect("/blogs/allcontents");
})



router.get("/allcontents", async (req, res) => {

    const id = req.user._id;
    const allcontents = await Content.find({ 'createdby': id });

    res.render("blogs", { allcontents });


})

router.get("/everycontents", async (req, res) => {

    
    const evrycontents = await Content.find();

    res.render("allblogs", { evrycontents });


})



router.get("/showblogs/:id", async (req, res) => {

    const { id } = req.params;

    const contents = await Content.findById(id).populate("comment");
    res.render("show", { contents });

})


router.get("/edit/:id", async (req, res) => {
    const { id } = req.params;
    const contents = await Content.findById(id);
    res.render("edit", { contents });



})


router.put("/edit/:id", async (req, res) => {
    const { id } = req.params;
    const contents = await Content.findByIdAndUpdate(id, { ...req.body.content });
    res.redirect(`/blogs/showblogs/${id}`);


})

router.delete("/delete/:id", async (req, res) => {

    const { id } = req.params;
    const contents = await Content.findByIdAndDelete(id);
    console.log(contents);
    res.redirect("/blogs/allcontents");



})


router.post("/addcomment/:id", async (req, res, next) => {

    const { id } = req.params;

    let content = await Content.findById(id);

    let newcomment = new Comment(req.body.comments)
    console.log(newcomment);
    console.log(content);

    content.comment.push(newcomment);

    await newcomment.save();
    await content.save();
    res.redirect(`/blogs/showblogs/${content._id}`);



})


router.get("/profile", async (req, res) => {

    const id = req.user._id;

    const userdetail = await User.findById( id );

    console.log(userdetail);

    res.render("profile", { userdetail });



})



router.get("/newblog", async (req, res) => {


    res.render("newblog");



})







module.exports = router;

