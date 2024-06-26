const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const port = 3000 ;
require('dotenv').config();
// const ownersRouter = require("./routes/ownersRouter")
// const productsRouter = require("./routes/productsRouter")
// const 
const db= require("./config/mongoose-connection");


// Import routers
const ownersRouter = require("./routes/ownersRouter"); // Ensure this path is correct
const usersRouter = require("./routes/usersRouter"); // Ensure this path is correct
const productsRouter = require("./routes/productsRouter");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");


// app.get("/", (req,res)=>{
//     res.send("hey")
// });
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);

app.use("/products", productsRouter);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});