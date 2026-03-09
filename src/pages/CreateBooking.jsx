import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getService, createBooking } from '../services/api';
import { useAuth } from '../AuthContext';

const CreateBooking = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        booking_date: '',
        booking_time: '',
        notes: '',
    });

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        getService(serviceId)
            .then(response => {
                setService(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load service');
                setLoading(false);
            });
    }, [serviceId, user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await createBooking({
                ...formData,
                service: serviceId,
            });
            navigate('/bookings');
        } catch (err) {
            setError('Failed to create booking. Please try again.');
        }
    };

    if (loading) return <p>Loading service details...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Book a Service</h2>
            {service && (
                <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                    <p>Price: £{service.price}</p>
                    <p>Duration: {service.duration_minutes} minutes</p>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Date</label>
                    <input
                        type="date"
                        name="booking_date"
                        value={formData.booking_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Time</label>
                    <input
                        type="time"
                        name="booking_time"
                        value={formData.booking_time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Notes (optional)</label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="3"
                    />
                </div>
                <button type="submit">Confirm Booking</button>
            </form>
        </div>
    );
};

export default CreateBooking;