const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
const Reaction = require("../models/Reaction");
const { cloudinary } = require("../config/cloudinary");

// @route GET /api/blogs  (public - published only, supports ?page=&limit=&search=&tag=)
const getBlogs = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 6, 24);
    const filter = { isPublished: true };

    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }
    if (req.query.tag) {
      filter.tags = req.query.tag.toLowerCase();
    }

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select("-content"),
      Blog.countDocuments(filter),
    ]);

    res.json({
      blogs,
      page,
      totalPages: Math.ceil(total / limit),
      totalBlogs: total,
    });
  } catch (err) {
    next(err);
  }
};

// @route GET /api/blogs/:slug (public - shareable URL, increments views)
const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug, isPublished: true },
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

// @route GET /api/blogs/admin/all (admin - all blogs incl. unpublished)
const getAllBlogsAdmin = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).select("-content");
    res.json(blogs);
  } catch (err) {
    next(err);
  }
};

// @route POST /api/blogs (admin)
const createBlog = async (req, res, next) => {
  try {
    const { title, excerpt, content, tags, isPublished } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Cover image is required" });
    }

    const blog = await Blog.create({
      title,
      excerpt,
      content,
      tags: tags ? tags.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean) : [],
      isPublished: isPublished === "false" ? false : true,
      coverImage: { url: req.file.path, publicId: req.file.filename },
      author: req.user._id,
    });

    res.status(201).json(blog);
  } catch (err) {
    next(err);
  }
};

// @route PUT /api/blogs/:id (admin)
const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const { title, excerpt, content, tags, isPublished } = req.body;
    if (title) blog.title = title;
    if (excerpt) blog.excerpt = excerpt;
    if (content) blog.content = content;
    if (tags !== undefined) {
      blog.tags = tags.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean);
    }
    if (isPublished !== undefined) blog.isPublished = isPublished === "true" || isPublished === true;

    if (req.file) {
      // remove old cover from Cloudinary before saving the new one
      if (blog.coverImage?.publicId) {
        await cloudinary.uploader.destroy(blog.coverImage.publicId).catch(() => {});
      }
      blog.coverImage = { url: req.file.path, publicId: req.file.filename };
    }

    await blog.save();
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

// @route DELETE /api/blogs/:id (admin)
const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.coverImage?.publicId) {
      await cloudinary.uploader.destroy(blog.coverImage.publicId).catch(() => {});
    }
    await Promise.all([
      Comment.deleteMany({ blog: blog._id }),
      Reaction.deleteMany({ blog: blog._id }),
      blog.deleteOne(),
    ]);

    res.json({ message: "Blog deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getBlogs,
  getBlogBySlug,
  getAllBlogsAdmin,
  createBlog,
  updateBlog,
  deleteBlog,
};
