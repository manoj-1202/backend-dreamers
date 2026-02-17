import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/send-contact-email", async (req, res) => {
  const { name, email, phone, location, duration, message, services, type } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  // ✅ Brevo SMTP Configuration
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
auth: {
  user: "ttsapplications2025@gmail.com",
  pass: "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",
},
  });

  const mailOptions = {
    from: `"${name}" <ttsapplications2025@gmail.com>`,
    replyTo: email,
    to: "dreamersproductionhouse@gmail.com",
    subject: `New Project Inquiry from ${name}`,
    html: `
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
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

