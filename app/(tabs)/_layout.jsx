import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BLUE = "#3b5bdb";
const INACTIVE = "#b0bbd4";

function TabIcon({ name, focused }) {
  return (
    <View style={styles.tabItem}>
      <Ionicons name={name} size={20} color={focused ? BLUE : INACTIVE} />
    </View>
  );
}

export default function ProtectedLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: BLUE,
        tabBarInactiveTintColor: INACTIVE,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "home" : "home-outline"}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "list" : "list-outline"}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "person" : "person-outline"}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    backgroundColor: "#ffffff",
    borderTopWidth: 0,
    shadowColor: "#3b5bdb",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 12,
    paddingBottom: 0,
    paddingTop: 0,
  },
});
