// 유예린

import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import logoIcon from "../assets/logo.png";
import bellIcon from "../assets/bell.png";
import infoIcon from "../assets/target.png";
import tipIcon from "../assets/atom.png";
import communityIcon from "../assets/comment.png";
import info1Img from "../assets/info1.jpg";
import info2Img from "../assets/info2.jpg";
import info3Img from "../assets/info3.jpg";
import { fetchHotPosts } from "../services/api";

export default function HomeScreen() {
  const navigation = useNavigation();

  // api 연동 전에 사용하는 인기글 리스트
  const hotPostItems = [
    { post_id: 111, title: "삼성전자 합격 후기" },
    { post_id: 222, title: "내 주식 왜 이러냐" },
    { post_id: 333, title: "나랑 글챌 같이 준비 할 사람" },
    { post_id: 444, title: "내 머뤼...자라나라" },
    { post_id: 555, title: "하이하이" },
  ];

  // api 연동한다면 아래 코드 사용(수정될 가능성 높음)
  /*
  const [hotPostItems, setHotPostItems] = useState([]);

  useEffect(() => {
    const data = await fetchHotPosts();
    setHotPostItems(data);
  }, [hotPostItems]);
  */

  return (
    <ScrollView style={styles.main}>
      <View style={[styles.background, styles.naviLayout]} />
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image style={styles.logoIcon} source={logoIcon} />
          <Text style={[styles.logo]}>HoneyWeb</Text>
        </View>
      </View>
      <View style={styles.lineView} />

      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={[styles.categoryLayout]}
          onPress={() => {
            navigation.navigate("InfoMain");
          }}
        >
          <Image style={styles.infoIcon} resizeMode="cover" source={infoIcon} />
          <Text style={[styles.textTypo]}>정보</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryLayout2]}
          onPress={() => {
            navigation.navigate("HoneyTip");
          }}
        >
          <Image style={styles.tipIcon} resizeMode="cover" source={tipIcon} />
          <Text style={[styles.textTypo]}>꿀팁 거래</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryLayout3]}
          onPress={() => {
            navigation.navigate("Community");
          }}
        >
          <Image
            style={styles.communityIcon}
            resizeMode="cover"
            source={communityIcon}
          />
          <Text style={[styles.textTypo]}>커뮤니티</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.recommendText, styles.textPosition1]}>
        추천 활동 정보
      </Text>
      <ScrollView
        horizontal={true} // 가로 스크롤 활성화
        showsHorizontalScrollIndicator={false} // 가로 스크롤바 숨기기
        style={styles.scrollView}
      >
        <Image
          style={styles.recommendItemLayout}
          source={info1Img}
          resizeMode="cover"
        />
        <Image
          style={styles.recommendItemLayout}
          source={info2Img}
          resizeMode="cover"
        />
        <Image
          style={styles.recommendItemLayout}
          source={info3Img}
          resizeMode="cover"
        />
      </ScrollView>
      <Text style={[styles.hotPostText, styles.textTypo1]}>인기글</Text>
      {hotPostItems.map((item, index) => (
        <Text
          key={index}
          style={styles.postNameText}
          onPress={() => {
            //navigation.navigate(해당게시글로이동);
            //예시: navigation.navigate(`${item.categoryId}/${item.post_Id}`);
          }}
        >{`${index + 1}. ${item.title}`}</Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fff",
  },
  naviLayout: {
    width: 360,
    left: 0,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 27,
    marginRight: 27,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 11,
  },
  logoIcon: {
    top: 15,
    //height: 33,
    width: 35,
    height: 32.57,
  },
  lineView: {
    marginTop: 15,
    borderStyle: "solid",
    borderColor: "rgba(122, 122, 122, 0.18)",
    borderTopWidth: 0.9,
  },
  categoryContainer: {
    height: 247,
    marginTop: 30,
    marginLeft: 64,
    marginRight: 64,
  },
  infoIcon: {
    width: 32,
    height: 32,
  },
  tipIcon: {
    width: 32,
    height: 36,
  },
  communityIcon: {
    width: 32,
    height: 31,
  },
  categoryLayout: {
    borderRadius: 20,
    backgroundColor: "rgba(236, 174, 82, 0.8)",
    height: 73,
    flexDirection: "row",
    alignItems: "center",
    gap: 50,
    width: "100%",
    marginBottom: 14,
    paddingLeft: 60,
  },
  categoryLayout2: {
    borderRadius: 20,
    backgroundColor: "rgba(236, 174, 82, 0.8)",
    height: 73,
    flexDirection: "row",
    alignItems: "center",
    gap: 27,
    width: "100%",
    marginBottom: 14,
    paddingLeft: 60,
  },
  categoryLayout3: {
    borderRadius: 20,
    backgroundColor: "rgba(236, 174, 82, 0.8)",
    height: 73,
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
    width: "100%",
    marginBottom: 14,
    paddingLeft: 60,
  },
  recommendText: {
    lineHeight: 30,
    letterSpacing: -0.5,
    fontSize: 20,
    color: "#000",
    fontWeight: "700",
    marginTop: 40,
    marginLeft: 23,
  },
  textTypo: {
    lineHeight: 38,
    letterSpacing: -0.6,
    fontSize: 25,
    color: "#000",
    textAlign: "center",
    fontWeight: "700",
  },
  recommendItemLayout: {
    backgroundColor: "#d9d9d9",
    borderRadius: 20,
    height: 300,
    width: 300,
    marginLeft: 17,
    marginBottom: 30,
  },
  scrollView: {
    flexDirection: "row",
    marginTop: 10,
    flexGrow: 0,
  },
  hotPostText: {
    lineHeight: 30,
    letterSpacing: -0.5,
    fontSize: 20,
    color: "#000",
    fontWeight: "700",
    marginLeft: 22,
  },
  postNameText: {
    marginLeft: 25,
    marginTop: 5,
    fontSize: 16,
    letterSpacing: -0.4,
    lineHeight: 24,
    fontWeight: "500",
    color: "#3a3135",
  },
  logo: {
    top: 10,
    fontSize: 30,
    letterSpacing: -0.6,
    lineHeight: 60,
    color: "#AD8840",
    fontWeight: "700",
    textAlign: "left",
  },
  bellIcon: {
    width: 38,
    height: 38,
    top: 21,
  },
});
