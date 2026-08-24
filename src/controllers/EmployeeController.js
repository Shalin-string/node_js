const EmpModel = require("../modles/EmployeeModel")
const UserModle = require("../modles/UserModle")

const getAllEmp = async(req,res)=>{
    const emp = await EmpModel.find()
    res.json({message:"Employees...",data:emp})
}

const getNamebyCom = (req,res) =>{
   
    res.json({message:`${req.params.name} from ${req.params.cmp}`})
    
}

const searchemp = async(req,res) =>{
    const id = req.params.id

    
}

const createemp = async(req,res) =>{

     try{
    console.log("body = ",req.body);
    const createemp = await EmpModel.insertOne(req.body)
    res.json({message:"ok"})
     }
     catch(err){
        res.json({err:err})
    }
}


module.exports = {
    getNamebyCom, getAllEmp,createemp
}