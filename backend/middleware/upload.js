const multer = require("multer");
const { blogStorage, galleryStorage } = require("../config/cloudinary");

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only image files are allowed"), false);
};

const uploadBlogImage = multer({ storage: blogStorage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
const uploadGalleryImage = multer({ storage: galleryStorage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

module.exports = { uploadBlogImage, uploadGalleryImage };
