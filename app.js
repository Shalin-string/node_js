const express = require("express");
const app = express();

const getDBConnection = require("./src/utils/DBConnection")
getDBConnection()

const userRoutes = require("./src/routes/UserRoutes")
app.use("/user",userRoutes)

const EmployeesRoutes = require("./src/routes/EmployeeRoutes")
app.use("/employee",EmployeesRoutes)


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Port stated on port ${PORT}`);
});
