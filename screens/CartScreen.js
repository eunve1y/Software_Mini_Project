// 유예린

/*
로그인 기능을 먼저 구현해야 장바구니도 구현할 수 있을 것 같음

장바구니 목록 받아오기
각 게시글의 필요한 정보: 게시글 번호, 게시글 제목, 작성자, 작성자 전공??(말고 등급이 있어도 괜찮을듯),
게시글 작성일자, 게시글 서브 카테고리, 게시글 마일리지

선택 결제를 어떻게 구현해야 될지 모르겠음...

장바구니가 비어있으면 비어있다고 알려주기
*/

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
  ActivityIndicator,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import uncheckIcon from "../assets/uncheck.png";
import checkIcon from "../assets/check.png";
import mileageIcon from "../assets/honey_mileage.png";
import {
  fetchCartLists,
  requestPayment,
  handleCartToggle,
  clearCart,
  deleteActiveCartItems,
} from "../services/api";
import { formatDate, formatSubCategory } from "../utils/format";

export default function CartScreen() {
  const [cartLists, setCartLists] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [totalMileage, setTotalMileage] = useState();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // api 연결 전까지 사용
  /*
  const lists = [
    {
      id: 1,
      post_id: 1,
      title: "대외활동 4개 이상 활동한 갓생러의 어쩌구저쩌구쏼라쏼라",
      name: "화학 사랑해요",
      // 전공 또는 등급
      created_at: "09월 14일",
      sub_category_name: "취준",
      post_mileage: 150,
    },
    {
      id: 2,
      post_id: 230,
      title: "게시글 예시",
      name: "유저",
      // 전공 또는 등급
      created_at: "10월 09일",
      sub_category_name: "서포터즈/동아리",
      post_mileage: 200,
    },
    {
      id: 3,
      post_id: 123,
      title: "게시글 예시2",
      name: "유저2",
      // 전공 또는 등급
      created_at: "09월 30일",
      sub_category_name: "교내",
      post_mileage: 150,
    },
    {
      id: 4,
      post_id: 333,
      title: "게시글 예시3",
      name: "유저3",
      // 전공 또는 등급
      created_at: "10월 01일",
      sub_category_name: "공모전",
      post_mileage: 150,
    },
  ];
  */
  //setCartLists(lists);

  /*const totalMileage = cartLists.reduce(
    (total, item) => total + item.post_mileage,
    0
  );*/

  const handleRefresh = () => {
    fetchData(); // 새로고침 시 장바구니 목록 업데이트
  };

  const handleCheckBoxClick = async (itemId) => {
    try {
      const response = await handleCartToggle(itemId);
      if (response) {
        // 장바구니 아이템 목록 및 총 마일리지 업데이트
        fetchData();
      }
    } catch (error) {
      console.error("토글 중 오류 발생:", error);
    }
  };

  const handlePayClick = async () => {
    if (isPaid) return;
    const confirm = await new Promise((resolve) => {
      Alert.alert("구매하기", "선택한 게시글들을 구매하시겠습니까?", [
        {
          text: "예",
          onPress: () => resolve(true),
        },
        {
          text: "아니요",
          style: "cancel",
          onPress: () => resolve(false),
        },
      ]);
    });

    if (confirm) {
      setIsPaid(true);
      try {
        // 선택한 게시글들에 대해 결제 요청 보내기
        const response = await requestPayment();
        if (response) {
          console.log(`게시글 결제 성공`);
          Alert.alert("결제가 성공적으로 완료되었습니다!");
        } else {
          console.error(`게시글 결제 실패`);
          Alert.alert("결제 실패");
        }
      } catch (error) {
        console.error("결제 처리 중 에러 발생:", error);
        Alert.alert("결제 실패");
      } finally {
        setIsPaid(false);
      }
    }
  };

  const handleDeleteAllClick = () => {
    Alert.alert("장바구니 비우기", "장바구니를 비우시겠습니까?", [
      {
        text: "예",
        onPress: async () => {
          const result = await clearCart();
          if (result) {
            setIsDeleted(!isDeleted);
            Alert.alert("장바구니를 비웠습니다.");
          } else {
            Alert.alert("장바구니 비우기에 실패했습니다.");
          }
        },
      },
      {
        text: "아니요",
        style: "cancel",
      },
    ]);
  };

  const handleDeleteClick = () => {
    Alert.alert(
      "장바구니 삭제",
      "선택한 게시글들을 장바구니에서 삭제하시겠습니까?",
      [
        {
          text: "예",
          onPress: async () => {
            const result = await deleteActiveCartItems();
            if (result) {
              setIsDeleted(!isDeleted);
              Alert.alert("선택한 게시글들을 장바구니에서 삭제했습니다.");
            } else {
              Alert.alert("장바구니 삭제에 실패했습니다.");
            }
          },
        },
        {
          text: "아니요",
          style: "cancel",
        },
      ]
    );
  };

  const renderItem = ({ item }) => {
    return (
      <>
        <View style={{ gap: 3 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CartPost", { postId: item.post_id });
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  letterSpacing: -0.4,
                  lineHeight: 27,
                  fontWeight: "600",
                }}
                numberOfLines={1}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCheckBoxClick(item.id)}>
              <Image
                style={{ width: 24, height: 24 }}
                source={item.isActive ? checkIcon : uncheckIcon}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "end",
            }}
          >
            <View style={{}}>
              <Text
                style={{ fontSize: 13, letterSpacing: -0.3, lineHeight: 20 }}
              >
                {item.authorNickname} | {item.authorMajor}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  letterSpacing: -0.2,
                  lineHeight: 15,
                  color: "rgba(97, 97, 100, 0.68)",
                }}
              >
                {formatDate(item.createdAt)} |{" "}
                {formatSubCategory(item.subCategory)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Image
                style={{ width: 24, height: 24 }}
                source={mileageIcon}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 16,
                  letterSpacing: -0.4,
                  lineHeight: 24,
                  fontWeight: "500",
                  color: "rgba(97, 97, 100, 0.68)",
                }}
              >
                {item.mileage}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            borderStyle: "solid",
            borderColor: "#d9d9d9",
            borderTopWidth: 0.9,
            width: "100%",
            height: 1,
            marginVertical: 10,
          }}
        />
      </>
    );
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const lists = await fetchCartLists(); // 비동기 작업 수행
      console.log(lists.cartItems);
      console.log(lists.totalMileage);
      setCartLists(lists.cartItems); // 상태 업데이트
      setTotalMileage(lists.totalMileage);
    } catch (error) {
      console.log("API 호출 중 오류 발생", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // 비동기 함수 호출
  }, [isPaid, isDeleted]);

  return (
    <View style={{ flex: 1, backgroundColor: "fff" }}>
      <View style={styles.main}>
        <Text style={styles.title}>장바구니</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <TouchableOpacity
              style={{
                borderRadius: 15,
                backgroundColor: "#000",
                width: 80,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handleDeleteAllClick}
            >
              <Text style={{ color: "#fff" }}>전체 삭제</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 15,
                borderStyle: "solid",
                borderColor: "#000",
                borderWidth: 1,
                //backgroundColor: "#fff",
                width: 80,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handleDeleteClick}
            >
              <Text style={{ color: "#000" }}>선택 삭제</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              borderRadius: 15,
              backgroundColor: "#ecae52", // 새로고침 버튼 색상
              width: 80,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleRefresh}
          >
            <Text style={{ color: "#fff" }}>새로고침</Text>
          </TouchableOpacity>
        </View>

        {cartLists.length === 0 ? (
          <Text
            style={{
              fontSize: 23,
              letterSpacing: -0.5,
              lineHeight: 35,
              fontWeight: "700",
              textAlign: "center",
              marginTop: 70,
            }}
          >
            장바구니가 비어있습니다.
          </Text>
        ) : (
          <FlatList
            data={cartLists}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <TouchableOpacity
        style={styles.payContainer}
        onPress={cartLists.length === 0 ? () => {} : handlePayClick}
      >
        <Text style={styles.payText}>{totalMileage} 마일리지 결제하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    // backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 20,
    //padding: 16,
  },
  title: {
    fontSize: 24,
    letterSpacing: -0.6,
    lineHeight: 36,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 30,
  },
  payContainer: {
    //position: "absolute",
    //bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#000",
    height: 70,
    width: "100%",
    //position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  payText: {
    fontSize: 16,
    letterSpacing: -0.4,
    lineHeight: 24,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    //position: "absolute",
  },
});
