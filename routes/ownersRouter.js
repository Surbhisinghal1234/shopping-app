const express = require("express")
const router = express.Router();
const ownerModel = require("../models/owners-model")

router.get("/", (req, res) => {

    res.send("helloooo")
})

// if(process.env.NODE_ENV === "development"){
router.post("/create", async (req, res) => {

    // res.send("create")
    let owners = await ownerModel.find();
    if (owners.length > 0) {
        return res.send(503).send("You don't have permission to create a new owner")

    }
    await ownerModel.create({
        fullName,
        email,
        password,
        picture,
        gstin,
    })
    res.send("we can create a new owner")
})
// }

module.exports = router