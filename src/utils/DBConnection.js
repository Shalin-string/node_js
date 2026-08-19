const mongoose = require("mongoose")

const getDBConnection = () => {

    mongoose.connect("mongodb://127.0.0.1:27017/25fulldaynode").then(()=>{
        console.log("database connected !!!");
        
    }).catch((err)=>{
        console.log("error while connected database ...")
    })
}

module.exports = getDBConnection