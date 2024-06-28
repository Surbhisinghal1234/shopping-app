const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const userModel = require("../models/user-model");


module.exports.registerUser = async function (req, res) {
    try {
        let { email, password, fullName } = req.body;

        let existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(401).send("You already have an account, please login.");
        }
        //  hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create user
        let newUser = await userModel.create({
            email,
            password: hashedPassword,
            fullName
        });

        // Generate token
        let token = generateToken(newUser);
        res.cookie("token", token);
        console.log(token);

        res.status(201).send(newUser);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "error ",
            error: err.message
        });
    }
};

module.exports.loginUser = async function (req, res) {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).send("Email or Password incorrect");
        }

        bcrypt.compare(password, user.password, function (err, result) {
            if (err || !result) {
                return res.status(401).send("Email or Password incorrect");
            }

            const token = generateToken(user);
            res.cookie("token", token);
            res.json({ token }); // Send token back to frontend
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};