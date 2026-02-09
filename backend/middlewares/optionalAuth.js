require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

const optionalAuth = async (req, res, next) => {
    try {
        let token;

        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            req.user = null;
            return next();
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
        } catch (err) {
            req.user = null;
        }

        next();
    } catch (error) {
        console.error("Optional Auth Middleware Error:", error);
        req.user = null;
        next();
    }
};

module.exports = optionalAuth;
