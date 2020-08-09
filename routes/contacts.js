const express = require("express");
const Contact = require("../models/Contacts");
const User = require("../models/User");
const { check, validationResult } = require('express-validator');
const auth = require("../middleware/auth");
const router = express.Router();

//@route  GET api/contacts
//@desc   Get all users contacts
//@access Private
router.get("/",auth, async (req,res)=>{
    try{
        //find all contacts related to a user, the id is given to the route by the middleware.
        const contact = await Contact.find({user: req.user.id}).sort({date: -1});// sorted by date, most recent one first.
        res.json(contact);
    }catch (e) {
        console.log(e.message);
        res.status(500).send("Server error...");
    }
});

//@route  POST api/contacts
//@desc   add new contact
//@access Private
router.post("/",[auth,
    [check("name","Name is required").not().isEmpty()]
],
   async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {name, email, phone, type} = req.body;
    try{
        const newContact = new Contact({name, email, phone, type, user:req.user.id});
        const contact = await newContact.save();
        res.json(contact);
    }catch (e) {
        console.log(e.message);
        res.status(500).send("Server error");
    }
});

//@route  PUT api/contacts:id
//@desc   Update a contact
//@access Private
router.put("/:id",(req,res)=>{
    res.send("Update contact");
});


//@route  DELETE api/contacts:id
//@desc   Delete a contact
//@access Private
router.delete("/:id",(req,res)=>{
    res.send("remove contact");
});


module.exports = router;
