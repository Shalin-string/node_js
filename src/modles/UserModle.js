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
        type:String
        
    },
    role_id:{
        type:mongoose.Schema.ObjectId,
        ref:"rolemodel"
    },
    profilepic:{
        type:String
    },
    
    profileThumnails:[{
        type:String
        }
    ],

    refreshToken:{
        type:String
    }
})

module.exports = mongoose.model("users1",UserModel)