import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";
import { Text } from "react-native-paper";

const BLUE = "#1033c0";
const MAX_LENGTH = 300;

export function NoteSection({ note = "", onChangeNote, page }) {
  const remaining = MAX_LENGTH - note.length;
  const isNearLimit = remaining <= 50;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.cardTopRow}>
        <View>
          <Text style={styles.noteLabel}>OPTIONAL</Text>
          <Text style={styles.noteTitle}>Catatan {page}</Text>
        </View>
        <View style={styles.iconWrap}>
          <Ionicons name="pencil-outline" size={18} color={BLUE} />
        </View>
      </View>

      {/* TextInput */}
      <TextInput
        style={styles.input}
        placeholder="Tulis catatan untuk hari ini..."
        placeholderTextColor="#b0bbd4"
        value={note}
        onChangeText={(text) => {
          if (text.length <= MAX_LENGTH) onChangeNote(text);
        }}
        multiline
        textAlignVertical="top"
        returnKeyType="default"
      />

      {/* Character counter */}
      <Text style={[styles.counter, isNearLimit && styles.counterWarn]}>
        {remaining} karakter tersisa
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  noteLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#b0bbd4",
    letterSpacing: 1.5,
    marginBottom: 3,
  },
  noteTitle: { fontSize: 17, fontWeight: "800", color: "#1a2340" },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#eef1fb",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#f8f9fe",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#e8ecf5",
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#1a2340",
    fontWeight: "500",
    minHeight: 100,
    lineHeight: 22,
  },
  counter: {
    marginTop: 8,
    fontSize: 11,
    fontWeight: "600",
    color: "#b0bbd4",
    textAlign: "right",
  },
  counterWarn: {
    color: "#f59e0b",
  },
});
