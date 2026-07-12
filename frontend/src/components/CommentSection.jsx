import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../api/axios";

const timeAgo = (date) => {
  const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
  const units = [
    ["year", 31536000], ["month", 2592000], ["day", 86400],
    ["hour", 3600], ["minute", 60],
  ];
  for (const [name, secs] of units) {
    const val = Math.floor(seconds / secs);
    if (val >= 1) return `${val} ${name}${val > 1 ? "s" : ""} ago`;
  }
  return "just now";
};

const CommentForm = ({ onSubmit, placeholder = "Write a comment...", small }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setLoading(true);
    await onSubmit({ name, text });
    setLoading(false);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-2 ${small ? "" : "sm:flex-row"}`}>
      {!small && (
        <input
          className="input-field sm:max-w-[180px]"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={60}
        />
      )}
      {small && (
        <input
          className="input-field"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={60}
        />
      )}
      <input
        className="input-field flex-1"
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={1000}
      />
      <button type="submit" disabled={loading} className="btn-primary shrink-0 disabled:opacity-60">
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
};

const CommentSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [replyTo, setReplyTo] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    api.get(`/blogs/${blogId}/comments`).then((res) => setComments(res.data)).finally(() => setLoading(false));
  };

  useEffect(load, [blogId]);

  const postComment = async ({ name, text }, parentComment = null) => {
    try {
      await api.post(`/blogs/${blogId}/comments`, { name, text, parentComment });
      toast.success("Comment posted!");
      setReplyTo(null);
      load();
    } catch {
      toast.error("Couldn't post your comment. Try again.");
    }
  };

  const topLevel = comments.filter((c) => !c.parentComment);
  const repliesOf = (id) => comments.filter((c) => c.parentComment === id);

  return (
    <div className="card p-6">
      <h3 className="mb-5 font-display text-2xl italic">
        Comments {comments.length > 0 && <span className="text-plum/50">({comments.length})</span>}
      </h3>

      <CommentForm onSubmit={(data) => postComment(data)} />

      <div className="mt-6 space-y-5">
        {loading && <p className="text-plum/50">Loading comments...</p>}
        {!loading && topLevel.length === 0 && (
          <p className="text-plum/50">No comments yet — be the first to share your thoughts 💬</p>
        )}
        {topLevel.map((c) => (
          <motion.div key={c._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b border-blush-light/40 pb-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lavender-light font-display italic text-lavender">
                {c.name[0]?.toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{c.name} <span className="ml-2 text-xs font-normal text-plum/40">{timeAgo(c.createdAt)}</span></p>
                <p className="text-plum/80">{c.text}</p>
                <button
                  className="mt-1 text-xs font-semibold text-lavender"
                  onClick={() => setReplyTo(replyTo === c._id ? null : c._id)}
                >
                  Reply
                </button>

                {replyTo === c._id && (
                  <div className="mt-2">
                    <CommentForm small placeholder="Write a reply..." onSubmit={(data) => postComment(data, c._id)} />
                  </div>
                )}

                {repliesOf(c._id).map((r) => (
                  <div key={r._id} className="mt-3 ml-4 border-l-2 border-blush-light pl-3">
                    <p className="font-semibold text-sm">{r.name} <span className="ml-2 text-xs font-normal text-plum/40">{timeAgo(r.createdAt)}</span></p>
                    <p className="text-sm text-plum/80">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
