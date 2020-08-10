const express = require('express');
const connectDB = require("./config/db");
const app = express(); // creates an express application.

// connect to database
connectDB();
//init middleware: to accept json data
app.use(express.json({extended:false}));// this lets us accept body data (req.body)

app.use('/', require('./routes/index'));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users",  require("./routes/users"))


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server started on port: ${PORT}`);
});
