const router = require(router).Router()
const userController = require("../controllers/UserController")

router.get("/users",userController.getAllUsers)
module.exports = router