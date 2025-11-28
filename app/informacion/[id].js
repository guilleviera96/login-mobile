import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import mostrarRating from './../../functions/mostrarRating';

export default function Informacion() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        setData(response.data);
      } catch (error) {
        console.error('Error al cargar detalles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.loader}>
        <Text>Error al buscar informacion</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: data.image?.original }} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{data.name}</Text>
      <Text style={styles.rating}>
        {data.rating?.average
          ? `${mostrarRating(data.rating.average)} ${data.rating.average}`
          : 'Sin calificación'}
      </Text>
      <Text style={styles.genres}>{data.genres.join(', ')}</Text>
      <Text style={styles.summary}>{data.summary?.replace(/<[^>]+>/g, '')}</Text>
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
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rating: {
    fontSize: 16,
    color: '#666',
    marginVertical: 4,
  },
  genres: {
    fontSize: 14,
    color: '#50b4a3ff',
    marginBottom: 8,
  },
  summary: {
    fontSize: 18,
    lineHeight: 20,
    textAlign: 'justify',
  },
});