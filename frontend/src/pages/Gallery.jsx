import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import api from "../api/axios";
import Loader from "../components/Loader.jsx";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    api.get("/gallery").then((res) => setImages(res.data)).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Gallery — Rifah Tasfiya</title>
      </Helmet>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <h1 className="section-title">Memory Gallery</h1>
        <p className="mx-auto mt-3 max-w-lg text-center text-plum/60">
          Little snapshots worth holding on to.
        </p>

        <div className="mt-12">
          {loading ? (
            <Loader label="Loading photos..." />
          ) : images.length === 0 ? (
            <p className="py-16 text-center text-plum/50">No photos yet — check back soon 📸</p>
          ) : (
            <div className="columns-2 gap-4 sm:columns-3 [column-fill:_balance]">
              {images.map((img, i) => (
                <motion.button
                  key={img._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 6) * 0.06 }}
                  onClick={() => setIndex(i)}
                  className="mb-4 block w-full overflow-hidden rounded-2xl shadow-soft"
                >
                  <img
                    src={img.image.url}
                    alt={img.caption || "Memory"}
                    loading="lazy"
                    className="w-full transition-transform duration-500 hover:scale-105"
                  />
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={images.map((img) => ({ src: img.image.url, description: img.caption }))}
      />
    </>
  );
};

export default Gallery;
