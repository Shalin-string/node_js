const router = require("express").Router()
const userController = require("../controllers/UserController")

router.get("/users",userController.getAllUsers)
router.get("/user/:id",userController.getUserById)
router.get("/search/:id",userController.searchByid)
router.get("/search2",userController.searchUser2)
router.post("/user",userController.createuser)
router.delete("/user/:id",userController.deleteUser)
router.put("/user/:id",userController.updateuser)
router.put("/userbyage/:age",userController.updatebyage)
router.put("/updateuurl",userController.updateusingid)
module.exports = router