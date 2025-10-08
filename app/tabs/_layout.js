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
        name='informacion/[id]'
        options={{
          title: 'Informacion',
        }}
      />
    </Tabs>
  );
}
