import { useState, useEffect } from 'react';
import { getServices } from '../services/api';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        getServices()
            .then(response => {
                setServices(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load services');
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading services...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Our Services</h2>
            {services.length === 0 ? (
                <p>No services available at the moment.</p>
            ) : (
                <div>
                    {services.map(service => (
                        <div key={service.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                            <h3>{service.name}</h3>
                            <p>{service.description}</p>
                            <p>Price: £{service.price}</p>
                            <p>Duration: {service.duration_minutes} minutes</p>
                            {user ? (
                                <button onClick={() => navigate(`/bookings/create/${service.id}`)}>
                                    Book Now
                                </button>
                            ) : (
                                <button onClick={() => navigate('/login')}>
                                    Login to Book
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Services;