import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';

export default function Layout() {
    return (
        <>
            <Stack
                screenOptions={{
                    headerStyle:
                     { backgroundColor: '#fbfb9eff',
                      }, 
                    headerTintColor: '#000000ff',                      
                    headerTitleAlign: 'left',     
                    headerTitleStyle: {
                        fontSize: 24,
                        fontWeight: 'bold'
                    }

                }}
            >
                {/* titulos de cada pantalla */}
                <Stack.Screen name="login" options={{ title: 'Login' }} />
                <Stack.Screen name="register" options={{ title: 'Registro' }} />
                <Stack.Screen name="profile" options={{ title: 'Mi Perfil' }} />
            </Stack>
            <StatusBar style="auto" />
        </>
    );

}

