const router = require("express").Router()
const EmployeeController = require("../controllers/EmployeeController")

router.get("/employees/:name/:cmp",EmployeeController.getNamebyCom)
router.get("/employees",EmployeeController.getAllEmp)
router.post("/emp",EmployeeController.createemp)

module.exports = router