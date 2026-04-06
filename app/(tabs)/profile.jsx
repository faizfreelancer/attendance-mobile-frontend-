import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useAuth } from "@/context/authContext";
import { router } from "expo-router";

// ─── Konstanta ────────────────────────────────────────────────────────────────
const BLUE = "#1033c0";

// ─── Data dummy (ganti dari context/API) ─────────────────────────────────────
const USER = {
  name: "Alex Harrison",
  role: "SENIOR SOFTWARE ENGINEER",
  email: "alex.harrison@company.com",
  employeeId: "EMP-2024-0892",
  department: "Engineering & Product",
  avatar: "https://i.pravatar.cc/200?img=12",
};

const SETTINGS_MENU = [
  {
    id: "account",
    label: "Account Settings",
    icon: "person-outline",
    iconLib: "Ionicons",
  },
  {
    id: "notification",
    label: "Notification Preferences",
    icon: "notifications-outline",
    iconLib: "Ionicons",
  },
  {
    id: "privacy",
    label: "Privacy Policy",
    icon: "shield-outline",
    iconLib: "Ionicons",
  },
  {
    id: "terms",
    label: "Terms of Service",
    icon: "document-text-outline",
    iconLib: "Ionicons",
  },
];

// ─── Screen ──────────────────────────────────────────────────────────────────
export default function ProfileScreen() {
  const { signOut } = useAuth();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Header Biru ── */}
        <View style={styles.header}>
          {/* Nav row */}
          <View style={styles.navRow}>
           
            <Text style={styles.navTitle}>Profile</Text>
           
          </View>

          {/* Avatar & info */}
          <View style={styles.profileWrap}>
            <View style={styles.avatarWrap}>
              <Image
                source={{ uri: USER.avatar }}
                style={styles.avatar}
                resizeMode="cover"
              />
              {/* Edit badge */}
              <View style={styles.editBadge}>
                <Ionicons name="pencil" size={10} color="#fff" />
              </View>
            </View>
            <Text style={styles.userName}>{USER.name}</Text>
            <Text style={styles.userRole}>{USER.role}</Text>
          </View>
        </View>

        <View style={styles.body}>
          {/* ── Card Account Info ── */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Account Info</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Ionicons
                  name="information-circle-outline"
                  size={18}
                  color="#b0bbd4"
                />
              </TouchableOpacity>
            </View>

            {/* Email */}
            <View style={styles.infoItem}>
              <View style={styles.infoIconWrap}>
                <Ionicons name="mail-outline" size={16} color={BLUE} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>EMAIL ADDRESS</Text>
                <Text style={styles.infoValue}>{USER.email}</Text>
              </View>
            </View>

            <View style={styles.itemDivider} />

            {/* Employee ID */}
            <View style={styles.infoItem}>
              <View style={styles.infoIconWrap}>
                <Ionicons name="card-outline" size={16} color={BLUE} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>EMPLOYEE ID</Text>
                <Text style={styles.infoValue}>{USER.employeeId}</Text>
              </View>
            </View>

            <View style={styles.itemDivider} />

            {/* Department */}
            <View style={styles.infoItem}>
              <View style={styles.infoIconWrap}>
                <MaterialCommunityIcons name="domain" size={16} color={BLUE} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>DEPARTMENT</Text>
                <Text style={styles.infoValue}>{USER.department}</Text>
              </View>
            </View>
          </View>

          {/* ── Card Settings ── */}
          <View style={styles.sectionLabel}>
            <Text style={styles.sectionTitle}>Settings</Text>
          </View>

          <View style={styles.card}>
            {SETTINGS_MENU.map((item, index) => (
              <View key={item.id}>
                <TouchableOpacity
                  style={styles.menuItem}
                  activeOpacity={0.7}
                  onPress={() => {}}
                >
                  <View style={styles.menuIconWrap}>
                    <Ionicons name={item.icon} size={18} color="#8492b0" />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Ionicons name="chevron-forward" size={16} color="#b0bbd4" />
                </TouchableOpacity>
                {index < SETTINGS_MENU.length - 1 && (
                  <View style={styles.itemDivider} />
                )}
              </View>
            ))}
          </View>

          {/* ── Tombol Logout ── */}
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={signOut}
            activeOpacity={0.85}
          >
            <Ionicons name="log-out-outline" size={18} color="#ef4444" />
            <Text style={styles.logoutText}>LOGOUT SESSION</Text>
          </TouchableOpacity>

          <View style={{ height: 100        }} />
        </View>
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
    paddingBottom: 48,
  },
  navRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // ← center seperti Task
    paddingHorizontal: 20,
    paddingTop: 16,
    marginBottom: 24,
  },
  navTitle: {
    fontSize: 20, // ← sama dengan Task
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.3,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },

  // Avatar
  profileWrap: {
    alignItems: "center",
    gap: 6,
  },
  avatarWrap: {
    position: "relative",
    marginBottom: 4,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.4)",
  },
  editBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: BLUE,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.3,
  },
  userRole: {
    fontSize: 10,
    fontWeight: "700",
    color: "rgba(255,255,255,0.55)",
    letterSpacing: 1.8,
  },

  // ── Body ────────────────────────────────────────────
  body: {
    marginTop: -24,
    paddingHorizontal: 16,
  },

  // Card
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 12,
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1a2340",
  },

  // Info item
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
  },
  infoIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#eef1fb",
    alignItems: "center",
    justifyContent: "center",
  },
  infoContent: {
    flex: 1,
    gap: 2,
  },
  infoLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: "#b0bbd4",
    letterSpacing: 1.2,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1a2340",
  },
  itemDivider: {
    height: 1,
    backgroundColor: "#f0f4ff",
  },

  // Section label
  sectionLabel: {
    paddingHorizontal: 4,
    marginBottom: 10,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1a2340",
  },

  // Menu item
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 12,
  },
  menuIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#f8f9fe",
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#1a2340",
  },

  // Logout
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 15,
    marginTop: 4,
    borderWidth: 1.5,
    borderColor: "#fecaca",
    shadowColor: "#ef4444",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  logoutText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#ef4444",
    letterSpacing: 1,
  },
});
 