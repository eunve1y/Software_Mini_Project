import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createHoneyTipPost } from "../services/api"; // 게시물 작성 API 함수

export default function WriteCommunityPostScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  // 게시물 등록 함수 (백엔드로 전송)
  const submitPost = async () => {
    if (!title || !content) {
      Alert.alert("입력 오류", "제목과 내용을 입력해주세요.");
      return;
    }

    try {
      // AsyncStorage에서 userId 가져오기
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        Alert.alert(
          "로그인 오류",
          "사용자 정보를 가져올 수 없습니다. 다시 로그인 해주세요."
        );
        return;
      }

      // 게시물 생성 API 호출
      const response = await createHoneyTipPost(title, content);

      console.log("게시물 등록 응답:", response);

      if (response) {
        Alert.alert("성공", "게시물이 등록되었습니다.");
        navigation.navigate("Community"); // 등록 후 커뮤니티 화면으로 돌아가기
      }
    } catch (error) {
      console.error("게시물 등록 실패:", error);
      Alert.alert("오류", "게시물 등록 중 오류가 발생했습니다.");
    }
  };

  // 사진 선택 함수
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
      alert("사진이 선택되었습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        placeholder="제목을 입력해주세요."
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.contentInput}
        placeholder="본문을 입력해주세요."
        value={content}
        onChangeText={setContent}
        multiline={true}
      />

      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

      <TouchableOpacity style={styles.submitButton} onPress={submitPost}>
        <Text style={styles.submitButtonText}>등록</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={pickImage}>
        <Ionicons name="image-outline" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    padding: 20,
  },
  titleInput: {
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },
  contentInput: {
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    minHeight: 100,
    textAlignVertical: "top",
  },
  imagePreview: {
    marginTop: 20,
    width: "100%",
    height: 200,
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
    resizeMode: "cover",
  },
  submitButton: {
    backgroundColor: "#FFA500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
