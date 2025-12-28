import { useState, useEffect } from 'react';

export default function QuestionForm({ question, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        question_text: '',
        topic: 'trigonometri',
        difficulty: 'kolay',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        correct_answer: 'A',
        hint: ''
    });

    useEffect(() => {
        if (question) {
            setFormData({
                question_text: question.question_text,
                topic: question.topic,
                difficulty: question.difficulty,
                option_a: question.option_a,
                option_b: question.option_b,
                option_c: question.option_c,
                option_d: question.option_d,
                correct_answer: question.correct_answer,
                hint: question.hint || ''
            });
        }
    }, [question]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="question_text">Soru Metni *</label>
                <textarea
                    id="question_text"
                    name="question_text"
                    value={formData.question_text}
                    onChange={handleChange}
                    placeholder="Sorunuzu buraya yazın..."
                    required
                />
            </div>

            <div className="grid grid-2">
                <div className="input-group">
                    <label htmlFor="topic">Konu *</label>
                    <select
                        id="topic"
                        name="topic"
                        value={formData.topic}
                        onChange={handleChange}
                        required
                    >
                        <option value="trigonometri">Trigonometri</option>
                        <option value="analitik-geometri">Analitik Geometri</option>
                    </select>
                </div>

                <div className="input-group">
                    <label htmlFor="difficulty">Zorluk Seviyesi *</label>
                    <select
                        id="difficulty"
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                        required
                    >
                        <option value="kolay">Kolay</option>
                        <option value="orta">Orta</option>
                        <option value="zor">Zor</option>
                    </select>
                </div>
            </div>

            <h3 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--text-primary)' }}>
                Şıklar
            </h3>

            <div className="grid grid-2">
                <div className="input-group">
                    <label htmlFor="option_a">A) *</label>
                    <input
                        id="option_a"
                        name="option_a"
                        type="text"
                        value={formData.option_a}
                        onChange={handleChange}
                        placeholder="Şık A"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="option_b">B) *</label>
                    <input
                        id="option_b"
                        name="option_b"
                        type="text"
                        value={formData.option_b}
                        onChange={handleChange}
                        placeholder="Şık B"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="option_c">C) *</label>
                    <input
                        id="option_c"
                        name="option_c"
                        type="text"
                        value={formData.option_c}
                        onChange={handleChange}
                        placeholder="Şık C"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="option_d">D) *</label>
                    <input
                        id="option_d"
                        name="option_d"
                        type="text"
                        value={formData.option_d}
                        onChange={handleChange}
                        placeholder="Şık D"
                        required
                    />
                </div>
            </div>

            <div className="input-group">
                <label htmlFor="correct_answer">Doğru Cevap *</label>
                <select
                    id="correct_answer"
                    name="correct_answer"
                    value={formData.correct_answer}
                    onChange={handleChange}
                    required
                >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                </select>
            </div>

            <div className="input-group">
                <label htmlFor="hint">İpucu (Opsiyonel)</label>
                <textarea
                    id="hint"
                    name="hint"
                    value={formData.hint}
                    onChange={handleChange}
                    placeholder="Öğrencilere yardımcı olacak bir ipucu ekleyin..."
                    rows="3"
                />
            </div>

            <div className="flex gap-md" style={{ justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-outline" onClick={onCancel}>
                    İptal
                </button>
                <button type="submit" className="btn btn-primary">
                    {question ? 'Güncelle' : 'Ekle'}
                </button>
            </div>
        </form>
    );
}
