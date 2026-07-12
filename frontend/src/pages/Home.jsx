import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  HiOutlineSparkles,
  HiOutlineArrowRight,
  HiOutlineHeart,
  HiOutlineSparkles as SparkleIcon,
  HiOutlineGift,
} from "react-icons/hi";
import api from "../api/axios";
import BlogCard from "../components/BlogCard.jsx";
import HeartbeatDivider from "../components/HeartbeatDivider.jsx";
import ProfilePhoto from "../components/ProfilePhoto.jsx";
import CountUp from "../components/CountUp.jsx";
import ErrorBoundary from "../components/ErrorBoundary.jsx";
import profile from "../data/profile.js";

const TIMELINE = [
  {
    title: "A page just for you",
    text: "Every corner of this site was put together with you in mind.",
    emoji: "💖",
  },
  {
    title: "Stories worth keeping",
    text: "Little thoughts and moments, written down so they never fade.",
    emoji: "🌸",
  },
  {
    title: "Always growing",
    text: "New posts, new photos — this place will keep filling up over time.",
    emoji: "🦄",
  },
];

// Interactive 3D Card Wrapper Component
const Card3D = ({ children, className = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03, z: 50 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`card border border-white/40 bg-white/60 shadow-xl backdrop-blur-md rounded-3xl ${className}`}
    >
      <div style={{ transform: "translateZ(30px)" }}>{children}</div>
    </motion.div>
  );
};

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [virtualGift, setVirtualGift] = useState(false);

  useEffect(() => {
    api
      .get("/blogs", { params: { limit: 3 } })
      .then((res) => setBlogs(res.data.blogs))
      .catch((err) => console.error("Failed to load latest blogs:", err));
    api
      .get("/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Failed to load stats:", err));
  }, []);

  return (
    <>
      <Helmet>
        <title>Rifah Tasfiya | Her Magical Space</title>
      </Helmet>

      {/* ---------- 3D Dynamic Animated Hero Section ---------- */}
      <section className="relative overflow-hidden px-5 pb-24 pt-20 sm:pb-32 sm:pt-36 bg-gradient-to-b from-cream via-blush-light/20 to-white">
        {/* Colorful 3D Floating Orbs */}
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-gradient-to-br from-pink-300/40 to-blush/30 blur-3xl animate-pulse duration-3000" />
        <div className="absolute -right-20 top-20 h-80 w-80 rounded-full bg-gradient-to-br from-purple-300/40 to-lavender/30 blur-3xl animate-bounce duration-5000" />
        <div className="absolute bottom-5 left-1/3 h-72 w-72 rounded-full bg-gradient-to-tr from-yellow-200/40 to-gold/20 blur-2xl" />

        <div className="relative mx-auto max-w-4xl text-center z-10">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blush to-pink-400 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-blush/30 sm:text-sm"
          >
            <HiOutlineSparkles className="animate-spin text-base" /> welcome to
            my cute little cosmos
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 15 }}
            className="font-display text-5xl font-black italic tracking-wide text-plum sm:text-8xl drop-shadow-md"
          >
            Rifah{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blush via-pink-400 to-lavender-dark drop-shadow-sm">
              Tasfiya
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl px-4 font-body text-lg font-medium leading-relaxed text-plum/80 sm:text-xl"
          >
            This entire aesthetic space exists for just{" "}
            <span className="underline decoration-blush decoration-2 font-bold text-plum">
              one premium human
            </span>
            . Stories, cozy photos, and everything in between — beautifully
            customized, ultra-soft, and crafted just for you. ✨
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
          >
            <Link
              to="/blog"
              className="btn-primary w-full shadow-lg shadow-blush/40 transform hover:-translate-y-1 transition flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blush to-pink-400 py-4 px-6 text-white font-bold"
            >
              Read My Stories <HiOutlineArrowRight />
            </Link>
            <Link
              to="/gallery"
              className="btn-secondary w-full border-2 border-lavender bg-white/80 hover:bg-lavender-light/30 transition transform hover:-translate-y-1 py-4 px-6 rounded-2xl text-lavender-dark font-bold"
            >
              See Memories ✨
            </Link>
          </motion.div>
        </div>

        {/* Floating 3D Love Letter Element */}
        <motion.div
          className="relative mx-auto mt-16 flex max-w-xs justify-center text-7xl filter drop-shadow-2xl cursor-pointer"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.2, rotate: 15 }}
        >
          💖💌🌸
        </motion.div>
      </section>

      <HeartbeatDivider label="✨ meet the queen ✨" />

      {/* ---------- About Her / 3D Profile Grid ---------- */}
      <section className="mx-auto max-w-5xl px-5 py-12">
        <Card3D className="p-8 sm:p-12 border border-pink-100 bg-gradient-to-br from-white/90 to-pink-50/50 shadow-2xl">
          <div className="grid gap-10 md:grid-cols-[280px,1fr] md:items-center md:gap-14">
            <div className="flex justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blush to-lavender rounded-full blur-xl opacity-40 animate-pulse" />
              <ProfilePhoto
                src={profile.photo}
                alt={profile.name}
                className="ring-4 ring-blush/30 shadow-2xl relative z-10 hover:scale-105 transition duration-500"
              />
            </div>

            <div className="text-center md:text-left">
              <h2 className="font-display text-4xl font-extrabold italic text-plum sm:text-5xl">
                {profile.name}
              </h2>
              <p className="mt-2 inline-block rounded-full bg-lavender-light/60 px-4 py-1 text-xs font-bold uppercase tracking-widest text-lavender-dark">
                {profile.tagline}
              </p>
              <p className="mt-5 text-base leading-relaxed text-plum/75 font-medium">
                {profile.bio}
              </p>
              <p className="mt-5 font-display text-xl italic text-transparent bg-clip-text bg-gradient-to-r from-blush to-lavender-dark font-semibold">
                “{profile.quote}”
              </p>

              {/* Colorful Facts Grid */}
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {profile.facts.map((f, i) => (
                  <motion.div
                    key={f.label}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="rounded-2xl border border-white bg-white/70 p-4 text-center shadow-md backdrop-blur-sm"
                  >
                    <div className="text-3xl filter drop-shadow-sm">
                      {f.emoji}
                    </div>
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-plum/40">
                      {f.label}
                    </p>
                    <p className="mt-1 text-xs font-bold text-plum/80">
                      {f.value}
                    </p>
                  </motion.div>
                ))}
              </div>

              <Link
                to="/about"
                className="btn-secondary mt-8 inline-flex items-center gap-2 border-2 border-blush hover:bg-blush/10 text-blush-dark font-bold px-6 py-3 rounded-xl transition"
              >
                Read Her Full Story <HiOutlineArrowRight />
              </Link>
            </div>
          </div>
        </Card3D>
      </section>

      <HeartbeatDivider label="📊 big analytics 📊" />

      {/* ---------- 3D Stats Counter Area ---------- */}
      {stats && (
        <ErrorBoundary fallback={null}>
          <section className="mx-auto max-w-5xl px-5 py-12">
            <h2 className="section-title text-center font-display text-3xl font-bold italic text-plum mb-10">
              Little Numbers, Infinite Moods 🫧
            </h2>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                {
                  label: "Stories written",
                  value: stats.totalBlogs,
                  emoji: "🔮",
                  color: "from-pink-100 to-red-50",
                },
                {
                  label: "Photos saved",
                  value: stats.totalPhotos,
                  emoji: "🎨",
                  color: "from-purple-100 to-indigo-50",
                },
                {
                  label: "Comments shared",
                  value: stats.totalComments,
                  emoji: "🍭",
                  color: "from-yellow-100 to-amber-50",
                },
                {
                  label: "Reactions given",
                  value: stats.totalReactions,
                  emoji: "🧁",
                  color: "from-emerald-100 to-teal-50",
                },
              ].map((s, idx) => (
                <Card3D
                  key={s.label}
                  className={`p-6 text-center bg-gradient-to-br ${s.color} border border-white/60`}
                >
                  <div
                    className="text-4xl filter drop-shadow-md animate-bounce"
                    style={{ animationDelay: `${idx * 0.2}s` }}
                  >
                    {s.emoji}
                  </div>
                  <p className="mt-3 font-display text-4xl font-black italic text-plum-dark">
                    <CountUp value={s.value} />
                  </p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-wider text-plum/60">
                    {s.label}
                  </p>
                </Card3D>
              ))}
            </div>
          </section>
        </ErrorBoundary>
      )}

      {/* ---------- New Dynamic Extra Feature: Virtual Pocket Message ---------- */}
      <section className="mx-auto max-w-3xl px-5 py-8">
        <motion.div
          className="bg-gradient-to-r from-purple-400 to-pink-400 p-1 rounded-3xl shadow-xl cursor-pointer"
          whileHover={{ scale: 1.02 }}
          onClick={() => setVirtualGift(!virtualGift)}
        >
          <div className="bg-white p-6 rounded-[22px] text-center">
            <div className="inline-flex p-3 bg-pink-100 text-pink-500 rounded-full mb-3 text-2xl">
              <HiOutlineGift className={virtualGift ? "animate-bounce" : ""} />
            </div>
            <h3 className="font-display font-bold text-xl text-plum">
              Tap to unlock today's secret surprise!
            </h3>
            {virtualGift && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 font-body text-sm font-semibold text-blush-dark bg-pink-50/50 p-3 rounded-xl border border-pink-100"
              >
                🎒 Quick note: "You're doing absolutely amazing today. Don't
                forget to drink water and smile! ⭐"
              </motion.p>
            )}
          </div>
        </motion.div>
      </section>

      <HeartbeatDivider label="🎈 inside the diary 🎈" />

      {/* ---------- Aesthetic Multi-Colored Feature Timeline ---------- */}
      <section className="mx-auto max-w-5xl px-5 py-12">
        <h2 className="section-title text-center font-display text-3xl font-bold italic text-plum mb-12">
          A Little Bit of Everything Carousel
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
              whileHover={{ y: -10, boxShadow: "0 20px 30px rgba(0,0,0,0.08)" }}
              className="card border border-white bg-white/70 p-8 text-center rounded-3xl backdrop-blur-sm relative overflow-hidden group shadow-lg"
            >
              <div className="absolute -right-6 -top-6 h-16 w-16 bg-gradient-to-br from-blush/20 to-transparent rounded-full group-hover:scale-150 transition-transform duration-500" />
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-pink-100 to-blush-light text-3xl shadow-inner">
                {item.emoji}
              </div>
              <h3 className="font-display text-2xl font-bold italic text-plum">
                {item.title}
              </h3>
              <p className="mt-3 text-sm font-medium leading-relaxed text-plum/70">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <HeartbeatDivider label="✨ latest stories ✨" />

      {/* ---------- Latest Blogs Grid ---------- */}
      {blogs.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((b, i) => (
              <motion.div
                whileHover={{ y: -8 }}
                key={b._id}
                className="transition-transform duration-300"
              >
                <BlogCard blog={b} index={i} />
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-lavender bg-white px-8 py-4 font-bold text-lavender-dark shadow-md hover:bg-lavender-light/20 transition transform hover:scale-105"
            >
              View All Stories 📖
            </Link>
          </div>
        </section>
      )}

      {/* ---------- Beautiful Glassmorphic Closing CTA ---------- */}
      <section className="mx-auto max-w-3xl px-5 py-20 text-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="border-2 border-white/60 bg-gradient-to-tr from-pink-100/60 via-white/80 to-purple-100/60 p-10 sm:p-14 rounded-3xl shadow-2xl backdrop-blur-lg relative overflow-hidden"
        >
          <div className="absolute -left-10 -bottom-10 h-32 w-32 bg-pink-300/30 rounded-full blur-xl" />
          <HiOutlineHeart className="mx-auto text-5xl text-blush animate-pulse filter drop-shadow" />
          <h2 className="mt-5 font-display text-3xl font-black italic text-plum sm:text-4xl">
            Got something sweet to say? 🧸
          </h2>
          <p className="mt-3 text-base font-medium text-plum/70">
            A telepathic letter here goes directly straight to my screen box.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blush to-pink-400 px-8 py-4 font-bold text-white shadow-lg shadow-blush/40 transform hover:-translate-y-1 hover:brightness-105 transition"
          >
            Say Hello <SparkleIcon />
          </Link>
        </motion.div>
      </section>
    </>
  );
};

export default Home;
