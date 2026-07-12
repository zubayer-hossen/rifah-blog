import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { HiOutlineSearch, HiOutlineExclamationCircle } from "react-icons/hi";
import api from "../api/axios";
import BlogCard from "../components/BlogCard.jsx";
import Loader from "../components/Loader.jsx";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    setLoadError(false);
    const timeout = setTimeout(() => {
      api
        .get("/blogs", { params: { page, limit: 9, search: search || undefined } })
        .then((res) => {
          setBlogs(res.data.blogs);
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => {
          console.error("Failed to load blogs:", err);
          setLoadError(true);
        })
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(timeout);
  }, [page, search]);

  return (
    <>
      <Helmet>
        <title>Stories — Rifah Tasfiya</title>
      </Helmet>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <h1 className="section-title">All Stories</h1>
        <p className="mx-auto mt-3 max-w-lg text-center text-plum/60">
          Every post, every little thought — all in one place.
        </p>

        <div className="mx-auto mt-8 max-w-md">
          <div className="relative">
            <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-plum/40" />
            <input
              className="input-field pl-11"
              placeholder="Search stories..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        <div className="mt-12">
          {loading ? (
            <Loader label="Fetching stories..." />
          ) : loadError ? (
            <div className="mx-auto max-w-md rounded-3xl bg-red-50 p-6 text-center text-sm text-red-700">
              <HiOutlineExclamationCircle className="mx-auto mb-2 text-3xl" />
              <p className="font-semibold">Couldn't reach the server.</p>
              <p className="mt-1 text-red-600/80">
                Make sure the backend is running and <code>VITE_API_URL</code> in your frontend
                <code>.env</code> points to it. Check your browser console (F12) for the exact error.
              </p>
            </div>
          ) : blogs.length === 0 ? (
            <p className="py-16 text-center text-plum/50">No stories published yet. Check back soon 📖</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((b, i) => (
                <BlogCard key={b._id} blog={b} index={i} />
              ))}
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`h-10 w-10 rounded-full font-semibold transition-colors ${
                  p === page ? "bg-blush text-white" : "bg-white text-plum/60 hover:bg-blush-light/40"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default BlogList;
