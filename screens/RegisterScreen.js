//은영
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createUser } from "../services/api"; // 회원가입 API 함수

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        Alert.alert("비밀번호 불일치", "비밀번호가 일치하지 않습니다.");
        return;
      }

      const response = await createUser(email, password, nickname);
      if (response) {
        Alert.alert("회원가입 성공", "회원가입이 완료되었습니다.");
        navigation.navigate("Login");
      } else {
        Alert.alert("회원가입 실패", "오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("회원가입 에러:", error);
      Alert.alert("회원가입 실패", "서버 오류가 발생했습니다.");
    }
  };

  return (
    <View style={styles.main}>
      <TextInput
        style={styles.inputBox}
        placeholder="아이디 (이메일)"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.inputBox}
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.inputBox}
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.inputBox}
        placeholder="닉네임"
        value={nickname}
        onChangeText={setNickname}
      />
      <Button title="가입하기" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 95,
  },
  inputBox: {
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    width: "100%",
    height: 40,
    paddingLeft: 20,
    marginBottom: 15,
  },
});
