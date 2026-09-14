const mongoose = require("mongoose")
const { string, date, boolean } = require("zod")

const bookdatailmodel = mongoose.Schema({
    bid:{
        type:string
    },
    price:{
        type:Number
    },
    cover:{
        type:String 
    },
    pages:{
        type:Number
    },
    publishYear:{
        type:date
    },
    status:{
        type: String,
        enum: ["available", "unavailable"],
    }
})

module.exports = mongoose.model("BookDetail", bookdatailmodel);