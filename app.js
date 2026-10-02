const express = require("express");

const app = express();
app.use(express.json())
require("dotenv").config()
const getDBConnection = require("./src/utils/DBConnection")
getDBConnection()
const {Queue, delay} = require("bullmq")
const Redis = require("ioredis")
const mailsend = require("./src/utils/MailUtils")
const path = require("path")
//require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const usermodel = require("./src/modles/UserModle")
const bcrypt = require("bcrypt")

const cors = require("cors")
app.use(cors())

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


app.post("/sendotp",async(req,res)=>{
  const email = req.body.email
  const otp = Math.floor(Math.random() * 10000); 

  try{
      await mailsend(email,"Your OTP is: ", otp.toString())
      await redisConnection.set(`otp:${req.body.email}`,otp)
      console.log("otp send successfully");
      res.json({
        message:"otp send successfully",
        otp:otp
      })
      
  }
  catch(err){
    console.log("error while sending otp",err);
    res.status(500).json({
      message:"error while sending otp",
      err:err
    })
  }
  
})


app.post("/getotp",async(req,res)=>{
  const email = req.body.email
  const otp = req.body.otp

  try{

    const storedOtp = await redisConnection.get(`otp:${email}`);
    if (storedOtp === otp) {
      res.json({
        message: "OTP is valid",
      });
    } else {
      res.status(400).json({
        message: "Invalid OTP",
      });
    }
  }
  catch(err){
    console.log("error while getting otp",err);
    res.status(500).json({
      message:"error while getting otp",
      err:err
    })
  }

})



app.post("/resetpassword",async(req,res)=>{
    const otp = await redisConnection.get(`otp:${req.body.email}`);
    const email = req.body.email
    const newPassword = req.body.newPassword

    try{

    if(otp === req.body.otp){
      const foundUser = await usermodel.findOne({email});
      if(foundUser){
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUser = await usermodel.findOneAndUpdate({ email },{ password: hashedPassword })
        res.json({
          message:"password updated successfully",
          updatedUser:updatedUser
        })
      }
      else{
        res.status(404).json({
          message:"user not found"
        })
      }
    }
    else{
      res.status(400).json({
        message:"invalid otp"
      })
    }
}
catch(err){
  console.log("error while resetting password",err);
  res.status(500).json({
    message:"error while resetting password",
    err:err
  })
}
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
