import express from 'express';
import { readQuestions } from '../database.js';

const router = express.Router();

// Oyun için soruları çek (Public - JWT gerekmez)
router.get('/questions', (req, res) => {
    const { topic, difficulty, limit } = req.query;

    try {
        let questions = readQuestions();

        // Filtreler
        if (topic) {
            questions = questions.filter(q => q.topic === topic);
        }

        if (difficulty) {
            questions = questions.filter(q => q.difficulty === difficulty);
        }

        // Rastgele sırala
        questions = questions.sort(() => Math.random() - 0.5);

        // Limit uygula
        const limitValue = parseInt(limit) || 10;
        questions = questions.slice(0, limitValue);

        res.json({
            count: questions.length,
            questions: questions.map(q => ({
                id: q.id,
                question: q.question_text,
                topic: q.topic,
                difficulty: q.difficulty,
                options: {
                    A: q.option_a,
                    B: q.option_b,
                    C: q.option_c,
                    D: q.option_d
                },
                correctAnswer: q.correct_answer,
                hint: q.hint
            }))
        });
    } catch (error) {
        console.error('Get game questions error:', error);
        res.status(500).json({ error: 'Sorular alınırken hata oluştu.' });
    }
});

// İstatistikler (Public)
router.get('/stats', (req, res) => {
    try {
        const questions = readQuestions();

        const totalQuestions = questions.length;
        const byTopic = {};
        const byDifficulty = {};

        questions.forEach(q => {
            byTopic[q.topic] = (byTopic[q.topic] || 0) + 1;
            byDifficulty[q.difficulty] = (byDifficulty[q.difficulty] || 0) + 1;
        });

        res.json({
            total: totalQuestions,
            byTopic,
            byDifficulty
        });
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({ error: 'İstatistikler alınırken hata oluştu.' });
    }
});

export default router;
