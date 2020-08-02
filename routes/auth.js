const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const JsonWebToken = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require('express-validator');
const router = express.Router();


//@route  GET api/auth
//@desc   get logged in user
//@access Private

router.get("/",(req,res)=>{
    res.send("Get logged in user");
});

//@route  POST api/auth
//@desc   Auth user & get token
//@access Public
router.post("/",
    [check("email", "Include a valid email address.").isEmail(),
            check("password", "password is required").exists()],
    async (req,res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array()})
        }
        const {email, password} = req.body;
        try {
            // a check to see if the user exists.
            let user = await User.findOne({email});
            //if there's no user send backa error message.
            if(!user){
                return res.status(400).json({msg:"Invalid Credentials"});
            }
            // checks the password given with the password in DB
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.status(400).json({msg:"Invalid Credentials"})
            }

            // creating the payload ie. the object we want to send in the token.
            const payload = {
                user:user.id
            }
            JsonWebToken.sign(payload,config.get("jwtSecret"),{expiresIn: 360000},(err, token)=>{
                if(err){
                    throw err;
                }
                res.json({
                    token
                });
            });
        }catch (e) {
            console.error(e.message);
            res.status(500).send("server error");
        }

});

module.exports = router;
