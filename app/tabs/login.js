import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import { findUser } from '../../utils/userStore';
// import useAuth from '../../hooks/useAuth';
export default function Login() {
    // const {login, token, loading, error} = useAuth()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [login, loading, error] = useAuth(false);
    const router = useRouter();

    const handleLogin = () => {
        if (!username.trim() || !password.trim()) {
            // login({ username, password })
            alert("Completa usuario ycontraseña");
            return;
        }
        const user = findUser(username, password);
        if (!user) {
            alert("Usuario o contraseña incorrectos");
            return;
        }
        // login({ username, password })
        //     .then((data) => {
        //         alert(`Bienvenido ${data.user.name}`);
        //         router.push({ pathname: '/profile', params: { username: user.username, name: user.name } });
        //     })
        //     .catch((err) => {
        //         alert(err.message);
        //     });
    };


    //func para navegar a registro
    const goToRegister = () => {
        router.push('/register');
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
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <CustomButton
                title="Ingresar"
                onPress={handleLogin}
                color='#fbfb9eff'
                textColor="#000000"
            />

            {/* btn para ir a registrarse */}
            <TouchableOpacity onPress={goToRegister} style={styles.registerLink}>
                <Text style={styles.registerText}>Registrarse</Text>
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