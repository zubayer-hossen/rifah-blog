const mongoose = require("mongoose");
const slugify = require("slugify");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    slug: { type: String, unique: true, index: true },
    excerpt: { type: String, required: true, maxlength: 300 },
    content: { type: String, required: true }, // HTML/markdown from rich text editor
    coverImage: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    tags: [{ type: String, trim: true, lowercase: true }],
    isPublished: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reactionCounts: {
      love: { type: Number, default: 0 },
      haha: { type: Number, default: 0 },
      wow: { type: Number, default: 0 },
      sad: { type: Number, default: 0 },
    },
    commentCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Auto-generate a unique, URL-friendly, shareable slug from the title.
// Unicode-aware so Bangla (and other non-Latin) titles produce a real
// slug instead of an empty string (which strict Latin-only slugify would do).
function makeBaseSlug(title) {
  let base = slugify(title, { lower: true, strict: false, trim: true })
    // keep letters (any language), numbers and hyphens only
    .replace(/[^\p{L}\p{N}-]+/gu, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  // fallback for titles with no usable characters at all (e.g. only emoji/symbols)
  if (!base) base = `post-${Date.now()}`;
  return base;
}

// Note: no `next` parameter here on purpose — mixing async/await with an
// explicit next() callback is a known Mongoose footgun (errors thrown after
// the first `await` can leave the save() hanging). A plain async function
// with zero parameters is auto-awaited by Mongoose instead.
blogSchema.pre("validate", async function () {
  if (!this.isModified("title")) return;
  const base = makeBaseSlug(this.title);
  let slug = base;
  let count = 1;
  const Blog = mongoose.model("Blog");
  while (await Blog.findOne({ slug, _id: { $ne: this._id } })) {
    slug = `${base}-${count++}`;
  }
  this.slug = slug;
});

blogSchema.index({ title: "text", excerpt: "text", tags: "text" });

module.exports = mongoose.model("Blog", blogSchema);
