import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { useMovieList } from '../../hooks/useMovieList';
import mostrarRating from '../../functions/mostrarRating';

export default function Informacion() {
  const { id } = useLocalSearchParams();
  const { getShowById, showsById, loading } = useMovieList();

  useEffect(() => {
    if (!id) return;
    getShowById(id);
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color='#50b4a3ff' />
      </View>
    );
  }

  if (!showsById) {
    return (
      <View style={styles.loader}>
        <Text>Error al buscar informacion</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {showsById.image?.original && (
        <Image
          source={{ uri: showsById.image.original }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <Text style={styles.title}>{showsById.name ?? ''}</Text>
      <Text style={styles.rating}>
        {showsById.rating?.average
          ? `${mostrarRating(showsById.rating.average)} ${showsById.rating.average}`
          : 'Sin calificación'}
      </Text>
      <Text style={styles.genres}>
        {Array.isArray(showsById.genres) ? showsById.genres.join(' - ') : ''}
      </Text>
      <Text style={styles.summary}>
        {typeof showsById.summary === 'string'
          ? showsById.summary.replace(/<[^>]+>/g, '')
          : ''}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginTop: 30,
    gap: 4,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 400,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rating: {
    fontSize: 18,
    color: '#000000ff',
    marginVertical: 5,
  },
  genres: {
    fontSize: 18,
    fontWeight: '400',
    color: '#50b4a3ff',
    marginBottom: 8,
  },
  summary: {
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 20,
    textAlign: 'justify',
  },
});