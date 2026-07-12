import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineHeart, HiOutlineArrowUp } from "react-icons/hi";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

const Footer = () => (
  <footer className="relative mt-10 overflow-hidden border-t border-blush-light/50 bg-gradient-to-b from-cream to-blush-light/20 pt-14">
    <div className="pointer-events-none absolute -left-16 -top-10 h-40 w-40 animate-blob bg-lavender-light/40 blur-2xl" />
    <div className="pointer-events-none absolute -right-10 bottom-0 h-32 w-32 animate-blob bg-blush-light/40 blur-2xl [animation-delay:2s]" />

    <div className="relative mx-auto max-w-5xl px-5 pb-8">
      <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
        <div className="max-w-xs">
          <Link to="/" className="font-display text-2xl italic text-blush-dark">
            Rifah <span className="text-lavender">✿</span>
          </Link>
          <p className="mt-2 text-sm text-plum/60">
            A little corner of the internet, filled with stories, photos, and soft little things — made just for her.
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-plum/50">Explore</p>
          <ul className="flex flex-col gap-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-plum/70 transition-colors hover:text-blush-dark">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-plum/50">Say hello</p>
          <Link to="/contact" className="btn-primary text-sm">
            Send a message
          </Link>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-blush-light/40 pt-6 sm:flex-row">
        <p className="flex items-center gap-1 text-xs text-plum/50 sm:text-sm">
          Made with
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="text-blush"
          >
            <HiOutlineHeart />
          </motion.span>
          for Rifah Tasfiya · {new Date().getFullYear()}
        </p>

        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blush-dark shadow-soft transition-transform hover:-translate-y-1"
        >
          <HiOutlineArrowUp />
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;
