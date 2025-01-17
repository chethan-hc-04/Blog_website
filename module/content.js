const mongoose=require("mongoose");

const Schema=mongoose.Schema;


let contentSchema=new Schema({
    titel:{
        type:String,
    },
    discription:{
        type:String,
    },
    img:{

        type:String,
    },
   comment:[ {
        type: Schema.Types.ObjectId,
        ref:"comment"
    }],
    dateofcreated:{
        type:Date,
        default:Date.now(),
    },
    createdby:{
        type:Schema.Types.ObjectId,
        ref:"user",
       
    },
});

const Content=mongoose.model("content",contentSchema);

module.exports=Content;