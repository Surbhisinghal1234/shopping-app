const mongoose = require("mongoose")
require('dotenv').config();

const port = 3000
const username = process.env.MONGO_USERNAME;
const password = encodeURIComponent(process.env.MONGO_PASSWORD);

mongoose.connect(
    "mongodb+srv://" +
    username +
    ":" +
    password +
    "@cluster0.3j0ywmp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/scatch"

)
    .then(() => {
        console.log("MongoDB connected");
       
    })
    .catch((error) => console.error("MongoDB connection error:", error));


    module.exports = mongoose.connection;