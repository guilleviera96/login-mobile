import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CustomButton({ title, onPress, color = '#1e90ff', textColor = '#fff' }) {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    height: 65,
    margin: 5
  },
  text: {
    fontWeight: 'bold',
    fontSize: 19,
  },
});