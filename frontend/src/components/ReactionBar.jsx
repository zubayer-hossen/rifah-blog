import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import { getVisitorId } from "../api/visitor";

const REACTIONS = [
  { type: "love", emoji: "😍", label: "Love" },
  { type: "haha", emoji: "😂", label: "Haha" },
  { type: "wow", emoji: "😮", label: "Wow" },
  { type: "sad", emoji: "🥺", label: "Aww" },
];

const ReactionBar = ({ blogId, initialCounts }) => {
  const [counts, setCounts] = useState(initialCounts);
  const [myReaction, setMyReaction] = useState(null);
  const visitorId = getVisitorId();

  useEffect(() => {
    api
      .get(`/blogs/${blogId}/reactions/mine`, { params: { visitorId } })
      .then((res) => setMyReaction(res.data.type))
      .catch(() => {});
  }, [blogId]);

  const react = async (type) => {
    // optimistic update for a snappy feel
    const prev = { counts, myReaction };
    const next = { ...counts };
    if (myReaction === type) {
      next[type] = Math.max(0, next[type] - 1);
      setMyReaction(null);
    } else {
      if (myReaction) next[myReaction] = Math.max(0, next[myReaction] - 1);
      next[type] = (next[type] || 0) + 1;
      setMyReaction(type);
    }
    setCounts(next);

    try {
      const { data } = await api.post(`/blogs/${blogId}/reactions`, { visitorId, type });
      setCounts(data.reactionCounts);
    } catch {
      setCounts(prev.counts);
      setMyReaction(prev.myReaction);
    }
  };

  const total = Object.values(counts || {}).reduce((a, b) => a + b, 0);

  return (
    <div className="card flex flex-wrap items-center gap-3 p-4">
      {REACTIONS.map((r) => (
        <motion.button
          key={r.type}
          whileTap={{ scale: 1.3 }}
          onClick={() => react(r.type)}
          className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
            myReaction === r.type ? "bg-blush-light/60 text-blush-dark" : "bg-cream text-plum/70 hover:bg-blush-light/30"
          }`}
          aria-pressed={myReaction === r.type}
        >
          <span className="text-lg">{r.emoji}</span>
          {r.label}
          <span className="text-xs opacity-70">{counts?.[r.type] || 0}</span>
        </motion.button>
      ))}
      <span className="ml-auto text-sm text-plum/50">{total} reaction{total !== 1 ? "s" : ""}</span>
    </div>
  );
};

export default ReactionBar;
