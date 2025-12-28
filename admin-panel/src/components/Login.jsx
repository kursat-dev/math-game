import { useState } from 'react';
import API_URL from '../config';

export default function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Giriş başarısız');
            }

            // Token'ı kaydet
            localStorage.setItem('token', data.token);
            localStorage.setItem('teacher', JSON.stringify(data.teacher));

            onLoginSuccess(data.teacher);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-center" style={{ minHeight: '100vh', padding: '1rem' }}>
            <div className="glass-card" style={{ maxWidth: '420px', width: '100%' }}>
                <div className="text-center mb-lg">
                    <h1 style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        📊 Matematik Oyunu
                    </h1>
                    <p style={{ marginTop: '0.5rem' }}>Öğretmen Admin Panel</p>
                </div>

                {error && (
                    <div className="alert alert-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Kullanıcı Adı</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="ogretmen1"
                            required
                            autoFocus
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Şifre</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                        disabled={loading}
                    >
                        {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                    </button>
                </form>

                <div className="mt-lg text-center" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    <p>Varsayılan Giriş:</p>
                    <p><strong>Kullanıcı:</strong> ogretmen1</p>
                    <p><strong>Şifre:</strong> sifre123</p>
                </div>
            </div>
        </div>
    );
}
