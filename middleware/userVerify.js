const jwt = require('jsonwebtoken')
// const user = require('../models/user')

const UserVerify = async(req,res,next)=>{
    // console.log("User Object:", req.user)
    
    const token = req.header("auth-token")
    if(!token) return res.status(401).json({message:"Authenticate using valid token"})
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        // console.log("Decoded Token:", decode);
        req.userId = decode.userId;
        // console.log("User Object:", req.user);
        next()
        
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using valid token" })
    }


}

module.exports = UserVerify