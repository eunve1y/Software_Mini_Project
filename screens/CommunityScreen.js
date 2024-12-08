//은영
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { fetchCommunityPosts } from "../services/api"; // API 함수 추가

export default function CommunityScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 커뮤니티 게시물 불러오는 함수
  const loadPosts = async () => {
    try {
      setLoading(true); // 로딩 상태 활성화
      const fetchedPosts = await fetchCommunityPosts(); // 백엔드 API 호출
      setPosts(fetchedPosts); // 받아온 데이터 상태 업데이트
    } catch (error) {
      console.error("커뮤니티 게시물 불러오기 실패:", error);
    } finally {
      setLoading(false); // 로딩 완료
    }
  };

  // 컴포넌트가 마운트될 때 게시물 로딩
  useEffect(() => {
    loadPosts();
  }, []);

  // 게시물 렌더링 함수
  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.titleText}>{item.title}</Text>
      <Text style={styles.contentText}>{item.content}</Text>
      <View style={styles.postFooter}>
        <Text style={styles.likesText}>❤️ {item.likes_count}</Text>
        <Text style={styles.authorText}>작성자: {item.author_nickname}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>커뮤니티</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>로딩 중...</Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.post_id.toString()}
        />
      )}
      <TouchableOpacity
        style={styles.writePostButton}
        onPress={() => navigation.navigate("WriteCommunityPost")} // navigation prop 사용
      >
        <Text style={styles.writePostButtonText}>새 글 작성</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    padding: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 20,
    marginBottom: 20,
    color: "#000",
  },
  postContainer: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
    color: "#007AFF",
    fontWeight: "bold",
  },
  mileageText: {
    fontSize: 12,
    color: "#AAAAAA",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  contentText: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333333",
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  likesText: {
    fontSize: 12,
    color: "#888",
  },
  authorText: {
    fontSize: 12,
    color: "#555",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  writePostButton: {
    backgroundColor: "#FFA500",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },

  writePostButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
