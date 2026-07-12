const express = require("express");
const router = express.Router();
const { createMessage, getMessages, markAsRead, deleteMessage } = require("../controllers/messageController");
const { protect } = require("../middleware/auth");

router.post("/", createMessage);
router.get("/", protect, getMessages);
router.patch("/:id/read", protect, markAsRead);
router.delete("/:id", protect, deleteMessage);

module.exports = router;
