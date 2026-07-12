// Run once with: npm run fix:slugs
// Repairs any blog whose slug ended up empty/missing (e.g. from titles
// written entirely in Bangla before the slug generator was Unicode-aware).
require("dotenv").config();
const connectDB = require("../config/db");
const Blog = require("../models/Blog");

(async () => {
  await connectDB();

  const broken = await Blog.find({ $or: [{ slug: null }, { slug: "" }, { slug: { $exists: false } }] });

  if (broken.length === 0) {
    console.log("No blogs with a broken slug were found — nothing to fix.");
    process.exit(0);
  }

  for (const blog of broken) {
    blog.markModified("title"); // force the slug pre-validate hook to regenerate it
    await blog.save();
    console.log(`Fixed "${blog.title}" -> slug: "${blog.slug}"`);
  }

  console.log(`Done. Fixed ${broken.length} blog(s).`);
  process.exit(0);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
