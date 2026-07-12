const Comment = require("../models/Comment");
const Blog = require("../models/Blog");

// @route GET /api/blogs/:blogId/comments (public)
const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({
      blog: req.params.blogId,
      isApproved: true,
    }).sort({ createdAt: 1 });
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

// @route POST /api/blogs/:blogId/comments (public)
const addComment = async (req, res, next) => {
  try {
    const { name, text, parentComment } = req.body;
    if (!name?.trim() || !text?.trim()) {
      return res.status(400).json({ message: "Name and comment text are required" });
    }

    const blog = await Blog.findById(req.params.blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const comment = await Comment.create({
      blog: blog._id,
      name: name.trim(),
      text: text.trim(),
      parentComment: parentComment || null,
    });

    blog.commentCount += 1;
    await blog.save();

    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

// @route DELETE /api/comments/:id (admin)
const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    await comment.deleteOne();
    await Blog.findByIdAndUpdate(comment.blog, { $inc: { commentCount: -1 } });

    res.json({ message: "Comment deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getComments, addComment, deleteComment };
