const userModel = require("../modles/UserModle")
const mailSend = require("../utils/MailUtils")

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

const deleteUser = async(req,res) =>{
    try{
        const id = req.params.id;
        const deletedUser = await userModel.findByIdAndDelete(id)
        if(deletedUser){
            res.status(200).json({
                message:"user deleted",
                date:deletedUser
            })
        }
        else{
            res.status(404).json({
                message:"user not found",
            })
        }

    }
    catch(err){
        res.status(404).json({
            message:"error while deleting",
            err:err
        })
    }
}

const updateuser = async(req,res) =>{
    try{

        const id = req.params.id;
        const updatedUser = await userModel.findByIdAndUpdate(id, req.body,{new:true});

        if(updatedUser){
            res.status(200).json({
        message: "user updated",
        data: updatedUser,
            });
        }else{
            res.status(404).json({
                message:"user not found to update"
            })
        }

    }
    catch(err){
        res.status(500).json({
            message:"error while updating",
            err:err
        })
    }
}

const updatebyage = async(req,res) => {
    try{
        const age = req.params.age;
        const updatewithage  =  await userModel.updateMany({age:{$gte:age}},req.body,{new:true})
        if(updatewithage){
            res.status(200).json({
        message: "user updated",
        data: updatewithage,
            });
        }else{
            res.status(404).json({
                message:"user not found to update"
            })
        }
    }
    catch(err){
        res.status(500).json({
            message:"error while updating by age",
            err:err
        })
    }
}

const updateusingid = async(req,res) => {

    try{

        const data =req.query;
        const id = req.query.id;

        const updateusurl = await userModel.findByIdAndUpdate(id, req.query,{new:true})
        if(req.query.id){
        
            if(updateusurl){
                res.status(200).json({
            message: "user updated",
            data: updateusurl,
                });
            }else{
                res.status(404).json({
                    message:"user not found to update"
                })
            }
        }else{
            res.status(404).json({
                message:"id not found to update"
            })
        }
    }
    catch(err){
        res.status(500).json({
            message:"error while updating using url data",
            err:err
        })
    }
}

module.exports ={
    getAllUsers, getUserById,searchByid, searchUser2, createuser, deleteUser, updateuser, updatebyage,
    updateusingid
}