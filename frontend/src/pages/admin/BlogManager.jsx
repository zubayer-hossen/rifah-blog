import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus } from "react-icons/hi";
import api from "../../api/axios";
import Loader from "../../components/Loader.jsx";

const emptyForm = { title: "", excerpt: "", content: "", tags: "", isPublished: true };

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [coverFile, setCoverFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    setLoading(true);
    api.get("/blogs/admin/all").then((res) => setBlogs(res.data)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const resetForm = () => {
    setForm(emptyForm);
    setCoverFile(null);
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = async (blog) => {
    const { data } = await api.get(`/blogs/${blog.slug}`);
    setForm({
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      tags: data.tags.join(", "),
      isPublished: data.isPublished,
    });
    setEditingId(blog._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.excerpt || !form.content) {
      toast.error("Title, excerpt and content are required");
      return;
    }
    if (!editingId && !coverFile) {
      toast.error("Please choose a cover image");
      return;
    }

    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (coverFile) fd.append("coverImage", coverFile);

    try {
      if (editingId) {
        await api.put(`/blogs/${editingId}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
        toast.success("Blog updated!");
      } else {
        await api.post("/blogs", fd, { headers: { "Content-Type": "multipart/form-data" } });
        toast.success("Blog published!");
      }
      resetForm();
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this blog permanently?")) return;
    await api.delete(`/blogs/${id}`);
    toast.success("Blog deleted");
    load();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl italic">Blogs</h2>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn-primary text-sm">
            <HiOutlinePlus /> New Blog
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card mb-10 flex flex-col gap-4 p-6">
          <h3 className="font-display text-xl italic">{editingId ? "Edit Blog" : "New Blog"}</h3>
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="input-field"
            maxLength={150}
          />
          <textarea
            placeholder="Short excerpt (shown in cards)"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            className="input-field resize-none"
            rows={2}
            maxLength={300}
          />
          <input
            placeholder="Tags, comma separated (e.g. love, memories)"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="input-field"
          />
          <div>
            <label className="mb-1 block text-sm font-semibold text-plum/70">Cover image {editingId && "(leave empty to keep current)"}</label>
            <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files[0])} className="w-full text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-plum/70">Content</label>
            <ReactQuill
              theme="snow"
              value={form.content}
              onChange={(content) => setForm({ ...form, content })}
              className="bg-white [&_.ql-editor]:min-h-[220px] [&_.ql-editor]:font-body"
            />
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold text-plum/70">
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
            />
            Published (visible on the site)
          </label>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
              {saving ? "Saving..." : editingId ? "Update Blog" : "Publish Blog"}
            </button>
            <button type="button" onClick={resetForm} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto rounded-2xl bg-white shadow-soft">
          <table className="w-full text-left text-sm">
            <thead className="bg-blush-light/30 text-plum/70">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Status</th>
                <th className="p-3">Views</th>
                <th className="p-3">Comments</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((b) => (
                <tr key={b._id} className="border-t border-blush-light/30">
                  <td className="p-3 font-semibold">{b.title}</td>
                  <td className="p-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${b.isPublished ? "bg-mint/40 text-plum" : "bg-plum/10 text-plum/60"}`}>
                      {b.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="p-3">{b.views}</td>
                  <td className="p-3">{b.commentCount}</td>
                  <td className="p-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => startEdit(b)} className="rounded-full bg-lavender-light/40 p-2 text-lavender hover:bg-lavender-light">
                        <HiOutlinePencil />
                      </button>
                      <button onClick={() => handleDelete(b._id)} className="rounded-full bg-blush-light/40 p-2 text-blush-dark hover:bg-blush-light">
                        <HiOutlineTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-plum/50">No blogs yet — create your first one!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BlogManager;
