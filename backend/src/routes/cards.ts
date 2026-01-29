import { Router, Request, Response } from "express";
import { checkCardStatus } from "../services/cardService";

const router = Router();

// GET /api/cards/:cardNumber
router.get("/:cardNumber", async (req: Request, res: Response) => {
    try {
        const { cardNumber } = req.params;

        // Simple verification for length, basic security
        if (!cardNumber || (cardNumber.length !== 8 && cardNumber.length !== 23)) {
            return res.status(400).json({ error: "Invalid card number format (must be 8 or 23 digits)" });
        }

        const result = await checkCardStatus(cardNumber);
        return res.json(result);
    } catch (error) {
        console.error("Error fetching card:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// POST /api/cards/scan (Mock QR Scan)
router.post("/scan", async (req: Request, res: Response) => {
    try {
        const { qrData } = req.body;

        if (!qrData) {
            return res.status(400).json({ error: "No QR data provided" });
        }

        // In a real app, parse the QR payload. Here we assume qrData IS the card number for simplicity,
        // or simulate parsing.
        const cardNumber = qrData.trim();

        if (cardNumber.length !== 8 && cardNumber.length !== 23) {
            return res.status(400).json({ error: "Invalid QR data" });
        }

        const result = await checkCardStatus(cardNumber);
        return res.json(result);
    } catch (error) {
        console.error("Error processing scan:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
