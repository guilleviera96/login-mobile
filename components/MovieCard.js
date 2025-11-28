import { Text, Image, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import {
  agregarFavoritos,
  eliminarFavorito,
  obtenerFavoritos,
} from "../utils/favoritosActions";
import { useEffect, useState } from "react";
import mostrarRating from "../functions/mostrarRating";
const MovieCard = ({ id, title, rating, image, onRemoveFavorite }) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      const favoritos = await obtenerFavoritos();
      setIsFavorite(favoritos.includes(id));
    };
    checkFavorite();
  }, [id]);

  const toggleFavorite = async () => {
    if (isFavorite) {
      await eliminarFavorito(id);
      setIsFavorite(false);
      if (onRemoveFavorite) onRemoveFavorite(id);
    } else {
      await agregarFavoritos(id);
      setIsFavorite(true);
    }
  };

  return (
    <View style={{ marginBottom: 24, alignItems: "center" }}>
      <TouchableOpacity onPress={() => router.push(`/informacion/${id}`)}>
        <Image
          source={{ uri: image }}
          style={{ width: 300, height: 420, borderRadius: 22.5 }}
          resizeMode="cover"
        />
      </TouchableOpacity>

      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 8 }}>
        {title}
      </Text>
      <Text style={{ fontSize: 20, color: "black" }}>
        {mostrarRating(rating)} ({rating})
      </Text>
      <TouchableOpacity
        onPress={toggleFavorite}
        style={{
          marginTop: 10,
          backgroundColor: isFavorite ? "#df2121ff" : "#50b4a3ff",
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 8,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>
          {isFavorite ? "Quitar de Favoritos" : "Agregar a Favoritos"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieCard;


