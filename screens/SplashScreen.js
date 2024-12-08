//은영
// SplashScreen.js
import React, { useEffect } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    // 2초 후에 로그인 메인 화면으로 이동
    const timer = setTimeout(() => {
      navigation.navigate("LoginMain");
    }, 2000);
    return () => clearTimeout(timer); // 타이머 정리
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* 로고 이미지 */}
      <Image source={require("../assets/logo.png")} style={styles.logo} />

      {/* 텍스트는 반드시 Text 컴포넌트로 감싸야 합니다. */}
      <Text style={styles.honeyText}>HoneyWeb</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  logo: {
    width: 300,
    height: 300,
  },
  honeyText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#D4AF37",
    marginTop: 20,
  },
});
