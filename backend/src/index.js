import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import authAdminRouter from "./modules/auth/auth.route.js";
import sectionRoutes from "./modules/task/task.route.js"

import dotenv from "dotenv";

import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

connectDb();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.get('/', (req, res) => {
    res.send({
        activeStatus: true,
        error: false,
    })
})
// Routes
app.use("/api/auth", authAdminRouter);
app.use("/api/sections", sectionRoutes);

app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

// Start server
const PORT = process.env.PORT || 3005;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
