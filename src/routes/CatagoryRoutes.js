const router = require("express").Router()
const categoryController = require("../controllers/CatagoryController")


//localhost:3000/category
router.post("/",categoryController.createcatagory)
//localhost:3000/category
router.get("/",categoryController.getAllCatagories)

module.exports = router