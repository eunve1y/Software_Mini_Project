//은영
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator, // 로딩 인디케이터 추가
  Linking,
} from "react-native";
import { fetchPostsByCategory } from "../services/api"; // API 호출 함수

export default function InfoScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(null); // 기본값을 null로 설정
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  // 카테고리 목록
  const categories = ["교내", "서포터즈/동아리", "자격증", "공모전", "채용"];

  // 카테고리가 변경될 때마다 해당 카테고리 게시물 불러오기 또는 채용 페이지 열기
  useEffect(() => {
    const loadPosts = async () => {
      if (selectedCategory === "채용") {
        // 채용 카테고리를 선택하면 즉시 브라우저에서 페이지 열기
        const url = "http://www.jobkorea.co.kr/Starter/calendar/sub/month";
        Linking.openURL(url).catch((err) =>
          console.error("Failed to open page", err)
        );
        return;
      }

      if (!selectedCategory) {
        return; // 카테고리가 선택되지 않았을 경우 아무 것도 하지 않음
      }

      setLoading(true); // 로딩 시작
      try {
        const allPosts = await fetchPostsByCategory(selectedCategory);
        setPosts(allPosts);
      } catch (error) {
        console.error("게시물 불러오기 실패:", error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    loadPosts();
  }, [selectedCategory]);

  // 자격증 카테고리인 경우 데이터를 다르게 렌더링
  const renderItem = ({ item }) => {
    if (selectedCategory === "자격증") {
      // 자격증 게시물의 경우
      return (
        <View style={styles.itemContainer}>
          <Text style={styles.licenseTitle}>자격증: {item.license}</Text>
          <Text style={styles.organization}>
            발급 기관: {item.organization}
          </Text>
        </View>
      );
    } else {
      // 그 외의 카테고리 게시물 처리
      return (
        <View style={styles.itemContainer}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemCategory}>#{item.category}</Text>
          </View>
          {/* 이미지 추가 */}
          <Image
            source={{ uri: item.coverImage }} // 백엔드에서 이미지 URL을 가져와 표시
            style={styles.itemImage}
          />
          <Text style={styles.itemTitle}>{item.title}</Text>
          <View style={styles.itemFooter}>
            <Text style={styles.itemComments}>❤️ {item.comments}</Text>
          </View>
        </View>
      );
    }
  };

  // 카테고리 렌더링
  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        item === selectedCategory && styles.selectedCategory,
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        style={[
          styles.categoryText,
          item === selectedCategory && styles.selectedCategoryText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>정보</Text>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />
      </View>

      {loading ? ( // 로딩 중일 때는 ActivityIndicator 표시
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>로딩 중...</Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={true} // 스크롤 활성화
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 30,
  },
  categoryList: {
    paddingHorizontal: 5,
    justifyContent: "space-evenly",
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#EEEEEE",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  selectedCategory: {
    backgroundColor: "#000000",
  },
  categoryText: {
    fontSize: 16,
    color: "#555555",
  },
  selectedCategoryText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  listContent: {
    paddingBottom: 60,
  },
  itemContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  itemCategory: {
    fontSize: 12,
    color: "#007AFF",
    fontWeight: "bold",
  },
  itemViews: {
    fontSize: 12,
    color: "#AAAAAA",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemComments: {
    fontSize: 12,
    color: "#AAAAAA",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#FFC107",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  floatingButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemImage: {
    width: "100%", // 가로 너비를 100%로 설정하여 아이템 크기에 맞춤
    height: 150, // 높이 설정
    resizeMode: "cover", // 이미지가 컨테이너에 맞게 크기를 조정하도록 설정
    marginBottom: 10,
  },
  licenseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  organization: {
    fontSize: 14,
    color: "#555555",
  },
});
