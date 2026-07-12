const mongoose = require("mongoose");

const galleryImageSchema = new mongoose.Schema(
  {
    caption: { type: String, trim: true, maxlength: 200, default: "" },
    image: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GalleryImage", galleryImageSchema);
