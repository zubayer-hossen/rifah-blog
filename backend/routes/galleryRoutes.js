const express = require("express");
const router = express.Router();
const { getGallery, addGalleryImage, deleteGalleryImage } = require("../controllers/galleryController");
const { protect } = require("../middleware/auth");
const { uploadGalleryImage } = require("../middleware/upload");

router.get("/", getGallery);
router.post("/", protect, uploadGalleryImage.single("image"), addGalleryImage);
router.delete("/:id", protect, deleteGalleryImage);

module.exports = router;
