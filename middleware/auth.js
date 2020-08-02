const JsonWebToken = require("jsonwebtoken");
const config =require("config");

module.exports =(req, res, next) => {
//Get the token from the header.
    const token = req.header("x-auth-token") // key to the token in the header.

    //check if not token
    if(!token){
        return res.status(401).json({msg:"No token auth denied."});
    }
    try {
        // once verfied the payload will be placed into decoded
        const decoded = JsonWebToken.verify(token,config.get("jwtSecret"));
        req.user = decoded.user;// setting the user in the payload to req.user, this gives us access to it in the route
        next();
    }catch (e) {
        res.status(401).json({msg:"token is not valid."})
    }
    return
}