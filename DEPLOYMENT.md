# 🚀 Vercel Deployment Guide - Step by Step

This guide shows you **exactly** how to deploy your Math Game Admin System to Vercel.

## 📋 What We're Deploying

1. **Backend API** → Render.com (Free)
2. **Admin Panel** → Vercel (Free)
3. **Game Demo** → Vercel (Free)

> **Why separate backend?** Vercel's serverless environment has ephemeral (temporary) storage. Our JSON database won't persist there. So we use Render.com for backend.

---

## 🎯 Step 1: Deploy Backend to Render.com

### 1.1. Create Render Account

1. Go to [https://render.com](https://render.com)
2. Click **"Get Started"** or **"Sign Up"**
3. Sign up with GitHub (recommended) or email

### 1.2. Create New Web Service

1. Click **"New +"** button (top right)
2. Select **"Web Service"**

### 1.3. Connect Your Code

**Option A: From GitHub**
1. Click **"Build and deploy from a Git repository"**
2. Connect your GitHub account
3. Select your `math-game-admin` repository
4. Click **"Connect"**

**Option B: Public Repository**
1. Click **"Public Git repository"**
2. Paste your repo URL: `https://github.com/YOUR_USERNAME/math-game-admin`

### 1.4. Configure Service

Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `math-game-backend` (or any name) |
| **Region** | Choose closest to you |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |
| **Instance Type** | `Free` |

### 1.5. Deploy

1. Click **"Create Web Service"**
2. Wait 2-3 minutes for deployment
3. You'll get a URL like: `https://math-game-backend.onrender.com`
4. **📋 Copy this URL** - you'll need it later!

### 1.6. Test Backend

Open: `https://YOUR-BACKEND-URL.onrender.com`

You should see:
```json
{
  "message": "11. Sınıf Matematik Oyunu - Backend API",
  "version": "1.0.0",
  "endpoints": { ... }
}
```

✅ **Backend is live!**

---

## 🎨 Step 2: Deploy Admin Panel to Vercel

### 2.1. Push to GitHub (if not done already)

```bash
cd /Users/kursat/Documents/Projeler/math-game-admin

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Math Game Admin System"

# Create a new repository on GitHub.com, then:
git remote add origin https://github.com/YOUR_USERNAME/math-game-admin.git
git branch -M main
git push -u origin main
```

### 2.2. Create Vercel Account

1. Go to [https://vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (easiest)

### 2.3. Import Project

1. Click **"Add New..."** → **"Project"**
2. Find your `math-game-admin` repository
3. Click **"Import"**

### 2.4. Configure Project

On the "Configure Project" screen:

#### Framework Preset
- Should auto-detect as **"Vite"** ✅

#### Root Directory
- Click **"Edit"**
- Select **`admin-panel`** from dropdown
- Click **"Continue"**

#### Build and Output Settings
Leave these as default:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Environment Variables

This is **IMPORTANT!** 

1. Click **"Add Environment Variable"**
2. Fill in:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://YOUR-BACKEND-URL.onrender.com/api` |

⚠️ **Important:** 
- Replace `YOUR-BACKEND-URL` with your actual Render URL from Step 1
- **Must end with `/api`**
- Example: `https://math-game-backend.onrender.com/api`

### 2.5. Deploy

1. Click **"Deploy"**
2. Wait 1-2 minutes
3. You'll get a URL like: `https://math-game-admin-xyz.vercel.app`

### 2.6. Test Admin Panel

1. Visit your Vercel URL
2. You should see the login page
3. Login with:
   - Username: `ogretmen1`
   - Password: `sifre123`
4. You should see the dashboard with 50 questions

✅ **Admin Panel is live!**

---

## 🎮 Step 3: Update Game Demo

### 3.1. Edit Game Script

Open: `game-demo/script.js`

**Change line 1 from:**
```javascript
const API_URL = 'http://localhost:3000/api/game';
```

**To:**
```javascript
const API_URL = 'https://YOUR-BACKEND-URL.onrender.com/api/game';
```

Replace `YOUR-BACKEND-URL` with your actual Render URL!

Example:
```javascript
const API_URL = 'https://math-game-backend.onrender.com/api/game';
```

### 3.2. Commit and Push

```bash
git add game-demo/script.js
git commit -m "Update game demo API URL for production"
git push
```

Vercel will automatically redeploy (takes ~1 minute).

### 3.3. Test Game Demo

Visit: `https://YOUR-VERCEL-URL.vercel.app/game-demo/`

Click **"Başla"** - questions should load!

✅ **Game Demo is live!**

---

## 🎉 You're Done!

Your app is now live on the internet!

### Your URLs

- **Admin Panel**: `https://YOUR-PROJECT.vercel.app`
- **Game Demo**: `https://YOUR-PROJECT.vercel.app/game-demo/`
- **Backend API**: `https://YOUR-BACKEND.onrender.com`

### Share with Students

Students can play at: `https://YOUR-PROJECT.vercel.app/game-demo/`

Teachers can manage questions at: `https://YOUR-PROJECT.vercel.app`

---

## 🔧 Common Issues & Solutions

### Issue 1: "CORS Error" in Admin Panel

**Error:** `Access to fetch at ... from origin ... has been blocked by CORS policy`

**Solution:** Update `backend/server.js`

Find the line with `app.use(cors());` and replace it with:

```javascript
app.use(cors({
  origin: [
    'https://YOUR-PROJECT.vercel.app',
    'http://localhost:5173'
  ],
  credentials: true
}));
```

Replace `YOUR-PROJECT` with your actual Vercel project name.

Then commit and push:
```bash
git add backend/server.js
git commit -m "Fix CORS for production"
git push
```

Render will automatically redeploy.

---

### Issue 2: Environment Variable Not Working

**Symptoms:** Admin panel can't connect to backend, or shows `http://localhost:3000` errors

**Solution:**
1. Go to Vercel Dashboard
2. Click your project
3. Go to **Settings** → **Environment Variables**
4. Verify `VITE_API_URL` is set correctly
5. Must be: `https://YOUR-BACKEND.onrender.com/api` (with `/api` at end!)
6. If you changed it, go to **Deployments** tab
7. Click **"..."** on latest deployment → **"Redeploy"**

---

### Issue 3: Backend is Slow (First Load)

**Symptoms:** First API request takes 30-60 seconds

**Why:** Render's free tier "sleeps" after 15 minutes of inactivity. First request wakes it up.

**Solutions:**
- **Free:** Just wait 30-60 seconds on first load (normal behavior)
- **Paid:** Upgrade to Render's Starter plan ($7/month) for always-on service
- **Workaround:** Use a service like [UptimeRobot](https://uptimerobot.com) to ping your backend every 10 minutes

---

### Issue 4: Questions Not Saving

**Symptoms:** Can add questions in admin panel, but they disappear when backend restarts

**Solution:** This is expected on Render's free tier. The JSON database is in-memory and resets on restart.

**Options:**
- Upgrade to Render paid plan with persistent disk
- Or migrate to a real database (MongoDB, PostgreSQL)

---

### Issue 5: Game Demo Shows "No Questions"

**Check:**
1. Did you update `game-demo/script.js` with your backend URL?
2. Does the URL end with `/api/game` (not just `/api`)?
3. Is your backend actually running? Visit the backend URL directly to check.

---

## 📱 Optional: Add Custom Domain

### Add Your Own Domain

1. Go to Vercel Dashboard → Your Project
2. Click **Settings** → **Domains**
3. Click **"Add"**
4. Enter your domain (e.g., `mathgame.yourdomain.com`)
5. Follow the DNS instructions provided
6. Wait 5-10 minutes for DNS propagation

Vercel automatically provides:
- ✅ Free HTTPS certificate
- ✅ Global CDN
- ✅ Auto-renewal

---

## 🔄 Making Updates After Deployment

### Update Admin Panel or Game Demo
1. Make changes to files locally
2. Commit and push:
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```
3. Vercel automatically redeploys in ~1 minute
4. Check your live site!

### Update Backend
1. Make changes to `backend/` files
2. Commit and push:
   ```bash
   git add .
   git commit -m "Backend update"
   git push
   ```
3. Render automatically redeploys in ~2 minutes

---

## 📊 Monitoring Your App

### Vercel Dashboard
- View deployment logs
- See visitor analytics
- Monitor performance
- Check build status

### Render Dashboard
- View backend logs
- Monitor memory/CPU usage
- See request metrics
- Check uptime

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Vite Environment Variables Guide](https://vitejs.dev/guide/env-and-mode.html)
- [React Deployment Guide](https://reactjs.org/docs/deployment.html)

---

## ❓ Need More Help?

- **Vercel Issues:** [vercel.com/support](https://vercel.com/support)
- **Render Issues:** [community.render.com](https://community.render.com)
- **GitHub Discussions:** Create a discussion in your repo
- **Stack Overflow:** Tag with `vercel`, `render`, `react`, `vite`

---

**Happy Deploying! 🚀**

If you found this guide helpful, star the repo! ⭐
