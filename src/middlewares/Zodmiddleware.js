const zodmiddleware = (schema) => (req,res,next) =>{
    try{

        schema.parse(req.body)
        next()
    }catch(err){
        res.status(400).json({
            message:"zodmi error/ invalid request",
            err:err
        })
    }
}

module.exports = zodmiddleware