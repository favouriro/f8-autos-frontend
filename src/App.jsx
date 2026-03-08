import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
    return (
        <div>
            <h1>F8 Autos</h1>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<h2>Welcome to F8 Autos</h2>} />
            </Routes>
        </div>
    );
};

export default App;

