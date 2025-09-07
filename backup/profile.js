import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function Profile() {
    const { username, name } = useLocalSearchParams();

    return (
        // render de datos
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>Usuario: </Text>
                <Text style={styles.value}>{username}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Nombre: </Text>
                <Text style={styles.value}>{name}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  row: { flexDirection: 'row'},
  label: { fontSize: 24, fontWeight: 'bold', margin: 2 },
  value: { fontSize: 24, fontWeight: 'normal', margin: 2}
});
