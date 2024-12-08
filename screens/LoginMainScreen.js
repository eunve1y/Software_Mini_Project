//은영
// LoginMainScreen.js
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LoginMainScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>덕우들과 함께 성장하는 정보의 시작!</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.signupButton]}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={[styles.buttonText, styles.signupButtonText]}>
            가입하기
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={[styles.buttonText, styles.loginButtonText]}>
            로그인
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
  },
  button: {
    width: 120,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  signupButton: {
    backgroundColor: "#000000",
  },
  loginButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#000000",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  signupButtonText: {
    color: "#FFFFFF",
  },
  loginButtonText: {
    color: "#000000",
  },
});
