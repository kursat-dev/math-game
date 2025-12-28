import { useState, useEffect } from 'react';
import QuestionList from './QuestionList';
import QuestionForm from './QuestionForm';
import API_URL from '../config';

export default function Dashboard({ teacher, onLogout }) {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [stats, setStats] = useState({ total: 0, byTopic: {}, byDifficulty: {} });

    useEffect(() => {
        fetchQuestions();
        fetchStats();
    }, []);

    const fetchQuestions = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/questions`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Sorular yüklenemedi');

            const data = await response.json();
            setQuestions(data.questions);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await fetch(`${API_URL}/game/stats`);
            const data = await response.json();
            setStats(data);
        } catch (err) {
            console.error('Stats error:', err);
        }
    };

    const handleAddQuestion = async (formData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/questions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Soru eklenemedi');
            }

            setSuccess('Soru başarıyla eklendi!');
            setShowModal(false);
            fetchQuestions();
            fetchStats();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.message);
            setTimeout(() => setError(''), 3000);
        }
    };

    const handleUpdateQuestion = async (formData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/questions/${editingQuestion.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Soru güncellenemedi');
            }

            setSuccess('Soru başarıyla güncellendi!');
            setShowModal(false);
            setEditingQuestion(null);
            fetchQuestions();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.message);
            setTimeout(() => setError(''), 3000);
        }
    };

    const handleDeleteQuestion = async (id) => {
        if (!confirm('Bu soruyu silmek istediğinizden emin misiniz?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/questions/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Soru silinemedi');

            setSuccess('Soru başarıyla silindi!');
            fetchQuestions();
            fetchStats();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.message);
            setTimeout(() => setError(''), 3000);
        }
    };

    const handleEdit = (question) => {
        setEditingQuestion(question);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingQuestion(null);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Yükleniyor...</p>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', padding: '2rem' }}>
            {/* Header */}
            <div className="glass-card mb-lg">
                <div className="flex-between">
                    <div>
                        <h1 style={{ marginBottom: '0.5rem' }}>📊 Matematik Oyunu Admin</h1>
                        <p style={{ color: 'var(--text-muted)' }}>
                            Hoş geldiniz, <strong>{teacher.name}</strong>
                        </p>
                    </div>
                    <button className="btn btn-danger" onClick={onLogout}>
                        Çıkış Yap
                    </button>
                </div>
            </div>

            {/* Alerts */}
            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            {/* Stats */}
            <div className="grid grid-3 mb-lg">
                <div className="glass-card text-center">
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📝</div>
                    <h2>{stats.total}</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Toplam Soru</p>
                </div>
                <div className="glass-card text-center">
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📐</div>
                    <h2>{stats.byTopic?.['trigonometri'] || 0}</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Trigonometri</p>
                </div>
                <div className="glass-card text-center">
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📈</div>
                    <h2>{stats.byTopic?.['analitik-geometri'] || 0}</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Analitik Geometri</p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex-between mb-lg">
                <h2>Sorular</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowModal(true)}
                >
                    ➕ Yeni Soru Ekle
                </button>
            </div>

            {/* Questions List */}
            <QuestionList
                questions={questions}
                onEdit={handleEdit}
                onDelete={handleDeleteQuestion}
            />

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingQuestion ? 'Soru Düzenle' : 'Yeni Soru Ekle'}</h2>
                            <button
                                onClick={handleCloseModal}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--text-primary)',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer'
                                }}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="modal-body">
                            <QuestionForm
                                question={editingQuestion}
                                onSubmit={editingQuestion ? handleUpdateQuestion : handleAddQuestion}
                                onCancel={handleCloseModal}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
