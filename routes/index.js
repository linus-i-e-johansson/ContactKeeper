const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.json({msg:"Welcome to the ContactKeeper API"});
});

module.exports = router;
