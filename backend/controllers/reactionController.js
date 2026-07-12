const Reaction = require("../models/Reaction");
const Blog = require("../models/Blog");

const REACTION_TYPES = ["love", "haha", "wow", "sad"];

// @route POST /api/blogs/:blogId/reactions  body: { visitorId, type }
// Adds, switches, or removes (toggle-off) a visitor's reaction and keeps
// the blog's cached reactionCounts in sync.
const setReaction = async (req, res, next) => {
  try {
    const { visitorId, type } = req.body;
    if (!visitorId || !REACTION_TYPES.includes(type)) {
      return res.status(400).json({ message: "Valid visitorId and type are required" });
    }

    const blog = await Blog.findById(req.params.blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const existing = await Reaction.findOne({ blog: blog._id, visitorId });

    if (existing && existing.type === type) {
      // same reaction tapped again -> remove it
      await existing.deleteOne();
      blog.reactionCounts[type] = Math.max(0, blog.reactionCounts[type] - 1);
    } else if (existing) {
      // switching reaction type
      blog.reactionCounts[existing.type] = Math.max(0, blog.reactionCounts[existing.type] - 1);
      existing.type = type;
      await existing.save();
      blog.reactionCounts[type] += 1;
    } else {
      await Reaction.create({ blog: blog._id, visitorId, type });
      blog.reactionCounts[type] += 1;
    }

    await blog.save();
    res.json({ reactionCounts: blog.reactionCounts });
  } catch (err) {
    next(err);
  }
};

// @route GET /api/blogs/:blogId/reactions/mine?visitorId=xxx
const getMyReaction = async (req, res, next) => {
  try {
    const { visitorId } = req.query;
    const reaction = await Reaction.findOne({ blog: req.params.blogId, visitorId });
    res.json({ type: reaction?.type || null });
  } catch (err) {
    next(err);
  }
};

module.exports = { setReaction, getMyReaction };
