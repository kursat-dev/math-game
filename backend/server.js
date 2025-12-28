import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import questionsRoutes from './routes/questions.js';
import gameRoutes from './routes/game.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // CORS - farklı domain'lerden isteklere izin ver
app.use(express.json()); // JSON body parser

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionsRoutes);
app.use('/api/game', gameRoutes);

// Ana sayfa - API bilgisi
app.get('/', (req, res) => {
    res.json({
        message: '11. Sınıf Matematik Oyunu - Backend API',
        version: '1.0.0',
        endpoints: {
            auth: {
                login: 'POST /api/auth/login',
                register: 'POST /api/auth/register'
            },
            questions: {
                list: 'GET /api/questions (JWT gerekli)',
                get: 'GET /api/questions/:id (JWT gerekli)',
                create: 'POST /api/questions (JWT gerekli)',
                update: 'PUT /api/questions/:id (JWT gerekli)',
                delete: 'DELETE /api/questions/:id (JWT gerekli)'
            },
            game: {
                getQuestions: 'GET /api/game/questions?topic=&difficulty=&limit=',
                getStats: 'GET /api/game/stats'
            }
        },
        defaultCredentials: {
            username: 'ogretmen1',
            password: 'sifre123'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint bulunamadı.' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Sunucu hatası!' });
});

// Server başlat
app.listen(PORT, () => {
    console.log('');
    console.log('======================================');
    console.log('🚀 Matematik Oyunu Backend API');
    console.log('======================================');
    console.log(`📡 Server: http://localhost:${PORT}`);
    console.log('');
    console.log('📚 Endpoints:');
    console.log('   Auth:      /api/auth/*');
    console.log('   Questions: /api/questions/*');
    console.log('   Game:      /api/game/*');
    console.log('');
    console.log('👤 Varsayılan Giriş:');
    console.log('   Kullanıcı: ogretmen1');
    console.log('   Şifre:     sifre123');
    console.log('======================================');
    console.log('');
});
