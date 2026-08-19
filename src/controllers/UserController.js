const userModel = require("../modles/UserModle")

const getAllUsers = async(req,res) =>{
    const users = await userModel.find()
    res.json({message:"Get all users...",data:users})
}

const getUserById = (req,res)=>{
    console.log("params...",req.params) //{id:""}
    console.log(req.params.id)
    res.json({message:"get user by id called...",id:req.params.id})
}



module.exports ={
    getAllUsers, getUserById
}