import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import api from '../../api/api';



export default function Informacion() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        const response = await api.get(`/shows/${id}`);
        setData(response.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color='#50b4a3ff' />
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
      <Text style={styles.rating}>Calificacion: {data.rating?.average || 'Sin calificación'}</Text>
      <Text style={styles.genres}>{data.genres.join(' - ')}</Text>

      {/* eliminar etiquetas html */}
      <Text style={styles.summary}>{data.summary}</Text>
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
    fontWeight: '455',
    color: '#50b4a3ff',
    marginBottom: 8,
  },
  summary: {
    fontSize: 20,
    fontWeight: '450',
    lineHeight: 20,
    textAlign: 'justify',
  },
});