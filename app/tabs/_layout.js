import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="register"
        options={{
          title: "Registrarse",
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: "Loguearse",
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: "Users",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil de usuario",
        }}
      />
    </Tabs>
  );
}
