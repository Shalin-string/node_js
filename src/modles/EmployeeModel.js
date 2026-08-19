const mongoose = require("mongoose")

const EmpModel = mongoose.Schema({})

module.exports = mongoose.model("employee",EmpModel)