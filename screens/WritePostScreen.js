//은영
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { createPost, uploadImage } from "../services/api"; // 게시물 작성 API와 이미지 업로드 API 함수
import AsyncStorage from "@react-native-async-storage/async-storage"; // 추가

export default function WritePostScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState("카테고리");
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // 선택한 이미지 상태
  const [document, setDocument] = useState(null); // 선택한 파일 상태

  const categories = [
    { name: "교내", parentCategoryId: 2, subCategoryId: 1 },
    { name: "서포터즈/동아리", parentCategoryId: 2, subCategoryId: 2 },
    { name: "자격증", parentCategoryId: 2, subCategoryId: 3 },
    { name: "공모전", parentCategoryId: 2, subCategoryId: 4 },
    { name: "채용", parentCategoryId: 2, subCategoryId: 5 },
  ];

  const toggleCategoryOptions = () => {
    setShowCategoryOptions(!showCategoryOptions);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setShowCategoryOptions(false);
  };

  // 게시물 등록 함수 (백엔드로 전송)
  const submitPost = async () => {
    if (!title || !content || selectedCategory === "카테고리") {
      Alert.alert("입력 오류", "모든 필드를 입력해주세요.");
      return;
    }

    try {
      let imageUrl = null;

      // 선택된 이미지가 있을 경우 이미지 업로드
      if (image) {
        const uploadedImage = await uploadImage({ uri: image });
        imageUrl = uploadedImage.imageUrl; // 서버로부터 반환된 이미지 URL 사용
      }

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
      const response = await createPost(
        title,
        content,
        selectedCategory.parentCategoryId, // parentCategoryId 전달
        selectedCategory.subCategoryId, // subCategoryId 전달
        userId, // userId 전달
        imageUrl // 이미지 URL 전달
      );

      console.log("게시물 등록 응답:", response); // 서버에서 반환된 응답을 콘솔에 출력

      if (response) {
        Alert.alert("성공", "게시물이 등록되었습니다.");
        navigation.navigate("HoneyTip", {
          newPost: response, // 게시물 작성 후 새 게시물 정보를 전달
          category: selectedCategory.name, // 카테고리 정보 전달
        });
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

  // 파일 선택 함수
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === "success") {
      setDocument(result.uri);
      alert("파일이 선택되었습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={toggleCategoryOptions}
        >
          <Text style={styles.categoryText}>
            {selectedCategory.name || "카테고리"}
          </Text>
          <Ionicons
            name={showCategoryOptions ? "chevron-up" : "chevron-down"}
            size={20}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={submitPost}>
          <Text style={styles.submitButtonText}>등록</Text>
        </TouchableOpacity>
      </View>

      {showCategoryOptions && (
        <View style={styles.categoryOptions}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.name}
              style={styles.categoryOption}
              onPress={() => selectCategory(category)}
            >
              <Text>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* 제목 입력 */}
      <TextInput
        style={styles.titleInput}
        placeholder="제목을 입력해주세요."
        value={title}
        onChangeText={setTitle}
      />

      {/* 본문 입력 */}
      <TextInput
        style={styles.contentInput}
        placeholder="본문을 입력해주세요."
        value={content}
        onChangeText={setContent}
        multiline={true}
      />

      {/* 하단 아이콘 */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={pickImage}>
          <Ionicons name="image-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={pickDocument}>
          <Ionicons
            name="document-outline"
            size={30}
            color="black"
            style={{ marginLeft: 20 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
    paddingBottom: 10,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 16,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: "#FFA500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  categoryOptions: {
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
  },
  categoryOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
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
  footer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },
});
