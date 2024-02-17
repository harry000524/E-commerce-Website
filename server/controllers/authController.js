const User = require("../models/User");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = require("express").Router();

const createAdminToken = (admin) => {
    const payload = {
        id: admin._id.toString(),
        email: admin.email,
        role: 'admin'
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    return token;
};

const createToken = (user) => {
    const payload = {
        id: user._id.toString(),
        email: user.email,
        role: 'user'
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    return token;
};


////////////////////////////////USER AUTH
authController.post("/register", async (req, res) => {
    try {
        const isExisting = await User.findOne({ email: req.body.email });
        if (isExisting) {
            return res.status(500).json({ msg: "User already registered" });
        }
        if (
            req.body.username === "" ||
            req.body.email === "" ||
            req.body.password === ""
        ) {
            return res.status(500).json({ msg: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await User.create({
            ...req.body,
            password: hashedPassword,
        });
        await user.save();

        const { password, ...others } = user._doc;
        const token = createToken(others);
        return res.status(201).json({ others, token });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

authController.post("/login", async (req, res) => {
    const { email, password: userPass } = req.body;
    try {
        if (email === "" || userPass === "") {
            return res.status(500).json({ msg: "all fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(500).json({ msg: "invalid email or password" });
        }

        const comparePassword = await bcrypt.compare(userPass, user.password);
        if (!comparePassword) {
            return res.status(500).json({ msg: "invalid email or password" });
        }

        const { password, ...others } = user._doc;
        const token = createToken(user);

        return res.status(200).json({ others, token });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

////////////////////////////////ADMIN AUTH
authController.post("/admin/register", async (req, res) => {
    try {
        const isExisting = await Admin.findOne({ email: req.body.email });
        if (isExisting) {
            return res.status(500).json({ msg: "Admin already registered" });
        }
        if (
            req.body.username === "" ||
            req.body.email === "" ||
            req.body.password === ""
        ) {
            return res.status(500).json({ msg: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const admin = await Admin.create({
            ...req.body,
            password: hashedPassword,
        });
        await admin.save();

        const { password, ...others } = admin._doc;
        const token = createAdminToken(others);
        return res.status(201).json({ others, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

authController.post("/admin/login", async (req, res) => {
    const { email, password: adminPass } = req.body;
    try {
        if (email === "" || adminPass === "") {
            return res.status(500).json({ msg: "all fields are required" });
        }

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(500).json({ msg: "invalid email or password" });
        }

        const comparePassword = await bcrypt.compare(adminPass, admin.password);
        if (!comparePassword) {
            return res.status(500).json({ msg: "invalid email or password" });
        }

        const { password, ...others } = admin._doc;
        const token = createAdminToken(admin);

        return res.status(200).json({ others, token });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

module.exports = authController;
