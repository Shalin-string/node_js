const EmpModel = require("../modles/EmployeeModel")

const getAllEmp = async(req,res)=>{
    const emp = await EmpModel.find()
    res.json({message:"Employees...",data:emp})
}

const getNamebyCom = (req,res) =>{
   
    res.json({message:`${req.params.name} from ${req.params.cmp}`})
    
}

module.exports = {
    getNamebyCom, getAllEmp
}