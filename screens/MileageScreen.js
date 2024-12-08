import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchMileageData } from "../services/api";
import { formatSubCategory } from "../utils/format";
import goBackIcon from "../assets/go_back.png";

export default function MileageScreen() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  /*const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchMileageData();
      setList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };*/

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchMileageData();
        console.log(data);
        setList(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("TransactionPost", { postId: item.post_id });
      }}
    >
      <View style={styles.itemContainer}>
        <View style={styles.itemHeader}>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.itemCategory}>
              #{formatSubCategory(item.sub_category_name)}
            </Text>
            {item.role === "seller" && (
              <Text
                style={{
                  fontSize: 12,
                  backgroundColor: "#ffd4e2",
                  paddingHorizontal: 5,
                  borderRadius: 10,
                }}
              >
                판매
              </Text>
            )}
            {item.role === "buyer" && (
              <Text
                style={{
                  fontSize: 12,
                  backgroundColor: "#a6c8ff",
                  paddingHorizontal: 5,
                  borderRadius: 10,
                }}
              >
                구매
              </Text>
            )}
          </View>
          <Text style={styles.itemViews}>💰 {item.post_mileage}</Text>
        </View>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <View style={styles.itemFooter}>
          <Text style={styles.itemComments}>❤️ {item.likes_count}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.main}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image style={styles.goBackIcon} source={goBackIcon} />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 24,
          letterSpacing: -0.6,
          lineHeight: 36,
          fontWeight: "700",
          color: "#000",
          textAlign: "center",
          marginBottom: 10,
          //marginVertical: 16,
        }}
      >
        거래 내역
      </Text>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item) => item.post_id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 20,
  },
  goBackIcon: {
    width: 20,
    height: 16,
    //marginVertical: 22,
    marginTop: 30,
    marginBottom: 10,
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
