import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { readTeachers, writeTeachers, getNextId } from '../database.js';
import { JWT_SECRET } from '../middleware.js';

const router = express.Router();

// Öğretmen girişi
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Kullanıcı adı ve şifre gereklidir.' });
    }

    try {
        const teachers = readTeachers();
        const teacher = teachers.find(t => t.username === username);

        if (!teacher) {
            return res.status(401).json({ error: 'Kullanıcı adı veya şifre hatalı.' });
        }

        // Şifreyi kontrol et
        const isPasswordValid = bcrypt.compareSync(password, teacher.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Kullanıcı adı veya şifre hatalı.' });
        }

        // JWT token oluştur
        const token = jwt.sign(
            { id: teacher.id, username: teacher.username, name: teacher.name },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Giriş başarılı!',
            token,
            teacher: {
                id: teacher.id,
                username: teacher.username,
                name: teacher.name
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Sunucu hatası. Lütfen tekrar deneyin.' });
    }
});

// Yeni öğretmen kaydı (opsiyonel)
router.post('/register', (req, res) => {
    const { username, password, name } = req.body;

    if (!username || !password || !name) {
        return res.status(400).json({ error: 'Tüm alanlar gereklidir.' });
    }

    try {
        const teachers = readTeachers();

        // Kullanıcı adı kontrolü
        const existingTeacher = teachers.find(t => t.username === username);

        if (existingTeacher) {
            return res.status(409).json({ error: 'Bu kullanıcı adı zaten kullanılıyor.' });
        }

        // Şifreyi hashle
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Yeni öğretmen oluştur
        const newTeacher = {
            id: getNextId(teachers),
            username,
            password_hash: hashedPassword,
            name,
            created_at: new Date().toISOString()
        };

        teachers.push(newTeacher);
        writeTeachers(teachers);

        res.status(201).json({
            message: 'Kayıt başarılı!',
            teacher: {
                id: newTeacher.id,
                username: newTeacher.username,
                name: newTeacher.name
            }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Sunucu hatası. Lütfen tekrar deneyin.' });
    }
});

export default router;
