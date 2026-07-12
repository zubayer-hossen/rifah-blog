const express = require("express");
const router = express.Router();
const {
  getBlogs,
  getBlogBySlug,
  getAllBlogsAdmin,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const { getComments, addComment } = require("../controllers/commentController");
const { setReaction, getMyReaction } = require("../controllers/reactionController");
const { protect } = require("../middleware/auth");
const { uploadBlogImage } = require("../middleware/upload");

// Public
router.get("/", getBlogs);
router.get("/admin/all", protect, getAllBlogsAdmin); // placed before "/:slug" so it isn't swallowed
router.get("/:slug", getBlogBySlug);

// Admin
router.post("/", protect, uploadBlogImage.single("coverImage"), createBlog);
router.put("/:id", protect, uploadBlogImage.single("coverImage"), updateBlog);
router.delete("/:id", protect, deleteBlog);

// Nested: comments (by blog ObjectId)
router.get("/:blogId/comments", getComments);
router.post("/:blogId/comments", addComment);

// Nested: reactions
router.post("/:blogId/reactions", setReaction);
router.get("/:blogId/reactions/mine", getMyReaction);

module.exports = router;
