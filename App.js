import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainTabNavigator from "./navigation/MainTabNavigator";
import LoginScreen from "./screens/LoginScreen";
import { createStackNavigator } from "@react-navigation/stack";
import PayPostScreen from "./screens/PayPostScreen";
import CartScreen from "./screens/CartScreen";
import SearchScreen from "./screens/SearchScreen";
import RootNavigator from "./navigation/RootNavigator";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

/*
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
*/

/*
export default function App() {
  return (
    <NavigationContainer>
      <MainTabNavigator />
    </NavigationContainer>
  );
}
*/

/*
export default function App() {
  return <PayPostScreen />;
}*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
