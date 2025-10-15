import { ScrollView, View, StyleSheet } from 'react-native';
import { useMovieList } from '../../hooks/useMovieList';
import MovieCard from '../../components/MovieCard';

const Lista = () => {
  const { items: shows } = useMovieList('shows');
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.cardWrapper}>
        {shows.map(item => (
          <MovieCard
            key={item.id}
            id={item.id}
            title={item.title}
            rating={item.rating}
            image={item.image}
          />

        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 16,
  },
  cardWrapper: {
    alignItems: 'center',
    gap: 12,
  },
});


export default Lista;