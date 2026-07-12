const Message = require("../models/Message");
const sendEmail = require("../utils/sendEmail");
const validator = require("validator");

// @route POST /api/messages (public - contact form)
const createMessage = async (req, res, next) => {
  try {
    const { name, email, subject, text } = req.body;
    if (!name?.trim() || !email?.trim() || !text?.trim()) {
      return res.status(400).json({ message: "Name, email and message are required" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please provide a valid email" });
    }

    const message = await Message.create({ name, email, subject, text });

    // Email delivery failure shouldn't fail the whole request —
    // the message is already safely stored in the database.
    sendEmail({ name, email, subject, text }).catch((err) =>
      console.error("Email send failed:", err.message)
    );

    res.status(201).json({ message: "Message sent successfully", data: message });
  } catch (err) {
    next(err);
  }
};

// @route GET /api/messages (admin)
const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    next(err);
  }
};

// @route PATCH /api/messages/:id/read (admin)
const markAsRead = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.json(message);
  } catch (err) {
    next(err);
  }
};

// @route DELETE /api/messages/:id (admin)
const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.json({ message: "Message deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { createMessage, getMessages, markAsRead, deleteMessage };
