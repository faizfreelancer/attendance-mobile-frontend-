import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

const BLUE = "#1033c0";

export function BackHeader({page}) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={20} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{page}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: BLUE,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.3,
  },
});
