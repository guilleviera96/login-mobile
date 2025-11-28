import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name='lista'
        options={{
          title: 'Series',
        }}
      />
      <Tabs.Screen
        name='favoritos'
        options={{
          title: 'Favoritos',
        }}
      />
    </Tabs>
  );
}
