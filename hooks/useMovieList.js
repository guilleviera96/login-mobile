import { useEffect, useState } from 'react';
import api from '../api/api';

export const useMovieList = () => {

    // //shows
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showsById, setShowsById] = useState(null);
    //obtengo la lista de peliculas 
    const getAllShows = async () => {
        try {
            const response = await api.get('/shows');
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
    const getShowById = async (id) => {
        try {
            const response = await api.get(`/shows/${id}`);
            setShowsById(response.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        getAllShows();

    }, []);

    return { getAllShows, getShowById, showsById, items, loading };
};