const router = require("express").Router()
const RoleController = require("../controllers/RoleController")

router.get("/getRole",RoleController.getAllRoles)
router.post("/createRole",RoleController.createRole)

module.exports = router