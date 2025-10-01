import { useEffect, useState } from 'react';
import axios from 'axios';

export const useMovieList = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await axios.get('https://api.tvmaze.com/shows'); // sin filtro
                const data = response.data.map(show => ({
                    id: show.id,
                    title: show.name,
                    rating: show.rating?.average || 'Sin calificación',
                    image: show.image?.medium || 'https://via.placeholder.com/210x295?text=Sin+Imagen',
                }));

                setItems(data);
            } catch (error) {
                console.error('Error al cargar la lista:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchList();
    }, []);

    return { items, loading };
};