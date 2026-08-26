const rolemodel = require("../modles/RoleModel")

const getAllRoles = async(req,res)=>{
    const Roles = await rolemodel.find()
    res.json({message:"Roles get",data:Roles})
}

const createRole = async(req,res)=>{
    try{
        console.log("body = ",req.body);
        const createdRole = await rolemodel.insertOne(req.body)
        res.json({message:"ok",createdRole})
    }
    catch(err){
        res.json({err:err})
    }
}

module.exports = {
    createRole,getAllRoles
}