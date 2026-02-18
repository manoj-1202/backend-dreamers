"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/send-contact-email", async (req, res) => {
    console.log("🔥 Request received");
    const { name, email, phone, location, duration, message, services, type } = req.body;
    try {
        const response = await axios_1.default.post("https://api.brevo.com/v3/smtp/email", {
            sender: {
                name: "Dreamers Production House",
                email: "quickservee1202@gmail.com",
            },
            to: [
                {
                    email: "dreamersproductionhouse@gmail.com",
                },
            ],
            subject: `New Project Inquiry from ${name}`,
            htmlContent: `
          <h3>Project Inquiry</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Duration:</strong> ${duration || "Not provided"}</p>
          <p><strong>Project Type:</strong> ${type}</p>
          <p><strong>Selected Services:</strong> ${services?.join(", ") || "None"}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
        }, {
            headers: {
                "api-key": "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",
                "Content-Type": "application/json",
            },
        });
        console.log("✅ Email sent successfully via API");
        res.status(200).json({ message: "Email sent successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to send email" });
    }
});
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
