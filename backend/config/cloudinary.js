const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage used for blog cover images
const blogStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "rifah-website/blogs",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1600, crop: "limit", quality: "auto" }],
  },
});

// Storage used for gallery photos
const galleryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "rifah-website/gallery",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1600, crop: "limit", quality: "auto" }],
  },
});

module.exports = { cloudinary, blogStorage, galleryStorage };
