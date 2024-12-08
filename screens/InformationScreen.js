//은영
import React from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";

export default function InformationScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>등급제도란?</Text>
      <Text style={styles.description}>
        인증된 경력에 따라 하단의 3등급으로 나뉘는 제도
      </Text>

      <View style={styles.rankContainer}>
        <View style={styles.rankItem}>
          <Image
            source={require("../assets/bee.png")}
            style={styles.rankIcon}
          />
          <Text style={styles.rankText}>VVIP</Text>
          <Text style={styles.rankDescription}>
            인증 5개 이상 or 인턴 / 학연생
          </Text>
        </View>

        <View style={styles.rankItem}>
          <Image
            source={require("../assets/vip_bee.png")}
            style={styles.rankIcon}
          />
          <Text style={styles.rankText}>VIP</Text>
          <Text style={styles.rankDescription}>인증 3개 이하</Text>
        </View>

        <View style={styles.rankItem}>
          <Image
            source={require("../assets/basic_bee.png")}
            style={styles.rankIcon}
          />
          <Text style={styles.rankText}>BASIC</Text>
          <Text style={styles.rankDescription}>일반회원</Text>
        </View>
      </View>

      <Text style={styles.title}>가격정책</Text>
      <Text style={styles.description}>
        등급에 따라 게시글의 기본 가격이 다르며, 구매자의 평가에 따라 가격이
        변동됩니다.
      </Text>

      <View style={styles.rankContainer}>
        <View style={styles.rankItem}>
          <Image
            source={require("../assets/bee.png")}
            style={styles.rankIcon}
          />
          <Text style={styles.rankText}>VVIP</Text>
          <Text style={styles.rankDescription}>2000 마일리지</Text>
        </View>

        <View style={styles.rankItem}>
          <Image
            source={require("../assets/vip_bee.png")}
            style={styles.rankIcon}
          />
          <Text style={styles.rankText}>VIP</Text>
          <Text style={styles.rankDescription}>1000 마일리지</Text>
        </View>

        <View style={styles.rankItem}>
          <Image
            source={require("../assets/basic_bee.png")}
            style={styles.rankIcon}
          />
          <Text style={styles.rankText}>BASIC</Text>
          <Text style={styles.rankDescription}>500 마일리지</Text>
        </View>

        <View style={styles.rankItem}>
          <Image
            source={require("../assets/like.png")}
            style={styles.rankIcon}
          />
          <Text style={styles.rankText}>좋아요</Text>
          <Text style={styles.rankDescription}>하나당 +100</Text>
        </View>
        <View style={styles.rankItem}>
          <Image
            source={require("../assets/xdislike.png")}
            style={styles.rankIcon}
          />
          <Text style={styles.rankText}>싫어요</Text>
          <Text style={styles.rankDescription}>하나당 -100</Text>
        </View>
      </View>

      <Text style={styles.title}>평가제도란?</Text>
      <Text style={styles.description}>
        사용자가 서로를 평가하여 좋은 커뮤니티 형성
      </Text>

      <View style={styles.rankContainer}>
        <View style={styles.rankItem}>
          <Image
            source={require("../assets/smile.png")}
            style={styles.rankIcon}
          />
          <Text style={styles.rankText}>good manner</Text>
        </View>

        <View style={styles.rankItem}>
          <Image
            source={require("../assets/normal.png")}
            style={styles.rankIcon}
          />
          <Text style={styles.rankText}>normal</Text>
        </View>

        <View style={styles.rankItem}>
          <Image
            source={require("../assets/bad.png")}
            style={styles.rankIcon}
          />
          <Text style={styles.rankText}>bad manner</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  rankContainer: {
    marginBottom: 30,
  },
  rankItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  rankIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  rankText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  rankDescription: {
    fontSize: 14,
    color: "#555",
    marginLeft: 15,
  },
});
