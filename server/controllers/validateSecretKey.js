const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const validateSecretKeyController = require("express").Router();

validateSecretKeyController.get("/validateSecretKey", (req, res) => {
    const { secretKey } = req.query;
    const validSecretKey = process.env.SECRET_KEY; // Load secret key from environment variable

    if (secretKey === validSecretKey) {
        res.status(200).json({ message: "Valid secret key" });
    } else {
        res.status(401).json({ message: "Invalid secret key" });
    }
});

module.exports = validateSecretKeyController;
