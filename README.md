# 💗 Rifah Tasfiya — Personal Website (MERN Stack)

Rifah Tasfiya-র জন্য বানানো একটা cute, colorful, fully dynamic full-stack website। এতে আছে blog system (admin panel সহ), comment, reaction (facebook-এর মতো), social share, photo gallery (masonry + lightbox), এবং contact form (email notification সহ)।

---

## 🗂️ Folder Structure

```
rifah-website/
├── backend/                 # Express + MongoDB API
│   ├── config/               # DB & Cloudinary config
│   ├── controllers/          # সব business logic
│   ├── middleware/           # auth, upload, error handler
│   ├── models/                # Mongoose schema (User, Blog, Comment, Reaction, GalleryImage, Message)
│   ├── routes/                # API endpoints
│   ├── utils/                  # email sender, admin seed script
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/                 # React (Vite) + Tailwind
    ├── src/
    │   ├── api/                # axios instance + visitor-id helper
    │   ├── components/     # Navbar, Footer, BlogCard, CommentSection, ReactionBar, ShareButtons...
    │   ├── context/            # AuthContext (admin login state)
    │   ├── pages/               # Home, BlogList, BlogDetail, Gallery, Contact, Admin...
    │   │   └── admin/           # BlogManager, GalleryManager, MessagesManager
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── tailwind.config.js
    ├── .env.example
    └── package.json
```

---

## ✨ Features যা এতে আছে

- **Romantic + Cute Design** — pastel pink/lavender/gold color palette, Fraunces + Quicksand fonts, floating animated blobs, signature "heartbeat line" section divider, mobile-first fully responsive (তার phone দিয়ে দেখলেও দারুণ লাগবে)
- **Dynamic Blog System** — admin panel থেকে rich-text editor (React Quill) দিয়ে blog লিখে cover image সহ publish করা যায়
- **SEO-friendly shareable URL** — প্রতিটা blog-এর নিজস্ব slug (যেমন: `/blog/amar-priyo-din`), Open Graph meta tags সহ — Facebook/WhatsApp-এ শেয়ার করলে preview card দেখাবে
- **Comments** — নাম দিয়ে comment ও reply করা যায় (কোনো login লাগে না)
- **Reactions** — Facebook-এর মতো Love/Haha/Wow/Aww reaction, প্রতি visitor একবারই react করতে পারবে (browser-এ track হয়)
- **Social Share Buttons** — Facebook, WhatsApp, Twitter/X, Telegram + copy link
- **Gallery** — Masonry layout + lightbox (click করলে ছবি বড় হয়ে দেখা যায়)
- **Contact Form** — message পাঠালে সরাসরি email-এ notification যায় (Nodemailer)
- **Secure Admin Panel** — JWT auth দিয়ে protected, blog/gallery/messages সব manage করা যায় একই dashboard থেকে
- **Security** — helmet, rate-limiting, mongo-sanitize, bcrypt password hashing

---

## ✅ Prerequisites (আগে থেকে যা লাগবে)

1. [Node.js](https://nodejs.org) (v18 বা তার উপরে)
2. একটা MongoDB database — সবচেয়ে সহজ: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) এ ফ্রি cluster বানানো
3. একটা [Cloudinary](https://cloudinary.com/users/register/free) ফ্রি account — image upload/hosting এর জন্য
4. Gmail (বা যেকোনো SMTP) — contact form থেকে email পাঠানোর জন্য
   - Gmail ব্যবহার করলে: Google Account → Security → 2-Step Verification চালু করে "App Passwords" থেকে একটা password বানাতে হবে (নিজের সাধারণ password ব্যবহার করা যাবে না)

---

## 🚀 Step-by-Step Setup

### 1️⃣ Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

এবার `.env` ফাইলটা খুলে নিজের তথ্য বসাও:

```
MONGO_URI=              # তোমার MongoDB Atlas connection string
JWT_SECRET=              # যেকোনো লম্বা random string (কাউকে শেয়ার করো না)
ADMIN_EMAIL=              # যে email দিয়ে admin panel-এ login করবে
ADMIN_PASSWORD=       # admin password
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
SMTP_USER=                 # তোমার Gmail address
SMTP_PASS=                 # Gmail App Password
CONTACT_RECEIVER_EMAIL=    # যে email-এ contact message আসবে
```

Admin account তৈরি করো (একবারই লাগবে):

```bash
npm run seed:admin
```

Server চালু করো:

```bash
npm run dev
```

Backend চলবে: `http://localhost:5000`

---

### 2️⃣ Frontend Setup

নতুন terminal খুলে:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend চলবে: `http://localhost:5173`

Browser-এ `http://localhost:5173` খুললে website দেখতে পাবে। Admin panel-এ যেতে: `http://localhost:5173/admin/login`

---

### 3️⃣ প্রথম Blog ও Photo Upload করা

1. `/admin/login` এ গিয়ে তোমার `ADMIN_EMAIL` আর `ADMIN_PASSWORD` দিয়ে login করো
2. **Blogs** ট্যাবে গিয়ে "New Blog" চাপো — title, excerpt, cover image, আর content লিখে "Publish" করো
3. **Gallery** ট্যাবে গিয়ে ছবি upload করো
4. **Messages** ট্যাবে contact form-এর সব message দেখতে পাবে

---

## 🌐 Deployment (Live করার উপায়)

### Backend → [Render](https://render.com) (ফ্রি)
1. এই `backend/` folder-টা একটা GitHub repo-তে push করো
2. Render-এ "New Web Service" বানাও, সেই repo connect করো
3. Build command: `npm install` | Start command: `npm start`
4. Environment tab-এ `.env`-এর সব variable বসাও (MONGO_URI, JWT_SECRET, ইত্যাদি)

### Frontend → [Vercel](https://vercel.com) অথবা [Netlify](https://netlify.com) (ফ্রি)
1. `frontend/` folder GitHub-এ push করো
2. Vercel/Netlify-তে import করো, framework auto-detect হবে (Vite)
3. Environment variable: `VITE_API_URL` = তোমার Render backend-এর URL + `/api` (যেমন: `https://rifah-backend.onrender.com/api`)
4. Backend-এর `.env`-এ `CLIENT_URL` আপডেট করে frontend-এর live URL বসাও (CORS ঠিক রাখার জন্য)

---

## 🔐 Security Notes

- `.env` ফাইল কখনো GitHub-এ push কোরো না (already `.gitignore`-এ থাকা উচিত)
- `JWT_SECRET` আর `ADMIN_PASSWORD` strong আর unique রাখো
- Production-এ যাওয়ার আগে `NODE_ENV=production` সেট করো

---

তোমার মতো করে আরও feature (যেমন: "Love Notes" wall, countdown timer, music player, password-protected private posts) যোগ করতে চাইলে বলো — আমি ধাপে ধাপে বানিয়ে দেব। 💗

---

## 🆕 What's new in this update

- **Fixed:** blog details page no longer goes blank — a broken third-party share-button package was causing the whole page (including comments and reactions) to crash silently. It's been replaced with plain, dependency-free share links, and every widget on the blog page (share, reactions, comments) is now wrapped in its own safety net so one broken part can never blank the rest of the page again.
- **New "About Her" section on the Home page** — her name, a round animated photo (rotating gradient ring + floating hearts), a short bio, a quote, and a few fun facts.
- **New dedicated `/about` page** — a fuller version of the same profile, easy to expand later.
- **New live site-stats widget** on the Home page — story count, photo count, comments, and reactions, animated with a count-up effect, pulled live from the database.
- **Blog detail page** now shows reading time, view count, a "back to stories" link, and a "More stories you might like" section at the bottom.
- **Blog cards** now have a quick-share button on hover (copies the link, or opens your phone's native share sheet on mobile) — no need to open the post first.
- **Redesigned footer** — quick links, a "send a message" shortcut, and a back-to-top button.
- Extra mobile-view polish across the site (full-width buttons on small screens, better spacing, etc).

### ✏️ How to personalize the "About Her" section

Open `frontend/src/data/profile.js` — everything shown in the profile card and the About page comes from this one file:

```js
const profile = {
  name: "Rifah Tasfiya",
  tagline: "the reason this whole site exists",
  photo: "/profile.jpg",
  bio: "...",
  quote: "...",
  facts: [ ... ],
};
```

To use her real photo: just replace `frontend/public/profile.jpg` with an actual photo (keep the filename `profile.jpg`, any square-ish JPG/PNG works best since it's cropped into a circle). A placeholder photo is included so the site looks complete out of the box.

---

## 🔧 Troubleshooting — Blog Not Loading / Card Not Clickable

If blog cards or the details page ever seem "missing" or broken, it's almost always the **frontend silently failing to reach the backend** — not a missing component. Check these in order:

1. **Is the backend actually running?** In the `backend/` terminal you should see `Server running on port 5000` and `MongoDB connected: ...`. If not, `npm run dev` there first.
2. **Open the browser console (F12 → Console tab)** while on the Blog page. Every failed API call now logs a clear `[API] GET /blogs failed: ...` message — this tells you exactly what's wrong (network error, 404, 500, etc.) instead of failing silently.
3. **Check `frontend/.env`** — `VITE_API_URL` must point to your backend, e.g. `http://localhost:5000/api`. If you edit `.env`, restart `npm run dev` (Vite only reads it on startup).
4. **Test the backend directly**, independent of the frontend:
   ```bash
   curl http://localhost:5000/api/health   # should return {"status":"ok"}
   curl http://localhost:5000/api/blogs    # should return {"blogs":[], "page":1, ...} even if empty
   ```
   If these fail, the problem is 100% backend-side (check MongoDB connection / `.env`), not the blog UI.
5. **Have you actually published a blog yet?** A brand-new site has zero blogs — that's expected and shows "No stories published yet." Log into `/admin/login` and create one from the **Blogs** tab first.
6. **Port mismatch:** the frontend is pinned to port `5173` (won't silently switch anymore). If you see a "port already in use" error, close whatever else is using it rather than letting Vite pick a different port.

The blog card component and blog details page (`frontend/src/components/BlogCard.jsx` and `frontend/src/pages/BlogDetail.jsx`) are both present in every zip — if a page ever looks blank, it's a data/connection issue surfaced above, not a missing file.

---

## 🆕 Bangla title → blank URL bug (fixed)

**The bug:** if a blog title was written entirely in Bangla (e.g. "আমার প্রথম পোস্ট"), the URL slug generator was using a Latin-only "strict" mode that stripped every non-Latin character — producing a completely empty slug. That's why clicking the card sent you to `/blog/` (nothing after the slash) instead of a real post URL, and the details page (along with comments/reactions on it) never actually loaded.

**The fix:** slug generation is now Unicode-aware, so Bangla titles produce a proper slug (e.g. "আমার প্রথম পোস্ট" → a real, working URL). English titles work exactly as before.

**To fix a blog you already created** (which is stuck with a blank slug), you don't need to re-type anything — just run this once after pulling the update:

```bash
cd backend
npm run fix:slugs
```

This finds any blog with an empty slug and regenerates it automatically. You'll see console output like:
```
Fixed "আমার প্রথম পোস্ট" -> slug: "আমার-প্রথম-পোস্ট"
Done. Fixed 1 blog(s).
```

After that, refresh the site — the blog card should now link to a real URL and the details page (with comments and reactions) should open normally.
