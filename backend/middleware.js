import jwt from 'jsonwebtoken';

const JWT_SECRET = 'math-game-secret-key-2024'; // Production'da environment variable kullanın

// JWT token doğrulama middleware'i
export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ error: 'Token bulunamadı. Lütfen giriş yapın.' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Geçersiz veya süresi dolmuş token.' });
        }

        req.user = user; // Token'dan gelen kullanıcı bilgisi
        next();
    });
}

export { JWT_SECRET };
