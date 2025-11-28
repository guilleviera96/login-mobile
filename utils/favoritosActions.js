// utils/favoritosActions.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITOS_KEY = 'favoritos';

export const agregarFavoritos = async (id) => {
  const numericId = Number(id);
  if (Number.isNaN(numericId)) return;

  try {
    const guardado = await AsyncStorage.getItem(FAVORITOS_KEY);
    const favoritos = guardado ? JSON.parse(guardado) : [];
    if (!favoritos.includes(numericId)) {
      const actualizado = [...favoritos, numericId];
      await AsyncStorage.setItem(FAVORITOS_KEY, JSON.stringify(actualizado));
    }
  } catch (error) {
    console.error('Error al guardar en favoritos:', error);
  }
};

export const eliminarFavorito = async (id) => {
  const numericId = Number(id);
  if (Number.isNaN(numericId)) return;

  try {
    const guardado = await AsyncStorage.getItem(FAVORITOS_KEY);
    const favoritos = guardado ? JSON.parse(guardado) : [];
    const actualizado = favoritos.filter((favId) => favId !== numericId);
    await AsyncStorage.setItem(FAVORITOS_KEY, JSON.stringify(actualizado));
  } catch (error) {
    console.error('Error al eliminar favorito:', error);
  }
};

export const obtenerFavoritos = async () => {
  try {
    const guardado = await AsyncStorage.getItem(FAVORITOS_KEY);
    const ids = guardado ? JSON.parse(guardado) : [];
    return ids.map((x) => Number(x)).filter((x) => !Number.isNaN(x));
  } catch (error) {
    console.error('Error al obtener listado de favoritos:', error);
    return [];
  }
};
