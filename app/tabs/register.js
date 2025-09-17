import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from 'expo-router';
// import { addUser } from '../utils/userStore';
import useAuth from '../../hooks/useAuth';

export default function Register() {
    const { register, loading, error } = useAuth();
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRegister = () => {
        // if (!username.trim() || !name.trim() || !password.trim()) {
        //     alert("Complete todos los campos");
        //     return;
        // }
        // addUser({ username, name, password });
        console.log(`Nombre: ${name}, Usuario: ${username}, Pass: ${password}`);

        register({ username, name, password });
        console.log(username, name, password);
        alert(`Usuario registrado: ${username}`);

        // router.push('login');
        navigation.navigate('login');
    };

    const goToLogin = () => {
        router.push('/login');
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Usuario"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <TextInput
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <CustomButton
                title="Registrarse"
                onPress={handleRegister}
            />

            {/* btn para volver al login */}
            <TouchableOpacity onPress={goToLogin} style={styles.registerLink}>
                <Text style={styles.registerText}>Iniciar sesion</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 10 },
    input: { margin: 10, borderWidth: 3, padding: 8, borderRadius: 30, height: 65 },
    registerLink: { marginTop: 15, alignItems: 'center' },
    registerText: { color: '#000000ff', fontWeight: 'bold', fontSize: 18 }
});