// 유예린
// 서브 카테고리 받아서 한글로 처리하는 거 추가

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
  ActivityIndicator,
} from "react-native";
import goBackIcon from "../assets/go_back.png";
import searchIcon from "../assets/search.png";
import cautionIcon from "../assets/caution.png";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { fetchSearchResults, saveSearchKeyword } from "../services/api";
import { formatSubCategory } from "../utils/format";

export default function SearchResultScreen() {
  const route = useRoute();
  const { mainCategory, subCategory, keyword } = route.params;
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0); //서브 카테고리. 전체가 디폴트
  const [searchQuery, setSearchQuery] = useState(keyword);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // api 연결 전까지 사용
  /*const handleSearch = () => {
    if (searchQuery.trim() === "") {
      Alert.alert("검색어를 입력해 주세요."); // 검색어가 없는 경우 경고
      return;
    }

    if (searchQuery.trim().length < 2) {
      Alert.alert("검색어는 2글자 이상 입력해 주세요."); // 검색어가 2글자 미만인 경우 경고 팝업 띄우기
      return;
    }
  };*/

  // api 연결 전까지 사용
  /*const searchResults = [
    {
      post_id: 1,
      title: "검색 결과 예시1",
      likes_count: 0,
      post_mileage: 0,
      sub_category_name: "카테고리1",
    },
    {
      post_id: 2,
      title: "검색 결과 예시2",
      likes_count: 10,
      post_mileage: 200,
      sub_category_name: "카테고리2",
    },
    {
      post_id: 3,
      title: "검색 결과 예시3",
      likes_count: 5,
      post_mileage: 100,
      sub_category_name: "카테고리3",
    },
    {
      post_id: 4,
      title: "검색 결과 예시4",
      likes_count: 20,
      post_mileage: 250,
      sub_category_name: "카테고리1",
    },
    {
      post_id: 5,
      title: "검색 결과 예시5",
      likes_count: 50,
      post_mileage: 300,
      sub_category_name: "카테고리5",
    },
  ];*/

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("SearchPost", { postId: item.post_id });
      }}
    >
      <View style={styles.itemContainer}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemCategory}>
            #{formatSubCategory(item.sub_category_name)}
          </Text>
          <Text style={styles.itemViews}>💰 {item.post_mileage}</Text>
        </View>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <View style={styles.itemFooter}>
          <Text style={styles.itemComments}>❤️ {item.likes_count}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // api 연결 후 아래 코드 사용

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      Alert.alert("검색어를 입력해 주세요."); // 검색어가 없는 경우 경고
      return;
    }

    if (searchQuery.trim().length < 2) {
      Alert.alert("검색어는 2글자 이상 입력해 주세요."); // 검색어가 2글자 미만인 경우 경고 팝업 띄우기
      return;
    }
    setLoading(true);

    try {
      const data = await fetchSearchResults(
        searchQuery,
        mainCategory,
        selectedCategory
      );
      if (data === undefined) {
        setSearchResults([]);
      } else {
        setSearchResults(data);
      }
      console.log(data);
    } catch (error) {
      console.log("API 호출 중 오류 발생", error);
    } finally {
      const result = await saveSearchKeyword(searchQuery);
      if (!result) console.log("검색어 저장 실패");
      setLoading(false);
    }
  };

  // 검색어 변경 시 새로운 검색 요청
  useEffect(() => {
    handleSearch();
  }, [selectedCategory]);

  return (
    <View style={styles.searchMain}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image style={styles.goBackIcon} source={goBackIcon} />
      </TouchableOpacity>

      <View style={styles.searchBoxContainer}>
        <TextInput
          style={styles.searchBox}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.searchIconWrapper}
          onPress={handleSearch}
        >
          <Image style={styles.icon} resizeMode="cover" source={searchIcon} />
        </TouchableOpacity>
      </View>

      {/* 만약 메인 카테고리가 커뮤니티라면 세부 카테고리 선택창이 안보이게 함 */}
      {mainCategory === "커뮤니티" ? (
        <></>
      ) : (
        <View style={styles.container}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => {
                if (searchQuery.trim().length < 2) {
                  Alert.alert("검색어는 2글자 이상 입력해 주세요.");
                } else {
                  setSelectedCategory(0);
                }
              }}
            >
              <Text
                style={[
                  styles.categorytext,
                  selectedCategory === 0 && styles.textActive,
                ]}
              >
                전체
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => {
                if (searchQuery.trim().length < 2) {
                  Alert.alert("검색어는 2글자 이상 입력해 주세요.");
                } else {
                  setSelectedCategory(1);
                }
              }}
            >
              <Text
                style={[
                  styles.categorytext,
                  selectedCategory === 1 && styles.textActive,
                ]}
              >
                교내
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => {
                if (searchQuery.trim().length < 2) {
                  Alert.alert("검색어는 2글자 이상 입력해 주세요.");
                } else {
                  setSelectedCategory(2);
                }
              }}
            >
              <Text
                style={[
                  styles.categorytext,
                  selectedCategory === 2 && styles.textActive,
                ]}
              >
                서포터즈/동아리
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => {
                if (searchQuery.trim().length < 2) {
                  Alert.alert("검색어는 2글자 이상 입력해 주세요.");
                } else {
                  setSelectedCategory(3);
                }
              }}
            >
              <Text
                style={[
                  styles.categorytext,
                  selectedCategory === 3 && styles.textActive,
                ]}
              >
                자격증
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => {
                if (searchQuery.trim().ength < 2) {
                  Alert.alert("검색어는 2글자 이상 입력해 주세요.");
                } else {
                  setSelectedCategory(4);
                }
              }}
            >
              <Text
                style={[
                  styles.categorytext,
                  selectedCategory === 4 && styles.textActive,
                ]}
              >
                공모전
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => {
                if (searchQuery.trim().length < 2) {
                  Alert.alert("검색어는 2글자 이상 입력해 주세요.");
                } else {
                  setSelectedCategory(5);
                }
              }}
            >
              <Text
                style={[
                  styles.categorytext,
                  selectedCategory === 5 && styles.textActive,
                ]}
              >
                채용
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 검색 결과 게시글들 띄우기. 만약 검색 결과가 없으면 없다고 띄우기 */}
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" /> // 로딩 스피너
      ) : searchResults.length === 0 ? (
        <View style={styles.noResultContainer}>
          <Image style={styles.cautionIcon} source={cautionIcon} />
          <Text style={styles.noResultText}>
            조회할 수 있는{"\n"}게시글이 없습니다.
          </Text>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item) => item.post_id.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchMain: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 20,
    //padding: 16,
  },
  goBackIcon: {
    width: 20,
    height: 16,
    //marginVertical: 22,
    marginTop: 30,
    marginBottom: 22,
  },
  textActive: {
    color: "#000",
  },
  searchBoxContainer: {
    //width: 350,
    width: "100%", // Full width
    height: 47,
    borderRadius: 30,
    backgroundColor: "rgba(217, 217, 217, 0)",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 2,
    flexDirection: "row",
    marginBottom: 25,
    //marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  searchBox: {
    width: 260,
    height: 47,
    fontSize: 17,
    letterSpacing: -0.4,
    lineHeight: 26,
    fontWeight: "700",
    /*borderRadius: 30,
    borderWidth: 2,
    borderColor: "#000",*/
  },
  searchIconWrapper: {
    marginLeft: 8,
  },
  icon: {
    width: 19.72,
    height: 20,
  },
  title: {
    fontSize: 24,
    letterSpacing: -0.6,
    lineHeight: 36,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
    marginVertical: 16,
  },
  categorytext: {
    textAlign: "center",
    color: "#a5a5a5",
    fontWeight: "700",
    //lineHeight: 23,
    letterSpacing: -0.3,
    fontSize: 15,
  },
  container: {
    borderWidth: 1,
    borderColor: "rgba(122, 122, 122, 0.18)",
    marginBottom: 25,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "rgba(122, 122, 122, 0.18)",
  },
  categoryButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRightWidth: 1,
    borderColor: "rgba(122, 122, 122, 0.18)",
  },
  noResultContainer: {
    gap: 15,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  cautionIcon: {
    width: 50,
    height: 50,
  },
  noResultText: {
    fontSize: 23,
    letterSpacing: -0.5,
    lineHeight: 35,
    fontWeight: "700",
    textAlign: "center",
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
});
