import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { HiOutlineArrowLeft, HiOutlineClock, HiOutlineEye } from "react-icons/hi";
import api from "../api/axios";
import Loader from "../components/Loader.jsx";
import ReactionBar from "../components/ReactionBar.jsx";
import ShareButtons from "../components/ShareButtons.jsx";
import CommentSection from "../components/CommentSection.jsx";
import BlogCard from "../components/BlogCard.jsx";
import ErrorBoundary from "../components/ErrorBoundary.jsx";

// Rough reading time estimate from the HTML content
const estimateReadingTime = (html = "") => {
  const words = html.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    window.scrollTo({ top: 0 });
    api
      .get(`/blogs/${slug}`)
      .then((res) => setBlog(res.data))
      .catch((err) => {
        console.error(`Failed to load blog "${slug}":`, err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  // fetch a few related posts once the blog (and its tags) are known
  useEffect(() => {
    if (!blog) return;
    const tag = blog.tags?.[0];
    api
      .get("/blogs", { params: { limit: 4, tag } })
      .then((res) => setRelated(res.data.blogs.filter((b) => b.slug !== blog.slug).slice(0, 3)))
      .catch(() => {});
  }, [blog]);

  if (loading) return <Loader label="Loading story..." />;

  if (error || !blog) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <p className="text-5xl">💔</p>
        <h1 className="mt-4 font-display text-3xl italic">Story not found</h1>
        <p className="mt-3 text-plum/60">This post may have been moved or removed.</p>
        <Link to="/blog" className="btn-primary mt-6 inline-flex">Back to stories</Link>
      </div>
    );
  }

  const shareUrl = `${window.location.origin}/blog/${blog.slug}`;
  const readingTime = estimateReadingTime(blog.content);

  return (
    <>
      <Helmet>
        <title>{blog.title} — Rifah Tasfiya</title>
        <meta name="description" content={blog.excerpt} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:image" content={blog.coverImage?.url} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="article" />
      </Helmet>

      <article className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/blog" className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-plum/60 hover:text-blush-dark">
            <HiOutlineArrowLeft /> All stories
          </Link>

          {blog.tags?.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {blog.tags.map((t) => (
                <span key={t} className="rounded-full bg-lavender-light/50 px-3 py-1 text-xs font-semibold text-lavender">
                  #{t}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-display text-3xl italic leading-tight text-plum sm:text-5xl">{blog.title}</h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-plum/50">
            <span>
              {new Date(blog.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span className="flex items-center gap-1"><HiOutlineClock /> {readingTime} min read</span>
            <span className="flex items-center gap-1"><HiOutlineEye /> {blog.views} views</span>
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl shadow-soft">
            <img src={blog.coverImage?.url} alt={blog.title} className="w-full object-cover" />
          </div>

          <div className="blog-content mt-8 text-lg" dangerouslySetInnerHTML={{ __html: blog.content }} />

          <div className="mt-10">
            <ErrorBoundary>
              <ShareButtons url={shareUrl} title={blog.title} />
            </ErrorBoundary>
          </div>

          <div className="mt-6">
            <ErrorBoundary>
              <ReactionBar blogId={blog._id} initialCounts={blog.reactionCounts} />
            </ErrorBoundary>
          </div>

          <div className="mt-10">
            <ErrorBoundary>
              <CommentSection blogId={blog._id} />
            </ErrorBoundary>
          </div>
        </motion.div>
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-16">
          <h2 className="section-title mb-8 text-2xl sm:text-3xl">More Stories You Might Like</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((b, i) => (
              <BlogCard key={b._id} blog={b} index={i} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default BlogDetail;
