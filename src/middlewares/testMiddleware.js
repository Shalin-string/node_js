const testmiddleware = (role) => (req,res,next)  => {
    console.log("role progrm",role);
    console.log("test middleware called");
    if(role=="admin"){
        next()
    }
    else{
        res.status(400).json({
            message:"invalid middleware"
        })
    }
    
    
}
module.exports = testmiddleware