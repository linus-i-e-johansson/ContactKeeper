const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const { check,body, validationResult } = require('express-validator');

//@route  POST api/users
//@desc   Register a user
//@access Public

router.post("/",
    [check("name", "Name is required").not().isEmpty(),
      check("email","Please include a valid email").isEmail(),
      check("password","Please enter a password with 6 or more characters").isLength({min: 6})],
      async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
    }
   const {name,email,password} = req.body;
    try {
      let user = await User.findOne({email});

      if(user){
       res.status(400).json({msg:"User already exsist"});
      }
      user = new User({
        name,
        email,
        password,
      });
      //starting encryption of password..
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password,salt);
      await user.save();

      res.send("User saved");
    }catch (e) {
      console.error(e.message);
      res.status(500).send("Server error");
    }
});

module.exports = router;
