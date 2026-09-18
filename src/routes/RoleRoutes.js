const router = require("express").Router()
const RoleController = require("../controllers/RoleController")
const Authmiddleware = require("../middlewares/Authmiddleware")
const authorization = require("../middlewares/Authmiddleware")


router.get("/getRole",Authmiddleware,RoleController.getAllRoles)
router.post("/createRole",RoleController.createRole)

module.exports = router