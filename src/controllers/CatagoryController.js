const CatagoryModel = require("../modles/CatagoryModel")
const categoryModel = require("../modles/CatagoryModel")

const createcatagory = async(req,res) =>{
    try{
        const savedCatagory  = await CatagoryModel.create(req.body) 
        res.json({
            message:"catagory saved !!",
            data:savedCatagory
        })
    }
    catch(err){
        res.json({message:"error while creating cataory",err:err})
    }
}

const getAllCatagories = async(req,res) =>{
     try{

        const categories = await categoryModel.find()
        //if else
        if(categories.length>0){
           res.json({
            message:"categories fetched !!",
            data:categories
           }) 
        }
        else{
            res.json({
                message:"no category found.."
            })
        }
        

    }catch(err){
        res.json({
            message:"error while fetching category..",
            err:err
        })
    }


}

module.exports={
    createCategory,getAllCategories
}