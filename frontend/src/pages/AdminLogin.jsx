import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate("/admin");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Admin Login — Rifah Tasfiya</title></Helmet>
      <section className="mx-auto flex min-h-[70vh] max-w-md items-center px-5">
        <form onSubmit={handleSubmit} className="card w-full p-8">
          <h1 className="text-center font-display text-3xl italic">Admin Login</h1>
          <p className="mt-2 text-center text-sm text-plum/50">Manage blogs, gallery & messages</p>
          <div className="mt-6 flex flex-col gap-4">
            <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
            <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" />
            <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AdminLogin;
