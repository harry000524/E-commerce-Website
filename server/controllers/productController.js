const verifyToken = require("../middlewares/auth");
const Product = require("../models/Product");
const fs = require("fs");
const productController = require("express").Router();

//get all products
productController.get("/", async (req, res) => {
    try {
        let products;
        products = await Product.find({});
        if (!products.length) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

//get a product
productController.get("/:id", async (req, res) => {
    try {
        let product;
        product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: "No product found" });
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

//create a product
productController.post("/", verifyToken, async (req, res) => {
    try {
        const product = await Product.create({ ...req.body });
        await product.save();

        return res.status(201).json(product);
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

//delete a product
productController.delete("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: "No product found" });
        }

        // Delete image file from public/images
        const imagePath = `public/images/${Product.img}`;
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        return res.status(200).json({ msg: "Product deleted successfully" });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

module.exports = productController;
