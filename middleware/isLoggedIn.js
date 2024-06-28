const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1]; 
        // Extract token from Authorization header
        if (!token) {
            return res.status(401).json({ message: "You need to login first" });
        }

        const decoded = jwt.verify(token, process.env.JWT_ENV);
        const user = await userModel.findOne({ email: decoded.email }).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};