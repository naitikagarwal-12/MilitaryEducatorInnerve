import Contact from "../models/Contact.js";
import sendEmail from "../utils/sendEmail.js";

export const contactAdmin = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save to DB
    await Contact.create({ name, email, message });

    // Email to Admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: "New Contact Message - Military Educator",
      html: `
        <h3>New Message Received</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    // Confirmation to User
    await sendEmail({
      to: email,
      subject: "We received your message",
      html: `
        <p>Dear ${name},</p>
        <p>Thank you for contacting <b>Military Educator</b>.</p>
        <p>Our team will get back to you shortly.</p>
        <br />
        <p><b>Jai Hind 🇮🇳</b></p>
      `,
    });

    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send message" });
  }
};
