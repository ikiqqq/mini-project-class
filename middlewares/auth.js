const jwt = require('jsonwebtoken')

module.exports = async (req,res,next) => {
    const bearerToken = req.header("Authorization")
    try{
        const token = bearerToken.replace("Bearer ", "")
        const decoded = jwt.verify(token, "passwordAdmin")
        req.admin = decoded;
        next()
    }catch(error){
        return res.status(401).json({
            status : "Failed",
            message : "Unauthorized, Invalid Token"
        })
    }
}