const router = require("express").Router()
const productController = require("../controllers/ProductController")

router.post("/",productController.createProduct)
router.get("/",productController.getAllProducts)

module.exports = router