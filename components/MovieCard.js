import { Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const MovieCard = ({ id, title, rating, image }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        console.log(`/informacion/${id}`);
        router.push(`/informacion/${id}`);
      }}

      style={{ marginBottom: 24, alignItems: 'center' }}
    >
      <Image
        source={{ uri: image }}
        style={{ width: 210, height: 295, borderRadius: 8 }}
        resizeMode="cover"
      />
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 8 }}>{title}</Text>
      <Text style={{ fontSize: 20, color: 'black' }}> {rating}</Text>
      <Text style={{ fontSize: 20, color: '#50b4a3ff', fontWeight: 'bold', marginTop: 4 }}>
        Ver más
      </Text>
    </TouchableOpacity>
  );
};

export default MovieCard;