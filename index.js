require('dotenv').config();

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const port = 3000;
const cors = require("cors")
const expressSession = require("express-session");
const flash = require("connect-flash")

const db = require("./config/mongoose-connection");

// Import routers
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const appRouter = require("./routes/app");


app.use(express.json());
app.use(cors({ origin: "*", }));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({ resave: false, saveUninitialized: false, secret: process.env.EXPRESS_SESSION_SECRET, }));
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
// app.set("view engine", "ejs");

app.use("/app", appRouter)
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});