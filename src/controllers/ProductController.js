const productModel = require("../modles/ProductModel")

const createProduct = async(req,res)=>{

    try{

        const savedProduct = await productModel.create(req.body)
        res.status(201).json({
            message:"product created",
            data:savedProduct
        })

    }catch(err){
        res.json({
            message:"error while creating product",
            err:err
        })
    }

}


const getAllProduct = async(req,res) =>{
    try{

        const products = await productModel.find().populate("categoryId")
        if(products.length>0){
            res.json({
                message:"products fetched ",
                data:products
            })
        }
        else{
            res.json({
                message:"product not found ",
                
            })
        }

    }catch(err){
        console.log(err)
        res.json({
            message:"error while fetching products",
            err:err
        })
    }
    
}

module.exports = {
    createProduct,getAllProduct
}