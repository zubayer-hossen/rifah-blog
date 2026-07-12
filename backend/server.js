require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");
const { errorHandler, notFound } = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const messageRoutes = require("./routes/messageRoutes");
const statsRoutes = require("./routes/statsRoutes");

connectDB();

const app = express();

// ---- Security & core middleware ----
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      // In development, allow any localhost/127.0.0.1 port so a Vite port
      // change never silently breaks every request with a CORS error.
      const allowedOrigin = process.env.CLIENT_URL || "http://localhost:5173";
      const isLocalDev =
        process.env.NODE_ENV !== "production" && (!origin || /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin));
      if (!origin || origin === allowedOrigin || isLocalDev) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());

// Basic protection against brute-force / spam on write-heavy public routes
const publicWriteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: "Too many requests, please try again later." },
});
app.use("/api/messages", publicWriteLimiter);
app.use("/api/auth/login", rateLimit({ windowMs: 15 * 60 * 1000, max: 20 }));

// ---- Routes ----
app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/stats", statsRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
