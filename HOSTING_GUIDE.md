# 🚀 Valarmathi Mess Website — Deployment & Hosting Guide

This guide explains how to host the **Valarmathi Mess** website on **GoDaddy** (cPanel / VPS) or modern cloud hosts (**Render**, **Railway**, **Vercel**).

---

## 🏗️ Architecture Overview

- **Frontend**: React + Vite + TypeScript + Tailwind CSS (compiled into high-performance static files in `client/dist/`)
- **Backend**: Node.js + Express REST API (bundled into `dist/server.js`)
- **Database**: Local **SQLite** database (`valarmathi.db`)
  - **No external cloud database needed!** Zero AWS/MongoDB/RDS bills.
  - Backing up all menu items, dishes, photos, and guest reservations is as easy as copying the single `valarmathi.db` file.
- **Entrypoint**: `server.js` at the project root serves both the API endpoints (`/api/*`) and the frontend pages directly on a single port.

---

## 📦 Option 1: GoDaddy cPanel Hosting ("Setup Node.js App")

Most GoDaddy Linux shared hosting plans include cPanel with **Setup Node.js App** (CloudLinux / Phusion Passenger).

### Step-by-Step Instructions:

1. **Log in to GoDaddy cPanel**:
   - Go to your GoDaddy account and open **cPanel Admin**.
   - Under the **Software** section, click **Setup Node.js App**.

2. **Create New Application**:
   - Click **Create Application**.
   - **Node.js version**: Choose `20.x` or `22.x` (or newer).
   - **Application mode**: Select `Production`.
   - **Application root**: Enter a directory name, e.g., `valarmathi` or `public_html/valarmathi`.
   - **Application URL**: Select your domain (e.g. `valarmathimess.com`).
   - **Application startup file**: Enter `server.js`.
   - Click **Create**.

3. **Upload the Files**:
   - On your computer, run:
     ```bash
     npm install
     npm run build
     ```
   - In cPanel, open **File Manager** (or connect via FTP / FileZilla).
   - Upload the project files into your application root folder (e.g. `/home/username/valarmathi`).
   - **Important**: You only need to upload:
     - `package.json`
     - `server.js`
     - `dist/` (contains `dist/server.js`)
     - `client/dist/` (contains the built frontend)
     - `valarmathi.db` (contains initial seeded dishes & restaurant info)
     *(You do NOT need to upload the huge `node_modules` folder; cPanel will install dependencies directly on the server).*

4. **Install Dependencies in cPanel**:
   - In the cPanel **Node.js Selector** interface for your app, click the **"Run NPM Install"** button.
   - Alternatively, copy the virtual environment command shown at the top of the cPanel page (e.g. `source /home/user/nodevenv/valarmathi/20/bin/activate`) into the cPanel **Terminal** and run:
     ```bash
     npm install --omit=dev
     ```

5. **Restart & Go Live**:
   - Click **Restart** in the Node.js App section.
   - Visit your domain in the browser (e.g. `https://valarmathimess.com`).
   - Your website is now live with the full restaurant menu, gallery, reservation system, and `/admin` panel!

---

## 🖥️ Option 2: GoDaddy VPS or Dedicated Cloud Server (Ubuntu / Debian)

If you have a GoDaddy VPS or cloud server:

1. **SSH into your server**:
   ```bash
   ssh root@your-server-ip
   ```

2. **Install Node.js (20 or 22)**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Deploy the application**:
   ```bash
   cd /var/www
   git clone <your-repo-url> valarmathi
   cd valarmathi
   npm install
   npm run build
   ```

4. **Run continuously with PM2**:
   ```bash
   sudo npm install -g pm2
   pm2 start server.js --name "valarmathi"
   pm2 startup
   pm2 save
   ```

5. **Nginx Reverse Proxy & Free SSL**:
   Set up Nginx to proxy port 5000 to port 80/443:
   ```nginx
   server {
       server_name valarmathimess.com www.valarmathimess.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   Add free SSL via Certbot:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d valarmathimess.com -d www.valarmathimess.com
   ```

---

## ☁️ Option 3: Modern 1-Click Cloud Hosting (Render / Railway)

If you prefer a free or low-cost modern alternative to GoDaddy that requires zero server configuration:

### Deploying to Render:
1. Push this project to GitHub.
2. Go to [render.com](https://render.com) and click **New Web Service**.
3. Connect your repository.
4. Settings:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Click **Deploy**. Render gives you a live HTTPS URL with free automatic SSL.

---

## 💾 Backing Up Your Restaurant Data

All content (menu prices, availability toggles, guest reservation submissions, photo gallery) is stored in:
```
valarmathi.db
```
To create a backup:
- Simply download `valarmathi.db` from your cPanel File Manager or server.
- To restore on another server, place `valarmathi.db` in the project root directory before starting the app.

---

## 🛠️ Local Development Commands

To run locally on your laptop:

```bash
# 1. Install dependencies
npm install

# 2. Run both backend (port 5000) & frontend (port 5173) with hot reload
npm run dev

# 3. Production build
npm run build

# 4. Production run
npm start
```

- Website: `http://localhost:5173` (dev) or `http://localhost:5000` (production)
- Admin portal: `http://localhost:5173/#admin` or `http://localhost:5000/#admin`
