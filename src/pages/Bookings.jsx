import { useState, useEffect } from 'react';
import { getBookings } from '../services/api';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        getBookings()
            .then(response => {
                setBookings(Array.isArray(response.data) ? response.data : response.data.results || []);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load bookings');
                setLoading(false);
            });
    }, [user, navigate]);

    if (loading) return <p>Loading bookings...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>My Bookings</h2>
            {bookings.length === 0 ? (
                <p>You have no bookings yet. <a href="/services">Browse our services</a> to make one!</p>
            ) : (
                <div>
                    {bookings.map(booking => (
                        <div key={booking.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                            <h3>Booking #{booking.id}</h3>
                            <p>Date: {booking.booking_date}</p>
                            <p>Time: {booking.booking_time}</p>
                            <p>Status: <strong>{booking.status}</strong></p>
                            {booking.notes && <p>Notes: {booking.notes}</p>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Bookings;