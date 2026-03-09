import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Cars from './pages/Cars';
import Services from './pages/Services';
import Bookings from './pages/Bookings';
import CreateBooking from './pages/CreateBooking';

const Navbar = () => {
    const { user, logoutUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    return (
        <nav style={{
            background: '#1a1a1a',
            padding: '15px 30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>F8 Auto </Link>
            </div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <Link to="/cars" style={{ color: 'white', textDecoration: 'none' }}>Cars For Sale</Link>
                <Link to="/services" style={{ color: 'white', textDecoration: 'none' }}>Services</Link>
                {user ? (
                    <>
                        <Link to="/bookings" style={{ color: 'white', textDecoration: 'none' }}>My Bookings</Link>
                        <span style={{ color: '#ccc' }}>Hi, {user.username}!</span>
                        <button
                            onClick={handleLogout}
                            style={{
                                background: '#e74c3c',
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
                        <Link to="/register" style={{
                            background: '#e67e22',
                            color: 'white',
                            textDecoration: 'none',
                            padding: '8px 16px',
                            borderRadius: '4px',
                        }}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

const App = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/cars" element={<Cars />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/bookings" element={<Bookings />} />
                    <Route path="/bookings/create/:serviceId" element={<CreateBooking />} />
                    <Route path="/" element={<h2>Welcome to F8 Autos</h2>} />
                </Routes>
            </div>
        </div>
    );
};

export default App;