const express = require("express");
const router = express.Router();

//@route  GET api/contacts
//@desc   Get all users contacts
//@access Private
router.get("/",(req,res)=>{
    res.send("get all contacts");
});

//@route  POST api/users
//@desc   add new contact
//@access Private
router.post("/",(req,res)=>{
    res.send("Add contact");
});

//@route  PUT api/users:id
//@desc   Update a contact
//@access Private
router.put("/:id",(req,res)=>{
    res.send("Update contact");
});


//@route  DELETE api/users:id
//@desc   Delete a contact
//@access Private
router.delete("/:id",(req,res)=>{
    res.send("remove contact");
});


module.exports = router;
