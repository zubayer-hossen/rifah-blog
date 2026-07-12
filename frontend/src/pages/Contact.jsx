import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../api/axios";

const initialForm = { name: "", email: "", subject: "", text: "" };

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/messages", form);
      toast.success("Message sent! 💌");
      setForm(initialForm);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact — Rifah Tasfiya</title>
      </Helmet>

      <section className="mx-auto max-w-2xl px-5 py-14">
        <h1 className="section-title">Say Something Sweet</h1>
        <p className="mx-auto mt-3 max-w-md text-center text-plum/60">
          Leave a message — it goes straight to the inbox.
        </p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="card mt-10 flex flex-col gap-4 p-6 sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="name" required maxLength={80} placeholder="Your name" value={form.name} onChange={handleChange} className="input-field" />
            <input name="email" type="email" required placeholder="Your email" value={form.email} onChange={handleChange} className="input-field" />
          </div>
          <input name="subject" maxLength={150} placeholder="Subject (optional)" value={form.subject} onChange={handleChange} className="input-field" />
          <textarea name="text" required rows={5} maxLength={2000} placeholder="Your message..." value={form.text} onChange={handleChange} className="input-field resize-none" />
          <button type="submit" disabled={loading} className="btn-primary self-center disabled:opacity-60">
            {loading ? "Sending..." : "Send Message 💌"}
          </button>
        </motion.form>
      </section>
    </>
  );
};

export default Contact;
