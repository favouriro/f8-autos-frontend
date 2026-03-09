import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Cars from './pages/Cars';
import Services from './pages/Services';

const App = () => {
    return (
        <div>
            <h1>F8 Autos</h1>
            <nav>
                <a href="/">Home</a> |{' '}
                <a href="/cars">Cars For Sale</a> |{' '}
                <a href="/services">Services</a> |{' '}
                <a href="/login">Login</a> |{' '}
                <a href="/register">Register</a>
            </nav>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cars" element={<Cars />} />
                <Route path="/services" element={<Services />} />
                <Route path="/" element={<h2>Welcome to F8 Autos</h2>} />
            </Routes>
        </div>
    );
};

export default App;
