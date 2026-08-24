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

const searchByid = async(req,res)=>{
    const id = req.params.id

    const founduser = await userModel.findById(id)
    if(founduser){
        res.json({
            message:"User found",
            data:founduser
        })
    }
    else{
        res.json({
            message:"User not found"
        })

    }
}

const searchUser2 = async(req,res)=>{

    const data = req.query; //{josn object}
    console.log(data)
    res.json({data:data})
}

const createuser = async(req, res) =>{

    try{
    console.log("req body : ",req.body);
    const createuser = await userModel.insertOne(req.body)
    res.json({message:"created user"})
    }
    catch(err){
        res.json({err:err})
    }
}



module.exports ={
    getAllUsers, getUserById,searchByid, searchUser2, createuser
}