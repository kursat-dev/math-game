# Deployment için gerekli dosyaları kopyala
cp -r game-demo ../public/game-demo 2>/dev/null || :

# Build admin panel
cd admin-panel
npm install
npm run build

# Bilgilendirme
echo "✅ Build tamamlandı!"
echo "📦 Output: admin-panel/dist/"
echo ""
echo "🚀 Vercel'de deploy etmek için:"
echo "   1. Vercel.com'a gidin"
echo "   2. GitHub repo'nuzu import edin"
echo "   3. Root Directory: admin-panel"
echo "   4. Build Command: npm run build"
echo "   5. Output Directory: dist"
echo "   6. Environment Variable ekleyin: VITE_API_URL=<backend-url>/api"
echo ""
echo "📚 Detaylı bilgi için: DEPLOYMENT.md"
