import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineTrash, HiOutlineUpload } from "react-icons/hi";
import api from "../../api/axios";
import Loader from "../../components/Loader.jsx";

const GalleryManager = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);

  const load = () => {
    setLoading(true);
    api.get("/gallery").then((res) => setImages(res.data)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Choose a photo first");

    setUploading(true);
    const fd = new FormData();
    fd.append("image", file);
    fd.append("caption", caption);

    try {
      await api.post("/gallery", fd, { headers: { "Content-Type": "multipart/form-data" } });
      toast.success("Photo added!");
      setFile(null);
      setCaption("");
      e.target.reset();
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this photo?")) return;
    await api.delete(`/gallery/${id}`);
    toast.success("Photo deleted");
    load();
  };

  return (
    <div>
      <h2 className="mb-6 font-display text-2xl italic">Gallery</h2>

      <form onSubmit={handleUpload} className="card mb-8 flex flex-col gap-4 p-6 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="mb-1 block text-sm font-semibold text-plum/70">Photo</label>
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="w-full text-sm" />
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-sm font-semibold text-plum/70">Caption (optional)</label>
          <input value={caption} onChange={(e) => setCaption(e.target.value)} className="input-field" maxLength={200} />
        </div>
        <button type="submit" disabled={uploading} className="btn-primary shrink-0 disabled:opacity-60">
          <HiOutlineUpload /> {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {images.map((img) => (
            <div key={img._id} className="group relative overflow-hidden rounded-2xl shadow-soft">
              <img src={img.image.url} alt={img.caption} className="aspect-square w-full object-cover" />
              <button
                onClick={() => handleDelete(img._id)}
                className="absolute right-2 top-2 rounded-full bg-white/90 p-2 text-blush-dark opacity-0 shadow-soft transition-opacity group-hover:opacity-100"
                aria-label="Delete photo"
              >
                <HiOutlineTrash />
              </button>
            </div>
          ))}
          {images.length === 0 && <p className="col-span-full py-8 text-center text-plum/50">No photos yet.</p>}
        </div>
      )}
    </div>
  );
};

export default GalleryManager;
