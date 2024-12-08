//은영
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import vvipIcon from "../assets/vvip.png";
import vipIcon from "../assets/vip.png";
import basicIcon from "../assets/basic.png";
import { fetchUserProfile } from "../services/api"; // API 함수 임시 주석 처리

export default function ProfileScreen({ navigation }) {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getGradeImage = (grade) => {
    switch (grade) {
      case "VVIP":
        return vvipIcon; // VIP 등급 이미지
      case "VIP":
        return vipIcon; // Gold 등급 이미지
      case "BASIC":
        return basicIcon; // Silver 등급 이미지
    }
  };

  // API 연동 부분 주석 처리
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetchUserProfile(); // API 호출 주석 처리
      setUserProfile(response);
      console.log(response);

      // 임시로 테스트할 사용자 정보
      const tempUserProfile = {
        membershipLevel: "VIP",
        profilePicture: "../assets/profile_ex.jpeg", // 임시 로컬 이미지
        nickname: "은영",
        major: "빅데이터학과",
        totalMileage: 5000,
      };

      //setUserProfile(tempUserProfile);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>오류 발생: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>내 정보</Text>
        {/* 'Information' 스크린으로 이동 */}
        <TouchableOpacity onPress={() => navigation.navigate("Information")}>
          <Image
            source={require("../assets/question.png")}
            style={styles.questionIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.vipContainer}>
            <Image
              source={getGradeImage(userProfile?.membershipLevel)}
              style={styles.beeIcon}
              resizeMode="contain"
            />
            <Text style={styles.vipText}>{userProfile?.membershipLevel}</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.editButtonText}>✏️ 프로필 수정하기</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileInfoContainer}>
          <Image
            source={
              userProfile?.profilePicture === "../assets/profile_ex.jpeg"
                ? require("../assets/profile_ex.jpeg")
                : { uri: userProfile?.profilePicture }
            }
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userProfile?.nickname}</Text>
            <Text style={styles.profileMajor}>{userProfile?.major}</Text>
            <View style={styles.mileageContainer}>
              <Image
                source={require("../assets/honey_mileage.png")}
                style={styles.mileageIcon}
                resizeMode="contain"
              />
              <Text style={styles.mileage}>{userProfile?.totalMileage}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.sectionItem}
          onPress={() => navigation.navigate("Mileage")}
        >
          <Image
            source={require("../assets/mileage.png")}
            style={styles.sectionIcon}
            resizeMode="contain"
          />
          <Text style={styles.sectionText}>마일리지 내역</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sectionItem}>
          <Image
            source={require("../assets/check.png")}
            style={styles.sectionIcon}
            resizeMode="contain"
          />
          <Text style={styles.sectionText}>내가 쓴 글</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sectionItem}>
          <Image
            source={require("../assets/comment.png")}
            style={styles.sectionIcon}
            resizeMode="contain"
          />
          <Text style={styles.sectionText}>댓글 단 글</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  questionIcon: {
    width: 30,
    height: 30,
    marginLeft: 5,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 20,
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  vipContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  beeIcon: {
    width: 18,
    height: 18,
  },
  vipText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700",
  },
  editButtonText: {
    fontSize: 12,
    color: "#888",
  },
  profileInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileMajor: {
    fontSize: 14,
    color: "#555",
  },
  mileageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  mileageIcon: {
    width: 18,
    height: 18,
    marginRight: 5,
  },
  mileage: {
    fontSize: 14,
    color: "#888",
  },
  section: {
    marginTop: 30,
  },
  sectionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  sectionIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  sectionText: {
    fontSize: 16,
    flex: 1,
  },
});
