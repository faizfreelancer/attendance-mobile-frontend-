import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

// ─── Konstanta ────────────────────────────────────────────────────────────────
const BLUE = "#1033c0";

const STATUS_OPTIONS = ["TO DO", "IN PROGRESS", "COMPLETED"];

const STATUS_STYLE = {
  COMPLETED: { bg: "#dcfce7", text: "#16a34a" },
  "IN PROGRESS": { bg: "#dbeafe", text: "#2563eb" },
  "TO DO": { bg: "#f1f5f9", text: "#64748b" },
};

const initialTasks = [
  {
    id: "1",
    title: "Review monthly attendance logs",
    sub: "DONE AT 05:15 AM",
    subType: "done",
    status: "COMPLETED",
  },
  {
    id: "2",
    title: "Prepare presentation for board meeting",
    sub: "PRIORITY HIGH",
    subType: "priority",
    status: "IN PROGRESS",
  },
  {
    id: "3",
    title: "Update project timeline for Q4",
    sub: "DUE TOMORROW",
    subType: "due",
    status: "TO DO",
  },
  {
    id: "4",
    title: "Follow up with client feedback",
    sub: "PERPETUAL",
    subType: "perpetual",
    status: "TO DO",
  },
];

// ─── Screen ──────────────────────────────────────────────────────────────────
export default function TodoScreen() {
  const [tasks, setTasks] = useState(initialTasks);
  const [inputText, setInputText] = useState("");
  const [dropdownId, setDropdownId] = useState(null); // id task yang dropdown-nya terbuka

  // ── Tambah task ──
  const handleAdd = () => {
    if (!inputText.trim()) return;
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: inputText.trim(),
        sub: "PERPETUAL",
        subType: "perpetual",
        status: "TO DO",
      },
    ]);
    setInputText("");
  };

  // ── Ganti status ──
  const handleChangeStatus = (id, status) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status,
              sub:
                status === "COMPLETED"
                  ? `DONE AT ${new Date().toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}`
                  : t.sub,
              subType: status === "COMPLETED" ? "done" : t.subType,
            }
          : t,
      ),
    );
    setDropdownId(null);
  };

  const remaining = tasks.filter((t) => t.status !== "COMPLETED").length;

  const subColor = (type) => {
    if (type === "done") return "#b0bbd4";
    if (type === "priority") return "#ef4444";
    if (type === "due") return "#f59e0b";
    return "#b0bbd4";
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* ── Header Biru ── */}
      <View style={styles.header}>
        {/* Nav row */}
        <View style={styles.navRow}>
          <Text style={styles.navTitle}>Tasks</Text>
        </View>
      </View>

      {/* ── Input card (overlap header) ── */}
      <View style={styles.inputCard}>
        <View style={styles.inputRow}>
          <TouchableOpacity activeOpacity={0.7} style={styles.plusWrap}>
            <Ionicons name="add-circle-outline" size={22} color="#b0bbd4" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Tambah To-Do..."
            placeholderTextColor="#b0bbd4"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleAdd}
            returnKeyType="done"
          />
          <TouchableOpacity
            style={styles.addBtn}
            onPress={handleAdd}
            activeOpacity={0.85}
          >
            <Text style={styles.addBtnText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Task List ── */}
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Section header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          <View style={styles.remainingBadge}>
            <Text style={styles.remainingText}>{remaining} REMAINING</Text>
          </View>
        </View>

        {/* Task items */}
        {tasks.map((task) => {
          const st = STATUS_STYLE[task.status];
          const isCompleted = task.status === "COMPLETED";

          return (
            <View key={task.id} style={styles.taskCard}>
              <View style={styles.taskRow}>
                {/* Teks kiri */}
                <View style={styles.taskLeft}>
                  <Text
                    style={[
                      styles.taskTitle,
                      isCompleted && styles.taskTitleDone,
                    ]}
                  >
                    {task.title}
                  </Text>
                  <Text
                    style={[styles.taskSub, { color: subColor(task.subType) }]}
                  >
                    {task.sub}
                  </Text>
                </View>

                {/* Status badge / dropdown trigger */}
                <TouchableOpacity
                  style={[styles.statusBadge, { backgroundColor: st.bg }]}
                  onPress={() =>
                    setDropdownId(dropdownId === task.id ? null : task.id)
                  }
                  activeOpacity={0.8}
                >
                  <Text style={[styles.statusText, { color: st.text }]}>
                    {task.status}
                    {isCompleted ? " ✓" : ""}
                  </Text>
                  {!isCompleted && (
                    <Ionicons
                      name="chevron-down"
                      size={11}
                      color={st.text}
                      style={{ marginLeft: 2 }}
                    />
                  )}
                </TouchableOpacity>
              </View>

              {/* Dropdown status */}
              {dropdownId === task.id && (
                <View style={styles.dropdown}>
                  {STATUS_OPTIONS.filter((s) => s !== task.status).map((s) => {
                    const ds = STATUS_STYLE[s];
                    return (
                      <TouchableOpacity
                        key={s}
                        style={styles.dropdownItem}
                        onPress={() => handleChangeStatus(task.id, s)}
                        activeOpacity={0.7}
                      >
                        <View
                          style={[
                            styles.dropdownDot,
                            { backgroundColor: ds.text },
                          ]}
                        />
                        <Text style={[styles.dropdownText, { color: ds.text }]}>
                          {s}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}

        {tasks.length === 0 && (
          <View style={styles.emptyWrap}>
            <MaterialCommunityIcons
              name="clipboard-check-outline"
              size={48}
              color="#dde3f0"
            />
            <Text style={styles.emptyText}>Belum ada task hari ini</Text>
          </View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  // ── Header ──────────────────────────────────────────
  header: {
    backgroundColor: BLUE,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
  },
  navRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  navTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.3,
  },
  dailyLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "rgba(255,255,255,0.55)",
    letterSpacing: 2,
    marginBottom: 6,
  },
  dailyGreet: {
    fontSize: 26,
    fontWeight: "800",
    color: "#fff",
    lineHeight: 33,
  },

  // ── Input Card ──────────────────────────────────────
  inputCard: {
    marginHorizontal: 16,
    marginTop: -28,
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  plusWrap: {
    padding: 2,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#1a2340",
    fontWeight: "500",
    paddingVertical: 6,
  },
  addBtn: {
    backgroundColor: BLUE,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 9,
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  addBtnText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#fff",
  },

  // ── Scroll ──────────────────────────────────────────
  scroll: {
    paddingHorizontal: 16,
  },

  // ── Section header ───────────────────────────────────
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1a2340",
  },
  remainingBadge: {
    backgroundColor: "#eef1fb",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  remainingText: {
    fontSize: 10,
    fontWeight: "700",
    color: BLUE,
    letterSpacing: 0.8,
  },

  // ── Task Card ───────────────────────────────────────
  taskCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
  },
  taskLeft: {
    flex: 1,
    gap: 5,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1a2340",
    lineHeight: 20,
  },
  taskTitleDone: {
    textDecorationLine: "line-through",
    color: "#b0bbd4",
  },
  taskSub: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.8,
  },

  // Status badge
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 2,
    flexShrink: 0,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  // Dropdown
  dropdown: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#f0f4ff",
    paddingTop: 8,
    gap: 6,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 5,
    paddingHorizontal: 4,
  },
  dropdownDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  dropdownText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  // Empty
  emptyWrap: {
    alignItems: "center",
    paddingVertical: 48,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
    color: "#b0bbd4",
    fontWeight: "600",
  },
});
