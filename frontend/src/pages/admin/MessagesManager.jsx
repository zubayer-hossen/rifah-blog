import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineMail, HiOutlineMailOpen, HiOutlineTrash } from "react-icons/hi";
import api from "../../api/axios";
import Loader from "../../components/Loader.jsx";

const MessagesManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get("/messages").then((res) => setMessages(res.data)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const markRead = async (id) => {
    await api.patch(`/messages/${id}/read`);
    setMessages((prev) => prev.map((m) => (m._id === id ? { ...m, isRead: true } : m)));
  };

  const remove = async (id) => {
    if (!confirm("Delete this message?")) return;
    await api.delete(`/messages/${id}`);
    toast.success("Message deleted");
    load();
  };

  return (
    <div>
      <h2 className="mb-6 font-display text-2xl italic">Messages</h2>

      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map((m) => (
            <div key={m._id} className={`card p-5 ${!m.isRead ? "ring-2 ring-blush-light" : ""}`}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold">{m.name} <span className="font-normal text-plum/50">· {m.email}</span></p>
                  {m.subject && <p className="text-sm font-semibold text-lavender">{m.subject}</p>}
                </div>
                <div className="flex gap-2">
                  {!m.isRead && (
                    <button onClick={() => markRead(m._id)} className="rounded-full bg-mint/40 p-2 text-plum hover:bg-mint/60" aria-label="Mark as read">
                      <HiOutlineMailOpen />
                    </button>
                  )}
                  <button onClick={() => remove(m._id)} className="rounded-full bg-blush-light/40 p-2 text-blush-dark hover:bg-blush-light" aria-label="Delete">
                    <HiOutlineTrash />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-plum/80">{m.text}</p>
              <p className="mt-2 text-xs text-plum/40">{new Date(m.createdAt).toLocaleString()}</p>
            </div>
          ))}
          {messages.length === 0 && (
            <p className="flex items-center justify-center gap-2 py-16 text-plum/50">
              <HiOutlineMail /> No messages yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MessagesManager;
