const mongoose = require("mongoose")

const UserModel = mongoose.Schema({
    name:{
        type:String
    },
    age:{
        type:Number
    }
})

module.exports = mongoose.model("users",UserModel)