const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
      index: true,
    },
    // a random id generated & stored in the visitor's browser (localStorage)
    // so the same visitor can't stack multiple reactions on one post
    visitorId: { type: String, required: true },
    type: {
      type: String,
      enum: ["love", "haha", "wow", "sad"],
      required: true,
    },
  },
  { timestamps: true }
);

reactionSchema.index({ blog: 1, visitorId: 1 }, { unique: true });

module.exports = mongoose.model("Reaction", reactionSchema);
