//은영
// RootNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/SplashScreen"; // 스플래쉬 화면
import LoginMainScreen from "../screens/LoginMainScreen"; // 로그인 메인 화면
import LoginScreen from "../screens/LoginScreen"; // 실제 로그인 화면
import RegisterScreen from "../screens/RegisterScreen"; // 회원가입 화면
import MainTabNavigator from "./MainTabNavigator"; // 메인 네비게이터 (로그인 후 이동)

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      {/* 스플래쉬 화면 */}
      <Stack.Screen name="Splash" component={SplashScreen} />

      {/* 로그인/가입 선택 화면 */}
      <Stack.Screen name="LoginMain" component={LoginMainScreen} />

      {/* 실제 로그인 화면 */}
      <Stack.Screen name="Login" component={LoginScreen} />

      {/* 회원가입 화면 */}
      <Stack.Screen name="Register" component={RegisterScreen} />

      {/* 로그인 후 메인 네비게이터 */}
      <Stack.Screen name="Main" component={MainTabNavigator} />
    </Stack.Navigator>
  );
}
