import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CustomButton({ title, onPress }) {
  return (
    <TouchableOpacity style={[styles.button, styles.bgColor]} onPress={onPress}>
      <Text style={[styles.text, styles.txtColor]}>{title}</Text>
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
  bgColor: {
    backgroundColor: '#fbfb9eff',
  },
  txtColor: {
    color: "#000000",
  }
});