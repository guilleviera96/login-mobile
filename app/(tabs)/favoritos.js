import { useState, useCallback } from 'react';
import { FlatList, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect } from 'expo-router';
import api from '../../api/api';
import { obtenerFavoritos } from '../../utils/favoritosActions';
import MovieCard from '../../components/MovieCard';

export default function FavoritosScreen() {
  const [favData, setFavData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    try {
      const ids = await obtenerFavoritos();
      const normalized = ids.map((x) => Number(x)).filter((x) => !Number.isNaN(x));

      if (normalized.length === 0) {
        setFavData([]);
        setLoading(false);
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

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Cargando favoritos...</Text>
      </View>
    );
  }

  if (favData.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No hay favoritos aún</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favData}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <MovieCard
          id={item.id}
          title={item.name}
          rating={item.rating?.average}
          image={item.image?.medium}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20,
  },
  list: {
    paddingVertical: 16, alignItems: 'center', gap: 12,
  },
});
