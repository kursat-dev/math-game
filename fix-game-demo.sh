#!/bin/bash

# Game demo dosyalarını admin-panel/public altına kopyala
echo "📦 Copying game-demo files to admin-panel/public..."
mkdir -p admin-panel/public/game-demo
cp game-demo/* admin-panel/public/game-demo/

# Git'e ekle ve commit yap
echo "✅ Files copied successfully!"
echo ""
echo "🔄 Now committing changes..."
git add admin-panel/public/game-demo
git commit -m "Add game-demo to public folder for Vercel deployment"

echo ""
echo "✅ Changes committed!"
echo ""
echo "🚀 Now push to GitHub:"
echo "   git push"
echo ""
echo "⏳ Vercel will automatically redeploy in ~1 minute"
echo "📍 Then visit: https://math-game-sandy.vercel.app/game-demo/"
