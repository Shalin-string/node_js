const mongoose = require("mongoose")

const EmpModel = mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    gender:{
        type:String
    },
    email:{
        type:String
    },
    salary:{
        type:Number
    },
    department:{
        type:Object
    }
})

module.exports = mongoose.model("employee",EmpModel)