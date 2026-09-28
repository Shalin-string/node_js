const express = require("express");
const app = express();
app.use(express.json())
require("dotenv").config()
const getDBConnection = require("./src/utils/DBConnection")
getDBConnection()
const {Queue, delay} = require("bullmq")
const Redis = require("ioredis")

const redisConnection = new Redis(
  "redis://default:reDicq1gyjvZxZwdKafuBv5sypTVLviW@property-flight-neofast-41156.db.redis.io:19491",
);

redisConnection.on("connect",()=>{
  console.log("redis connected!!")
})

const myQueue = new Queue("taskQueue",{connection:redisConnection})

app.post("/add-task",async(req,res)=>{
  console.log("adding task to queue......")
  const name = req.body.name
  const email = req.body.email
  await myQueue.add("task",{name,email},{delay:0})
  res.json({
    message:"task has been assigned"
  })
})


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

const bookRoutes = require("./src/routes/BookRoutes")
app.use("/book",bookRoutes)




const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Port stated on port ${PORT}`);
});
