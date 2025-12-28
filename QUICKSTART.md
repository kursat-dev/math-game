# ⚡ Quick Start - Deploy in 15 Minutes

## 🎯 What You'll Do

Deploy your math game so students can use it online!

---

## 📝 3 Simple Steps

### Step 1: Deploy Backend (5 min)

1. Go to **[render.com](https://render.com)** → Sign up with GitHub
2. Click **"New Web Service"**
3. Connect your GitHub repo
4. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Click **"Create Web Service"**
6. **📋 COPY YOUR URL** (like `https://math-game-backend.onrender.com`)

---

### Step 2: Deploy Frontend (5 min)

**First, push to GitHub:**
```bash
cd /Users/kursat/Documents/Projeler/math-game-admin
git init
git add .
git commit -m "Initial commit"
# Create new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/math-game-admin.git
git branch -M main
git push -u origin main
```

**Then deploy to Vercel:**
1. Go to **[vercel.com](https://vercel.com)** → Sign up with GitHub
2. Click **"Add New Project"**
3. Import your `math-game-admin` repo
4. Settings:
   - **Root Directory**: `admin-panel`
5. **Environment Variable** (IMPORTANT!):
   - **Name**: `VITE_API_URL`
   - **Value**: `https://YOUR-BACKEND-URL.onrender.com/api`
   - (Replace with YOUR actual Render URL from Step 1)
6. Click **"Deploy"**

---

### Step 3: Update Game Demo (2 min)

1. Open `game-demo/script.js`
2. Change line 1 to:
   ```javascript
   const API_URL = 'https://YOUR-BACKEND-URL.onrender.com/api/game';
   ```
3. Save, commit, push:
   ```bash
   git add game-demo/script.js
   git commit -m "Update API URL"
   git push
   ```

---

## ✅ You're Done!

Your app is live:
- **Admin Panel**: `https://your-project.vercel.app`
- **Game Demo**: `https://your-project.vercel.app/game-demo/`

Login: `ogretmen1` / `sifre123`

---

## 🆘 Not Working?

**Common fixes:**

1. **Admin panel can't connect to backend**
   - Check environment variable in Vercel
   - Make sure it ends with `/api`

2. **Game demo has no questions**
   - Check `game-demo/script.js` has correct URL
   - Must end with `/api/game`

3. **Backend is slow**
   - First request takes 30 seconds (normal on free tier)
   - Render "wakes up" the backend

**Need detailed help?** See [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 🎓 Next Steps

- Add more questions via admin panel
- Share game link with students
- Customize the design
- Add your own domain (optional)

---

**Questions?** Check [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions!
