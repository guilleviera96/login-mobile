import { useCallback } from 'react';
import { FlatList, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect } from 'expo-router';
import MovieCard from '../../components/MovieCard';
import { useFavorites } from '../../hooks/useFavorites';
export default function FavoritosScreen() {
  const { favData, loading, loadFavorites, removeFavorite } = useFavorites();

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
          onRemoveFavorite={removeFavorite}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  list: { paddingVertical: 16, alignItems: 'center', gap: 12 },
});
