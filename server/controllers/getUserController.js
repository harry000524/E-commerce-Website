const User = require("../models/User");

const getUserController = require("express").Router();

// Get all users
getUserController.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a user
getUserController.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(deletedUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = getUserController;