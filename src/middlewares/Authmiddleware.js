const jwt = require("jsonwebtoken")
const secret = "royal"

const Authmiddleware = (req,res, next) =>{
    var token = req.headers.authorization

    if(token){

        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1]
            
            try{
                    jwt.verify(token,secret)
                    next()
            }
            catch(err){
                    console.log(err);
                    res.status(401).json({
                        
                       message:"invalid token",
                        err:err
                    })

            }
        }else{
            res.status(401).json({
                message:"token is not Bearer token"
            })
        }

    }else{
        res.status(401).json({
            message:"tokan is missing"
        })
    }

}
module.exports = Authmiddleware