import express from 'express';
import { readQuestions, writeQuestions, getNextId, readTeachers } from '../database.js';
import { authenticateToken } from '../middleware.js';

const router = express.Router();

// Tüm soruları listele (JWT korumalı)
router.get('/', authenticateToken, (req, res) => {
    try {
        const questions = readQuestions();
        const teachers = readTeachers();

        // Soru oluşturan öğretmen isimlerini ekle
        const questionsWithCreator = questions.map(q => {
            const creator = teachers.find(t => t.id === q.created_by);
            return {
                ...q,
                creator_name: creator ? creator.name : 'Bilinmiyor'
            };
        });

        res.json({ questions: questionsWithCreator });
    } catch (error) {
        console.error('Get questions error:', error);
        res.status(500).json({ error: 'Sorular alınırken hata oluştu.' });
    }
});

// Soru detayı getir (JWT korumalı)
router.get('/:id', authenticateToken, (req, res) => {
    try {
        const questions = readQuestions();
        const question = questions.find(q => q.id === parseInt(req.params.id));

        if (!question) {
            return res.status(404).json({ error: 'Soru bulunamadı.' });
        }

        res.json({ question });
    } catch (error) {
        console.error('Get question error:', error);
        res.status(500).json({ error: 'Soru alınırken hata oluştu.' });
    }
});

// Yeni soru ekle (JWT korumalı)
router.post('/', authenticateToken, (req, res) => {
    const {
        question_text,
        topic,
        difficulty,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_answer,
        hint
    } = req.body;

    // Validasyon
    if (!question_text || !topic || !difficulty || !option_a || !option_b || !option_c || !option_d || !correct_answer) {
        return res.status(400).json({ error: 'Tüm zorunlu alanlar doldurulmalıdır.' });
    }

    if (!['trigonometri', 'analitik-geometri'].includes(topic)) {
        return res.status(400).json({ error: 'Geçersiz konu. (trigonometri veya analitik-geometri)' });
    }

    if (!['kolay', 'orta', 'zor'].includes(difficulty)) {
        return res.status(400).json({ error: 'Geçersiz zorluk seviyesi. (kolay, orta, zor)' });
    }

    if (!['A', 'B', 'C', 'D'].includes(correct_answer)) {
        return res.status(400).json({ error: 'Doğru cevap A, B, C veya D olmalıdır.' });
    }

    try {
        const questions = readQuestions();

        const newQuestion = {
            id: getNextId(questions),
            question_text,
            topic,
            difficulty,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_answer,
            hint: hint || null,
            created_by: req.user.id,
            created_at: new Date().toISOString()
        };

        questions.push(newQuestion);
        writeQuestions(questions);

        res.status(201).json({
            message: 'Soru başarıyla eklendi!',
            question: newQuestion
        });
    } catch (error) {
        console.error('Create question error:', error);
        res.status(500).json({ error: 'Soru eklenirken hata oluştu.' });
    }
});

// Soru güncelle (JWT korumalı)
router.put('/:id', authenticateToken, (req, res) => {
    const {
        question_text,
        topic,
        difficulty,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_answer,
        hint
    } = req.body;

    try {
        const questions = readQuestions();
        const questionIndex = questions.findIndex(q => q.id === parseInt(req.params.id));

        if (questionIndex === -1) {
            return res.status(404).json({ error: 'Soru bulunamadı.' });
        }

        // Validasyon
        if (topic && !['trigonometri', 'analitik-geometri'].includes(topic)) {
            return res.status(400).json({ error: 'Geçersiz konu.' });
        }

        if (difficulty && !['kolay', 'orta', 'zor'].includes(difficulty)) {
            return res.status(400).json({ error: 'Geçersiz zorluk seviyesi.' });
        }

        if (correct_answer && !['A', 'B', 'C', 'D'].includes(correct_answer)) {
            return res.status(400).json({ error: 'Doğru cevap A, B, C veya D olmalıdır.' });
        }

        // Güncelle
        questions[questionIndex] = {
            ...questions[questionIndex],
            question_text: question_text || questions[questionIndex].question_text,
            topic: topic || questions[questionIndex].topic,
            difficulty: difficulty || questions[questionIndex].difficulty,
            option_a: option_a || questions[questionIndex].option_a,
            option_b: option_b || questions[questionIndex].option_b,
            option_c: option_c || questions[questionIndex].option_c,
            option_d: option_d || questions[questionIndex].option_d,
            correct_answer: correct_answer || questions[questionIndex].correct_answer,
            hint: hint !== undefined ? hint : questions[questionIndex].hint
        };

        writeQuestions(questions);

        res.json({
            message: 'Soru başarıyla güncellendi!',
            question: questions[questionIndex]
        });
    } catch (error) {
        console.error('Update question error:', error);
        res.status(500).json({ error: 'Soru güncellenirken hata oluştu.' });
    }
});

// Soru sil (JWT korumalı)
router.delete('/:id', authenticateToken, (req, res) => {
    try {
        const questions = readQuestions();
        const questionIndex = questions.findIndex(q => q.id === parseInt(req.params.id));

        if (questionIndex === -1) {
            return res.status(404).json({ error: 'Soru bulunamadı.' });
        }

        questions.splice(questionIndex, 1);
        writeQuestions(questions);

        res.json({ message: 'Soru başarıyla silindi!' });
    } catch (error) {
        console.error('Delete question error:', error);
        res.status(500).json({ error: 'Soru silinirken hata oluştu.' });
    }
});

export default router;
