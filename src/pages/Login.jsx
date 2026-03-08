import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, getProfile } from '../services/api';
import { useAuth } from '../AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
        const tokenResponse = await login(formData);
        localStorage.setItem('access_token', tokenResponse.data.access);
        const profileResponse = await getProfile();
        loginUser(tokenResponse.data, profileResponse.data);
        navigate('/');
    } catch (err) {
        setError('Invalid username or password');
    } finally {
        setLoading(false);
    }
};

    return (
        <div>
            <h2>Login to F8 Autos</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
    );
};

export default Login;