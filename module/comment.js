const mongoose=require("mongoose");

const Schema=mongoose.Schema;


let commentSchema=new Schema({
    comment:{
        type:String,
    },
    rating:{
        type:String,
    },
    dateofcreated:{
        type:Date,
        default:Date.now(),
    }
});

const Comment=mongoose.model("comment",commentSchema);

module.exports=Comment;