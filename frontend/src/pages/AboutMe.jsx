import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { HiOutlineArrowRight } from "react-icons/hi";
import ProfilePhoto from "../components/ProfilePhoto.jsx";
import HeartbeatDivider from "../components/HeartbeatDivider.jsx";
import profile from "../data/profile.js";

const GALLERY_PROMPT = [
  { emoji: "🌸", title: "Soft moments", text: "Little everyday things that somehow feel unforgettable." },
  { emoji: "🎧", title: "Favorite sounds", text: "Songs that instantly bring a certain memory back." },
  { emoji: "📖", title: "Stories in progress", text: "New chapters get added here as they happen." },
];

const AboutMe = () => (
  <>
    <Helmet>
      <title>About Her — Rifah Tasfiya</title>
      <meta name="description" content={profile.bio} />
    </Helmet>

    {/* ---------- Header ---------- */}
    <section className="relative overflow-hidden px-5 pb-10 pt-14 sm:pt-20">
      <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 animate-blob bg-lavender-light/40 blur-2xl" />
      <div className="pointer-events-none absolute -right-16 top-24 h-56 w-56 animate-blob bg-blush-light/40 blur-2xl [animation-delay:3s]" />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 inline-block rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold text-blush-dark shadow-soft sm:text-sm"
        >
          about her
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl italic text-plum sm:text-6xl"
        >
          The Story of <span className="text-blush">{profile.name.split(" ")[0]}</span>
        </motion.h1>
      </div>
    </section>

    {/* ---------- Main profile card ---------- */}
    <section className="mx-auto max-w-4xl px-5">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="card flex flex-col items-center gap-8 p-6 text-center sm:p-10 md:flex-row md:text-left"
      >
        <ProfilePhoto src={profile.photo} alt={profile.name} size="w-48 h-48 sm:w-60 sm:h-60" />
        <div>
          <h2 className="font-display text-3xl italic text-plum">{profile.name}</h2>
          <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-blush-dark">{profile.tagline}</p>
          <p className="mt-4 text-plum/70">{profile.bio}</p>
          <p className="mt-4 font-display text-lg italic text-lavender">{profile.quote}</p>
        </div>
      </motion.div>
    </section>

    <HeartbeatDivider label="a few favorites" />

    {/* ---------- Facts grid ---------- */}
    <section className="mx-auto max-w-4xl px-5 py-6">
      <div className="grid gap-5 sm:grid-cols-2">
        {profile.facts.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="card flex items-center gap-4 p-5"
          >
            <span className="text-3xl">{f.emoji}</span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-plum/50">{f.label}</p>
              <p className="text-plum/80">{f.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    <HeartbeatDivider label="what's here" />

    {/* ---------- What visitors can explore ---------- */}
    <section className="mx-auto max-w-5xl px-5 py-6 pb-16">
      <h2 className="section-title">Explore More of Her World</h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {GALLERY_PROMPT.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card p-6 text-center"
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blush-light/50 text-xl">
              {item.emoji}
            </div>
            <h3 className="font-display text-lg italic">{item.title}</h3>
            <p className="mt-2 text-sm text-plum/70">{item.text}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link to="/blog" className="btn-primary">
          Read her stories <HiOutlineArrowRight />
        </Link>
        <Link to="/gallery" className="btn-secondary">
          Browse the gallery
        </Link>
      </div>
    </section>
  </>
);

export default AboutMe;
