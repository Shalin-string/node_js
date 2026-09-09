const mongoose = require("mongoose")
const { number, string } = require("zod")

const UserModel = mongoose.Schema({
    name:{
        type:String
    },
    age:{
        type:Number
    },
    number:{
        type:number
    },
    bloodgroup:{
        type:String,
        enum:["A+","A-","B+","B-","AB+","AB-","O+","O-"]
    },
    skills:[{
        type:String
    }],
    address:{
        type:Object
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilepic:{
        type:String
    }
})

module.exports = mongoose.model("users",UserModel)