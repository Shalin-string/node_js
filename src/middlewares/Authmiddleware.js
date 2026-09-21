const jwt = require("jsonwebtoken")
const secret = "royal"
const usermodel = require("../modles/UserModle")

const Authmiddleware = async(req,res, next) =>{
    var token = req.headers.authorization

    if(token){

        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1]
            
            try{
                const decode =  jwt.verify(token,secret)
                console.log(decode)
                const varifiableUser = await usermodel.findById(decode.id)
                if (varifiableUser) {
                    next()
                }
                else{
                    res.status(401).json({
                        message:"user in not varifiable"
                    })
                }
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