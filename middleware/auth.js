const JsonWebToken = require("jsonwebtoken");
const config = require("config");

// this piece of middleware validates the token
// and allows us to send the token within the header
//when we want to access a protected route.
module.exports = (req, res, next) => {
    // Get the token from the header.
    const token = req.header("x-auth-token") //checks if there is a token in the header, key to the token in the header.
    // check if not token
    if(!token){
        return res.status(401).json({msg:"No token, authorization denied..."});
    }
    try {
        // once verfied the payload will be placed into decoded
        const decoded = JsonWebToken.verify(token, config.get("jwtSecret"));
        console.log(decoded)
        req.user = decoded.user;// setting the user in the payload to req.user, this gives us access to it in the route
        next();// calls next to move on...
    }catch (e) {
        res.status(401).json({msg:"token is not valid..."})
    }
}