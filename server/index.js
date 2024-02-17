const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const authController = require("./controllers/authController");
const productController = require("./controllers/productController");
const uploadController = require("./controllers/uploadController");
const WebSocket = require("ws");
const ordersController = require("./controllers/ordersController");
const getUserController = require("./controllers/getUserController");
const validateSecretKeyController = require("./controllers/validateSecretKey");

const app = express();

//DB CONNECTIONS:
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("DB is successfully connected");
    })
    .catch((err) => {
        console.log("Error connecting to DB:", err);
    });

//MIDDLEWARE:
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("public/images"));

//ROUTES:
app.use("/auth", authController);
app.use("/product", productController);
app.use("/upload", uploadController);
app.use("/orders", ordersController);
app.use("/users", getUserController);
app.use("/admin", validateSecretKeyController);

// CREATE A WEBSOCKET SERVER
const wss = new WebSocket.Server({ port: process.env.WS_PORT });

wss.on("connection", function connection(ws) {
    console.log("Client connected");

    ws.on("message", function incoming(message) {
        console.log("received: %s", message);
    });

    ws.on("close", function close() {
        console.log("Client disconnected");
    });
});

app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`)
);
