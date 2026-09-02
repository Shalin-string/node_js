const mongoose = require("mongoose")

const UserModel = mongoose.Schema({
    name:{
        type:String
    },
    age:{
        type:Number
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
    }
})

module.exports = mongoose.model("users",UserModel)