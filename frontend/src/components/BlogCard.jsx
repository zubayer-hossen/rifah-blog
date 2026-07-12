import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { HiOutlineEye, HiOutlineChatAlt2, HiOutlineShare } from "react-icons/hi";

const BlogCard = ({ blog, index = 0 }) => {
  const shareUrl = `${window.location.origin}/blog/${blog.slug}`;

  const quickShare = async (e) => {
    e.preventDefault(); // don't navigate into the blog when sharing from the card
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({ title: blog.title, url: shareUrl });
      } catch {
        /* user cancelled the native share sheet — nothing to do */
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied!");
    }
  };

  return (
  <motion.article
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
    className="card group relative overflow-hidden transition-transform duration-300 hover:-translate-y-1"
  >
    <button
      onClick={quickShare}
      aria-label="Share this post"
      className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-blush-dark shadow-soft opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
    >
      <HiOutlineShare />
    </button>
    <Link to={`/blog/${blog.slug}`}>
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={blog.coverImage?.url}
          alt={blog.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-5">
        {blog.tags?.length > 0 && (
          <span className="mb-2 inline-block rounded-full bg-lavender-light/50 px-3 py-1 text-xs font-semibold text-lavender">
            #{blog.tags[0]}
          </span>
        )}
        <h3 className="font-display text-xl italic text-plum line-clamp-2">{blog.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-plum/70">{blog.excerpt}</p>
        <div className="mt-4 flex items-center gap-4 text-xs text-plum/50">
          <span className="flex items-center gap-1">
            <HiOutlineEye /> {blog.views ?? 0}
          </span>
          <span className="flex items-center gap-1">
            <HiOutlineChatAlt2 /> {blog.commentCount ?? 0}
          </span>
          <span className="ml-auto">
            {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </span>
        </div>
      </div>
    </Link>
  </motion.article>
  );
};

export default BlogCard;
