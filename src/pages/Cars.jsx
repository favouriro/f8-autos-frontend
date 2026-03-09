import { useState, useEffect } from 'react';
import { getCars } from '../services/api';

const Cars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getCars()
            .then(response => {
                setCars(Array.isArray(response.data) ? response.data : response.data.results || []);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load cars');
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading cars...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Cars For Sale</h2>
            {cars.length === 0 ? (
                <p>No cars available at the moment.</p>
            ) : (
                <div>
                    {cars.map(car => (
                        <div key={car.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                            <h3>{car.year} {car.make} {car.model}</h3>
                            <p>Price: £{car.price}</p>
                            <p>Mileage: {car.mileage} miles</p>
                            <p>Condition: {car.condition}</p>
                            <p>{car.description}</p>
                            {car.is_available ? (
                                <p style={{ color: 'green' }}>Available</p>
                            ) : (
                                <p style={{ color: 'red' }}>Sold</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cars;