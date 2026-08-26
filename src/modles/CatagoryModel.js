const mongoose = require("mongoose")

const catmodel = mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    description:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model("categories",categoryModel)