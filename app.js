const express = require("express");
const app = express();

app.use(express.json())
require("dotenv").config()

const getDBConnection = require("./src/utils/DBConnection")
getDBConnection()

const userRoutes = require("./src/routes/UserRoutes")
app.use("/user",userRoutes)

const EmployeesRoutes = require("./src/routes/EmployeeRoutes")
app.use("/employee",EmployeesRoutes)

const RoleRoutes = require("./src/routes/RoleRoutes")
app.use("/role",RoleRoutes)

const catagoryRoute = require("./src/routes/CatagoryRoutes")
app.use("/catagory",catagoryRoute)

const productRoutes = require("./src/routes/ProductRoutes")
app.use("/product",productRoutes)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Port stated on port ${PORT}`);
});
