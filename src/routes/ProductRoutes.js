const router = require("express").Router()
const productController = require("../controllers/ProductController")
const zodmiddleware = require("../middlewares/Zodmiddleware")
const productvalidateschema = require("../validationSchemas/ProductValidationSchema")

router.post("/",zodmiddleware(productvalidateschema),productController.createProduct)
router.get("/",productController.getAllProduct)
router.put("/updatestock",productController.updateStockStatus)
module.exports = router