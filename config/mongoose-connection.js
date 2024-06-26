const mongoose = require("mongoose")
require('dotenv').config();
const dbgr = require("debug")("development:mongoose")
// const config = require("config")

const port = 3000
const username = process.env.MONGO_USERNAME;
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const dbname = "shoppingApp"

mongoose.connect(
    "mongodb+srv://" +
    username +
    ":" +
    password +
    `@cluster0.3j0ywmp.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster0`
    // `${config.get(MONGODB_URI)}`
)
.then(() => {
    dbgr("MongoDB connected");  

    // console.log("MongoDB connected");  
})
.catch((error) => dbgr("MongoDB connection error", error));

// mongoose.connect(
//     "mongodb+srv://" +
//     username +
//     ":" +
//     password +
//     "@cluster0.3j0ywmp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/scatch"
// )
//     .then(() => {
//         console.log("MongoDB connected");    
//     })
//     .catch((error) => console.error("MongoDB connection error:", error));

    module.exports = mongoose.connection;