# Valarmathi Mess — Official Restaurant Website

> **Authentic Kongu Regional Cuisine • Operating Since 1986**  
> CSI Compound, 207/A, Race Course, Coimbatore, Tamil Nadu 641018  
> Phone: **+91 422 427 1190**

---

## 🍛 Project Overview

A production-grade, immersive restaurant website engineered for **Valarmathi Mess**, Coimbatore's revered regional food institution. The digital experience reflects the authentic, food-first, banana-leaf mess culture that locals and travelers have celebrated since 1986.

### Core Highlights:
- **No Hard-coded Prices or Content**: All 30+ signature dishes, pricing, daily availability toggles, service hours, and photo galleries are dynamically loaded from an embedded **SQLite** database (`valarmathi.db`).
- **Strict Factual Accuracy**: Strictly rooted in verified historical facts (founded in 1986 at CSI Compound, Race Course). Zero fabricated awards or unverified claims.
- **Real Reservation & Enquiry System**: Direct submission of dining and party enquiries saved to SQLite with validation and instant reference IDs.
- **Local Admin Portal (`/admin`)**: Interactive demonstration dashboard to adjust daily pricing, toggle today's sold-out items, edit opening hours, and manage guest reservations.
- **Mobile-First Experience**: High-ergonomics sticky mobile navigation bar with one-touch **CALL (+91 422 427 1190)**, **DIRECTIONS (Google Maps)**, and **MENU** buttons.
- **Zero Cloud Database Dependencies**: Uses SQLite directly, making the entire website self-contained and trivially easy to deploy on shared hosts like **GoDaddy** or dedicated servers.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 8, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React
- **Typography**: Cormorant Garamond / Playfair Display (editorial serif display), Plus Jakarta Sans (UI body), Noto Serif Tamil (cultural typography)
- **Backend**: Node.js, Express REST API, SQLite (`DatabaseSync` / SQLite embedded engine)
- **Design System**: Warm ivory background (`#FAF7F2`), deep wine/maroon (`#6B1D28`), earthy brown (`#3B231E`), and muted turmeric/ochre accent (`#C8861B`)

---

## 🚀 Getting Started (Run Locally)

The application runs completely self-contained on your local machine:

```bash
# 1. Install dependencies
npm install

# 2. Start both server (port 5000) and frontend (port 5173) in development mode
npm run dev
```

Open your browser at:
- **Website**: `http://localhost:5173`
- **Menu**: `http://localhost:5173/#menu`
- **Our Story**: `http://localhost:5173/#story`
- **Gallery**: `http://localhost:5173/#gallery`
- **Visit & Hours**: `http://localhost:5173/#visit`
- **Admin Dashboard**: `http://localhost:5173/#admin`

---

## 📦 Production Build & Testing

```bash
# Build frontend and bundle standalone server
npm run build

# Start production server
npm start
```
The unified production server starts at `http://localhost:5000` and serves both the REST API and the frontend application on a single port.

---

## 🌐 Hosting on GoDaddy or Other Platforms

See [`HOSTING_GUIDE.md`](./HOSTING_GUIDE.md) for full instructions on deploying to:
- **GoDaddy cPanel** (via "Setup Node.js App")
- **GoDaddy VPS / Cloud Server** (via PM2 & Nginx)
- **Render / Railway / Vercel**
