import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";

const BLUE = "#1033c0";

function LocationStatus({ isInRange }) {
  if (isInRange === null) {
    return (
      <View style={styles.locationRow}>
        <ActivityIndicator size={12} color={BLUE} />
        <Text style={[styles.infoValue, { color: "#b0bbd4", fontSize: 13 }]}>
          Memeriksa...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.locationRow}>
      <View
        style={[
          styles.locationDot,
          { backgroundColor: isInRange ? "#22c55e" : "#ef4444" },
        ]}
      />
      <Text
        style={[styles.infoValue, { color: isInRange ? "#22c55e" : "#ef4444" }]}
      >
        {isInRange ? "In Range" : "Out of Range"}
      </Text>
    </View>
  );
}

export function BottomBar({ currentTime, isInRange, photoUri, onSubmit, isLoading }) {
  const isSubmitEnabled = !!photoUri && isInRange === true;

  return (
    <View style={styles.bottomBar}>
      <View style={styles.infoRow}>
        <View style={styles.infoBlock}>
          <Text style={styles.infoLabel}>CURRENT TIME</Text>
          <Text style={styles.infoValue}>{currentTime}</Text>
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.infoBlock}>
          <Text style={styles.infoLabel}>LOCATION STATUS</Text>
          <LocationStatus isInRange={isInRange} />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.submitBtn, !isSubmitEnabled && styles.submitBtnDisabled]}
        activeOpacity={0.85}
        disabled={!isSubmitEnabled}
        onPress={onSubmit}
      >
        {isLoading ? (
          <ActivityIndicator size={18} color="#fff" />
        ) : (
          <>
            <Ionicons name="log-in-outline" size={18} color="#fff" />
            <Text style={styles.submitBtnText}>Submit Check-In</Text>
          </>
        )}  
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  infoBlock: { flex: 1, gap: 3 },
  infoDivider: {
    width: 1,
    height: 32,
    backgroundColor: "#e8ecf5",
    marginHorizontal: 16,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#b0bbd4",
    letterSpacing: 1.2,
  },
  infoValue: { fontSize: 16, fontWeight: "800", color: BLUE },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  locationDot: { width: 8, height: 8, borderRadius: 4 },
  submitBtn: {
    backgroundColor: "#1033c0",
    borderRadius: 14,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#1a2340",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitBtnDisabled: { backgroundColor: "#b0bbd4", shadowOpacity: 0 },
  submitBtnText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.3,
  },
});
