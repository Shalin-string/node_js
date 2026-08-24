const router = require("express").Router()
const userController = require("../controllers/UserController")

router.get("/users",userController.getAllUsers)
router.get("/user/:id",userController.getUserById)
router.get("/search/:id",userController.searchByid)
router.get("/search2",userController.searchUser2)

module.exports = router