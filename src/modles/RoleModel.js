const mongoose = require("mongoose")
const Schema = mongoose.Schema
const rolemodel = new Schema({
    name:{
        type:String
    },
    status:{
        type:Boolean
    }
})

module.exports = mongoose.model("rolemodel",rolemodel)