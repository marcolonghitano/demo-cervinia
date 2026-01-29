import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cardRoutes from "./routes/cards";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4010;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/cards", cardRoutes);

// Health Check
app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Snowit Rescue Backend running on port ${PORT}`);
});
