// 유예린
// 무료 게시글(아마도 커뮤니티 게시글만 해당될듯? 정보 게시글은 추후 구현)
// 일단 보류

import goBackIcon from "../assets/go_back.png";
import { ScrollView, TouchableOpacity } from "react-native";

export default function FreePostScreen() {
  return (
    <ScrollView style={styles.main}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image style={styles.goBackIcon} source={goBackIcon} />
      </TouchableOpacity>

      <View style={styles.lineView} />
    </ScrollView>
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
    marginBottom: 22,
  },
  lineView: {
    borderStyle: "solid",
    borderColor: "rgba(122, 122, 122, 0.18)",
    borderTopWidth: 0.9,
  },
});
