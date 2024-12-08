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
} from "react-native";
import searchIcon from "../assets/search.png";
import { useNavigation } from "@react-navigation/native";
import { saveSearchKeyword } from "../services/api";

export default function SearchScreen() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  // api 연결 전까지 사용할 인기 검색어 리스트
  const hotKeywords = [
    "삼성전자",
    "학술제",
    "최강화학",
    "교수랑 친해지면",
    "중간고사 기간",
    "강의평가",
    "비건덕 캠페인",
    "전공 변경",
    "자퇴",
    "집 가고 싶다",
  ];

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      Alert.alert("검색어를 입력해 주세요."); // 검색어가 없는 경우 경고 팝업 띄우기
      return;
    }

    if (searchQuery.trim().length < 2) {
      Alert.alert("검색어는 2글자 이상 입력해 주세요."); // 검색어가 2글자 미만인 경우 경고 팝업 띄우기
      return;
    }

    // 검색 API 호출 및 결과 화면으로 이동.
    navigation.navigate("SearchResult", {
      mainCategory: selectedCategory,
      subCategory: 0, // 메인 검색 화면에서의 검색하면 세부 카테고리 디폴트가 '전체'. 없어도 될듯???
      keyword: searchQuery,
    });
  };

  const handleKeywordPress = (keyword) => {
    //setSearchQuery(keyword); // 키워드 클릭 시 검색어 설정. 굳이 필요 없을지도??

    // 검색 API 호출 및 결과 화면으로 이동.
    navigation.navigate("SearchResult", {
      mainCategory: selectedCategory,
      subCategory: 0,
      keyword: keyword,
    });
  };

  // api 연결 후 아래 코드 사용
  /*
  const [hotKeywords, setHotKeywords] = useState([]);

  useEffect(() => {
    const data = await 실시간검색순위받아오는함수();
    setHotKeywords(data);
  }, [hotKeywords, selectedCategory]);
  */

  return (
    <ScrollView style={styles.searchMain}>
      <Text style={styles.title}>검색</Text>

      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => {
              setSelectedCategory(0);
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
          {
            // 정보 게시판 검색 불가
            /*<TouchableOpacity
            style={styles.categoryButton}
            onPress={() => {
              setSelectedCategory("정보");
            }}
          >
            <Text
              style={[
                styles.categorytext,
                selectedCategory === "정보" && styles.textActive,
              ]}
            >
              정보
            </Text>
          </TouchableOpacity>*/
          }
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => {
              setSelectedCategory(1);
            }}
          >
            <Text
              style={[
                styles.categorytext,
                selectedCategory === 1 && styles.textActive,
              ]}
            >
              꿀팁 거래
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => {
              setSelectedCategory(2);
            }}
          >
            <Text
              style={[
                styles.categorytext,
                selectedCategory === 2 && styles.textActive,
              ]}
            >
              커뮤니티
            </Text>
          </TouchableOpacity>
        </View>
      </View>

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
      <View style={styles.rankings}>
        <Text style={styles.honeywebContainer}>
          <Text style={styles.honeyweb}>HoneyWeb</Text>
          <Text> 실시간 검색 순위</Text>
        </Text>

        {hotKeywords.map((item, index) => (
          <View style={styles.rankContainer} key={index}>
            <Text style={index < 3 ? styles.topRanks : styles.ranks}>
              {index + 1}
            </Text>
            <TouchableOpacity onPress={() => handleKeywordPress(item)}>
              <Text style={styles.keyword}>{item}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  searchMain: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 20,
    //padding: 16,
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
    marginVertical: 20,
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
    flex: 1, // This allows equal space distribution
  },
  rankings: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginVertical: 20,
    marginHorizontal: 15,
  },
  honeywebContainer: {
    fontSize: 24,
    letterSpacing: -0.6,
    lineHeight: 36,
    fontWeight: "700",
    color: "#000",
    marginBottom: 20,
  },
  honeyweb: {
    color: "#ecae52",
  },
  rankContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginLeft: 5,
    marginBottom: 13,
  },
  topRanks: {
    fontSize: 20,
    letterSpacing: -0.5,
    lineHeight: 30,
    fontWeight: "700",
    color: "#ecae52",
    textAlign: "left",
  },
  ranks: {
    fontSize: 20,
    letterSpacing: -0.5,
    lineHeight: 30,
    fontWeight: "700",
    color: "#000",
    textAlign: "left",
  },
  keyword: {
    fontSize: 16,
    letterSpacing: -0.4,
    lineHeight: 24,
    fontWeight: "700",
    color: "#000",
    textAlign: "left",
  },
  container: {
    borderWidth: 1,
    borderColor: "rgba(122, 122, 122, 0.18)",
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
});
