// 유예린

import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { login } from "../services/api";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    console.log("로그인 시도");
    const response = await login(email, password);

    if (response) {
      navigation.navigate("Main");
    } else {
      Alert.alert("잘못된 아이디 또는 비밀번호를 입력하셨습니다!");
    }
    //navigation.navigate("Main");
  };

  return (
    <View style={styles.main}>
      <View style={styles.lineView} />

      <View style={styles.textContainer}>
        <Text style={styles.text}>안녕하세요,</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.text, styles.honey]}>HoneyWeb</Text>
          <Text style={styles.text}>입니다.</Text>
        </View>
      </View>

      <TextInput
        style={styles.inputBox}
        placeholder="아이디 (이메일)"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.inputBox}
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button style={styles.btn} title="로그인" onPress={handleLogin} />
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
  lineView: {
    borderStyle: "solid",
    borderColor: "rgba(122, 122, 122, 0.18)",
    borderTopWidth: 0.9,
  },
  textContainer: {
    marginVertical: 40,
  },
  text: {
    fontSize: 23,
    letterSpacing: -0.5,
    lineHeight: 35,
    fontWeight: "700",
  },
  honey: {
    color: "#eca226",
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
  btn: {
    borderRadius: 10,
    backgroundColor: "#3a3135",
    borderStyle: "solid",
    width: "100%",
  },
});
