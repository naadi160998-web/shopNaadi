require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = function(req,res,next){
    // get token from header
    console.log("token:",req.headers.authorization);
    
    const token = req.headers.authorization;
    const tk = token.split(" ")[1]
    console.log("get token:",tk);
    
    if(!tk){
        res.status(403).json({
            msg:"Access denied, no token provided"
        })
    }

    try {
        const secretCode = process.env.SCERET_CODE;
        const decode = jwt.verify(tk,secretCode)
        req.user = decode; //Attach user info to request
        next(); //Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({
            msg:"Invalid Token"
        })
    }
}