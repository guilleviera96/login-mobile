import { useCallback, useState } from 'react';
import api from '../api/api';
import { obtenerFavoritos, eliminarFavorito } from '../utils/favoritosActions';

export function useFavorites() {
  const [favData, setFavData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    try {
      const ids = await obtenerFavoritos();
      const normalized = ids.map(Number).filter((x) => !Number.isNaN(x));

      if (normalized.length === 0) {
        setFavData([]);
        return;
      }

      const data = await Promise.all(
        normalized.map((id) => api.get(`/shows/${id}`).then((res) => res.data))
      );
      setFavData(data);
    } catch (error) {
      console.error('Error cargando favoritos:', error);
      setFavData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeFavorite = useCallback(async (id) => {
    await eliminarFavorito(id);
    setFavData((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return { favData, loading, loadFavorites, removeFavorite };
}
