import { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './index.css';

export default function App() {
    const [teacher, setTeacher] = useState(null);

    useEffect(() => {
        // Sayfa yüklendiğinde token kontrolü yap
        const token = localStorage.getItem('token');
        const savedTeacher = localStorage.getItem('teacher');

        if (token && savedTeacher) {
            setTeacher(JSON.parse(savedTeacher));
        }
    }, []);

    const handleLoginSuccess = (teacherData) => {
        setTeacher(teacherData);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('teacher');
        setTeacher(null);
    };

    return (
        <div>
            {teacher ? (
                <Dashboard teacher={teacher} onLogout={handleLogout} />
            ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
}
