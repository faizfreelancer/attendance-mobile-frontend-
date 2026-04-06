import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

const BLUE = "#1033c0";

export function ListsSection({
  Lists,
  inputList,
  onChangeInput,
  onAdd,
  onRemove,
  placeholder
}) {  
  return (
    <View style={styles.todoSection}>
      {/* Header */}
      <View style={styles.todoHeader}>
        <Text style={styles.todoTitle}>Daftar Tugas</Text>
        <View style={styles.tasksBadge}>
          <Text style={styles.tasksBadgeText}>{Lists.length} TASKS</Text>
        </View>
      </View>

      {/* Input */}
      <View style={styles.todoInputRow}>
        <TextInput
          style={styles.todoInput}
          placeholder={placeholder}
          placeholderTextColor="#b0bbd4"
          value={inputList}
          onChangeText={onChangeInput}
          onSubmitEditing={onAdd}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={onAdd}
          activeOpacity={0.85}
        >
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* List */}
      {Lists.map((item) => (
        <View
          key={item.id}
          style={styles.todoItem}
          activeOpacity={0.7}
          
        >
          <MaterialCommunityIcons
            name="drag-vertical"
            size={20}
            color="#b0bbd4"
          />
          <Text style={styles.todoItemText}>{item.text}</Text>
          <TouchableOpacity onPress={() => onRemove(item.id)}>
            <Ionicons name="close" size={18} color="#b0bbd4" />
          </TouchableOpacity>
        </View>
      ))}

      {Lists.length === 0 && (
        <Text style={styles.emptyText}>Belum ada list hari ini.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  todoSection: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 4,
  },
  todoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  todoTitle: { fontSize: 16, fontWeight: "800", color: "#1a2340" },
  tasksBadge: {
    backgroundColor: "#eef1fb",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tasksBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: BLUE,
    letterSpacing: 0.8,
  },
  todoInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  todoInput: {
    flex: 1,
    backgroundColor: "#f8f9fe",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#e8ecf5",
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: "#1a2340",
    fontWeight: "500",
  },
  addBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: BLUE,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 13,
    borderTopWidth: 1,
    borderTopColor: "#f0f4ff",
  },
  todoItemText: { fontSize: 14, fontWeight: "600", color: "#1a2340", flex: 1 },
  emptyText: {
    fontSize: 13,
    color: "#b0bbd4",
    textAlign: "center",
    paddingVertical: 16,
  },
});
