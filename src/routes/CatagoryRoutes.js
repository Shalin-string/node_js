const router = require("express").Router()
const categoryController = require("../controllers/CategoryController")


//localhost:3000/category
router.post("/",categoryController.createCategory)
//localhost:3000/category
router.get("/",categoryController.getAllCategories)

module.exports = router