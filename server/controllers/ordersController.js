const Order = require("../models/Orders");
const ordersController = require("express").Router();

// get all orders
ordersController.get("/", async (req, res) => {
    try {
        const orders = await Order.find({});
        if (!orders.length) {
            return res.status(404).json({ message: "Orders not found" });
        }

        return res.status(200).json({ orders: orders });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

// get an order by ID
ordersController.get("/:id", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

// create a new order
ordersController.post("/", async (req, res) => {
    try {
        const order = await Order.create({ ...req.body });
        await order.save();

        return res.status(201).json(order);
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

// update an existing order
ordersController.put("/:id", async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        await order.save();

        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

// delete an order
ordersController.delete("/:id", async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

module.exports = ordersController;
