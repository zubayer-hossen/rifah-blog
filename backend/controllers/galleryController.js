const GalleryImage = require("../models/GalleryImage");
const { cloudinary } = require("../config/cloudinary");

// @route GET /api/gallery (public)
const getGallery = async (req, res, next) => {
  try {
    const images = await GalleryImage.find().sort({ order: 1, createdAt: -1 });
    res.json(images);
  } catch (err) {
    next(err);
  }
};

// @route POST /api/gallery (admin)
const addGalleryImage = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Image is required" });

    const image = await GalleryImage.create({
      caption: req.body.caption || "",
      image: { url: req.file.path, publicId: req.file.filename },
    });

    res.status(201).json(image);
  } catch (err) {
    next(err);
  }
};

// @route DELETE /api/gallery/:id (admin)
const deleteGalleryImage = async (req, res, next) => {
  try {
    const image = await GalleryImage.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    await cloudinary.uploader.destroy(image.image.publicId).catch(() => {});
    await image.deleteOne();

    res.json({ message: "Image deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getGallery, addGalleryImage, deleteGalleryImage };
