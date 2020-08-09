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
router.put("/:id", auth, async (req,res) => {
const {name, email, phone, type} = req.body;
const id = req.params.id;
    //build a contact object.
    const contactFields = {};
    if (name){
        contactFields.name = name;
    }if (email){
        contactFields.email = email;
    }if (phone){
        contactFields.phone = phone;
    }if (type){
        contactFields.type = type;
    }

    try {
        let contact = await Contact.findById(id);//searches for specified contact.
        if (!contact){// if there is no contact by that id.
            return res.status(404).json({msg: "contact not found"});
        }
        //checks to see if the user owns the contact in question.
        if (contact.user.toString() !== req.user.id){
            return res.status(401).json({msg:"Not authorized"}); //if they dont match.
        }
        //perform the actuall update of the contact.
        contact.user = await Contact.findByIdAndUpdate(id,{$set:contactFields},{new:true});
        res.json(contact);
    }catch (e) {
        console.log(e.message);
        res.status(500).send("Server error");
    }


});


//@route  DELETE api/contacts:id
//@desc   Delete a contact
//@access Private
router.delete("/:id",auth,async (req,res) => {

});


module.exports = router;
