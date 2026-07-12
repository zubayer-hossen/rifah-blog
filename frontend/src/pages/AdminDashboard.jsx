import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { HiOutlineDocumentText, HiOutlinePhotograph, HiOutlineMail, HiOutlineLogout } from "react-icons/hi";
import { useAuth } from "../context/AuthContext.jsx";
import BlogManager from "./admin/BlogManager.jsx";
import GalleryManager from "./admin/GalleryManager.jsx";
import MessagesManager from "./admin/MessagesManager.jsx";

const TABS = [
  { key: "blogs", label: "Blogs", icon: HiOutlineDocumentText },
  { key: "gallery", label: "Gallery", icon: HiOutlinePhotograph },
  { key: "messages", label: "Messages", icon: HiOutlineMail },
];

const AdminDashboard = () => {
  const [tab, setTab] = useState("blogs");
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <>
      <Helmet><title>Admin Dashboard — Rifah Tasfiya</title></Helmet>
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl italic">Admin Dashboard</h1>
            {admin?.name && <p className="text-sm text-plum/50">Signed in as {admin.name}</p>}
          </div>
          <button onClick={handleLogout} className="btn-secondary text-sm">
            <HiOutlineLogout /> Log out
          </button>
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          <nav className="flex gap-2 overflow-x-auto md:w-52 md:flex-col">
            {TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-3 text-left font-semibold transition-colors ${
                  tab === key ? "bg-blush text-white shadow-soft" : "bg-white text-plum/70 hover:bg-blush-light/30"
                }`}
              >
                <Icon /> {label}
              </button>
            ))}
          </nav>

          <div className="flex-1">
            {tab === "blogs" && <BlogManager />}
            {tab === "gallery" && <GalleryManager />}
            {tab === "messages" && <MessagesManager />}
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
