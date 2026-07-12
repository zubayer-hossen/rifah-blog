const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
const GalleryImage = require("../models/GalleryImage");

// @route GET /api/stats (public)
const getStats = async (req, res, next) => {
  try {
    const [blogs, photos, comments] = await Promise.all([
      Blog.find({ isPublished: true }).select("reactionCounts"),
      GalleryImage.countDocuments(),
      Comment.countDocuments({ isApproved: true }),
    ]);

    const totalReactions = blogs.reduce((sum, b) => {
      const c = b.reactionCounts || {};
      return sum + (c.love || 0) + (c.haha || 0) + (c.wow || 0) + (c.sad || 0);
    }, 0);

    res.json({
      totalBlogs: blogs.length,
      totalPhotos: photos,
      totalComments: comments,
      totalReactions,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getStats };
