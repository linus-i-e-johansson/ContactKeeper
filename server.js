const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

const indexRouter = require('./routes/index');
const contactsRouter = require("./routes/contacts");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");

app.use('/', require('./routes/index'));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users",  require("./routes/users"))


app.listen(PORT, ()=>{
    console.log(`Server started on port: ${PORT}`);
});
