const express = require('express');
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const app = express();

// connect to database
connectDB();

//init middleware
app.use(express.json({extended:false}));// this lets us accept body data (req.body)

app.use('/', require('./routes/index'));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users",  require("./routes/users"))


app.listen(PORT, ()=>{
    console.log(`Server started on port: ${PORT}`);
});
