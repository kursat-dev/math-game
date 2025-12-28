export default function QuestionList({ questions, onEdit, onDelete }) {
    if (questions.length === 0) {
        return (
            <div className="glass-card text-center" style={{ padding: '3rem' }}>
                <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</p>
                <h3>Henüz soru eklenmemiş</h3>
                <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                    Yeni bir soru ekleyerek başlayın!
                </p>
            </div>
        );
    }

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Soru</th>
                        <th>Konu</th>
                        <th>Zorluk</th>
                        <th>Doğru Cevap</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((q, index) => (
                        <tr key={q.id}>
                            <td>{index + 1}</td>
                            <td style={{ maxWidth: '300px' }}>
                                <div style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {q.question_text}
                                </div>
                            </td>
                            <td>
                                <span className={`badge badge-${q.topic}`}>
                                    {q.topic === 'trigonometri' ? 'Trigonometri' : 'Analitik Geometri'}
                                </span>
                            </td>
                            <td>
                                <span className={`badge badge-${q.difficulty}`}>
                                    {q.difficulty}
                                </span>
                            </td>
                            <td>
                                <strong style={{ color: 'var(--success)' }}>{q.correct_answer}</strong>
                            </td>
                            <td>
                                <div className="flex gap-sm">
                                    <button
                                        className="btn btn-primary"
                                        style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                                        onClick={() => onEdit(q)}
                                    >
                                        ✏️ Düzenle
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                                        onClick={() => onDelete(q.id)}
                                    >
                                        🗑️ Sil
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
