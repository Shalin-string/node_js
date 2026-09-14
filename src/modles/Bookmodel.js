const mongoose = require("mongoose")

const bookmodel = mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    }
})

module.exports = mongoose.model("Books", bookmodel);