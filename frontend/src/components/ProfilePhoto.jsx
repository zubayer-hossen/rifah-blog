import React from "react";
import { motion } from "framer-motion";

/**
 * Round profile photo with a slowly rotating conic-gradient "ribbon" border
 * and small floating heart accents — the site's signature portrait treatment.
 */
const ProfilePhoto = ({ src, alt, size = "w-56 h-56 sm:w-72 sm:h-72" }) => (
  <div className={`relative mx-auto ${size}`}>
    {/* rotating gradient ring */}
    <motion.div
      className="absolute inset-0 rounded-full p-[6px]"
      style={{
        background:
          "conic-gradient(from 0deg, #FF6F91, #FFC15E, #A78BFA, #8FE3CF, #FF6F91)",
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
    >
      <div className="h-full w-full rounded-full bg-cream" />
    </motion.div>

    {/* photo */}
    <div className="absolute inset-[8px] overflow-hidden rounded-full shadow-soft ring-4 ring-white">
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>

    {/* floating heart accents */}
    <motion.span
      className="absolute -right-2 -top-2 text-3xl sm:text-4xl"
      animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      💗
    </motion.span>
    <motion.span
      className="absolute -bottom-1 -left-3 text-2xl sm:text-3xl"
      animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    >
      ✨
    </motion.span>
  </div>
);

export default ProfilePhoto;
