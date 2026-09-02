const router = require("express").Router()
const productController = require("../controllers/ProductController")

router.post("/",productController.createProduct)
router.get("/",productController.getAllProduct)
router.put("/updatestock",productController.updateStockStatus)
module.exports = router