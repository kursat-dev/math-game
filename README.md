# 📊 11th Grade Math Game - Admin Panel & API

A modern mathematics education platform with an admin panel for teachers to manage questions and a game demo for students.

## ✨ Features

### Backend API
- 🔐 JWT-based teacher authentication
- 📝 Full question management (CRUD)
- 🎯 Topic-based filtering (Trigonometry, Analytic Geometry)
- 📊 Difficulty level support (Easy, Medium, Hard)
- 💡 Hint system
- 🗄️ JSON file-based storage
- **50 comprehensive sample questions** ready to use

### Admin Panel
- 🎨 Modern glassmorphism design
- 🌙 Dark mode theme
- 📱 Responsive design
- ➕ Add, edit, delete questions
- 📈 Statistics dashboard
- ⚡ Fast and user-friendly

### Game Demo
- 🎮 Interactive quiz interface
- 🎯 Topic and difficulty filtering
- 💯 Score tracking
- 💡 Hint support
- 🎨 Vibrant and fun design

---

## 🚀 Quick Start (Local Development)

### 1. Backend

```bash
cd backend
npm install
npm start
```

Backend running at: `http://localhost:3000`

### 2. Admin Panel

```bash
cd admin-panel
npm install
npm run dev
```

Admin Panel running at: `http://localhost:5173`

### 3. Game Demo

Open `game-demo/index.html` in your browser.

---

## 🌐 Vercel Deployment (Simple Steps)

### Option 1: Complete Deployment

#### Step 1: Deploy Backend to Render.com (Free)
1. Go to [render.com](https://render.com) → Sign up with GitHub
2. Click "New Web Service" → Connect your GitHub repo
3. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Click "Create Web Service"
5. **Copy your backend URL** (e.g., `https://math-game-backend.onrender.com`)

#### Step 2: Push to GitHub
```bash
cd /Users/kursat/Documents/Projeler/math-game-admin
git init
git add .
git commit -m "Initial commit"
# Create repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/math-game-admin.git
git branch -M main
git push -u origin main
```

#### Step 3: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click "Add New Project" → Import your repository
3. Settings:
   - **Root Directory**: `admin-panel`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Add Environment Variable**:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://YOUR-BACKEND-URL.onrender.com/api`
5. Click "Deploy"

#### Step 4: Update Game Demo
Edit `game-demo/script.js` line 1:
```javascript
const API_URL = 'https://YOUR-BACKEND-URL.onrender.com/api/game';
```

Then commit and push:
```bash
git add game-demo/script.js
git commit -m "Update API URL for production"
git push
```

**Done!** Your app is live:
- Admin Panel: `https://your-project.vercel.app`
- Game Demo: `https://your-project.vercel.app/game-demo/`

**Detailed guide:** See [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 📁 Project Structure

```
math-game-admin/
├── backend/               # Express API Server
│   ├── data/             # JSON data files
│   ├── routes/           # API routes
│   ├── database.js       # Data management
│   ├── middleware.js     # JWT middleware
│   └── server.js         # Main server
│
├── admin-panel/          # React Admin Panel
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── config.js     # API configuration
│   │   └── index.css     # Design system
│   └── vite.config.js
│
├── game-demo/            # Game Demo
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── DEPLOYMENT.md         # Detailed deployment guide
└── README.md            # This file
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Teacher login
- `POST /api/auth/register` - New teacher registration

### Question Management (JWT Protected)
- `GET /api/questions` - List all questions
- `POST /api/questions` - Add new question
- `PUT /api/questions/:id` - Update question
- `DELETE /api/questions/:id` - Delete question

### Game API (Public)
- `GET /api/game/questions?topic=&difficulty=&limit=` - Get filtered questions
- `GET /api/game/stats` - Get statistics

**Full API docs:** Run backend and visit `http://localhost:3000`

---

## 📊 Question Database

**50 Comprehensive Questions:**
- Trigonometry: 25 questions (10 easy, 10 medium, 5 hard)
- Analytic Geometry: 25 questions (10 easy, 10 medium, 5 hard)

**Topics Covered:**
- Special angles, trigonometric identities
- Sum/difference formulas, double angle formulas
- Distance between points, line equations
- Circle equations, and more...

---

## 🛠️ Technologies

**Backend:**
- Node.js + Express
- JSON file storage
- JWT authentication
- bcrypt encryption

**Frontend:**
- React 18 + Vite
- Modern CSS (Glassmorphism)
- Fetch API
- LocalStorage

---

## 📝 License

This project is developed for educational purposes.

---

## 👨‍💻 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Made with ❤️ for 11th grade math students**
