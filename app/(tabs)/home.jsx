import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

// ─── Data dummy ──────────────────────────────────────────────────────────────
const recentActivity = [
  {
    id: "1",
    title: "Headquarters",
    location: "Jakarta Pusat",
    time: "08:12",
    status: "CHECK IN",
    statusColor: "#22c55e",
    iconColor: "#1a2340",
    iconBg: "#e8ecf5",
  }
];

// ─── Screen ──────────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const checkInTime = "08:12";
  const checkOutTime = null; // null = belum check out
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    // fetch ulang data
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* ── Header Biru ── */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            {/* Avatar */}
            <Image
              source={{ uri: "https://i.pravatar.cc/100?img=12" }}
              style={styles.avatar}
            />

            {/* Greeting */}
            <View style={styles.greetWrap}>
              <Text style={styles.greetSub}>Selamat Datang,</Text>
              <Text style={styles.greetName}>Alex Harrison</Text>
            </View>

            <Image
              source={require("../../assets/images/icon-putih.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* ── Card Check In / Out (overlap header) ── */}
        <View style={styles.card}>
          {/* Row waktu */}
          <View style={styles.timeRow}>
            {/* Check In */}
            <View style={styles.timeBlock}>
              <Text style={styles.timeLabel}>CHECK IN</Text>
              <Text style={styles.timeBig}>{checkInTime}</Text>
              <View style={[styles.badge, { backgroundColor: "#dcfce7" }]}>
                <View style={styles.badgeDot} />
                <Text style={[styles.badgeText, { color: "#16a34a" }]}>
                  SUDAH CHECK IN
                </Text>
              </View>
            </View>

            {/* Divider vertikal */}
            <View style={styles.verticalDivider} />

            {/* Check Out */}
            <View style={styles.timeBlock}>
              <Text style={styles.timeLabel}>CHECK OUT</Text>
              <Text style={[styles.timeBig, { color: "#b0bbd4" }]}>
                {checkOutTime ?? "--:--"}
              </Text>
              <View style={[styles.badge, { backgroundColor: "#fff4e5" }]}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={11}
                  color="#f59e0b"
                  style={{ marginRight: 3 }}
                />
                <Text style={[styles.badgeText, { color: "#f59e0b" }]}>
                  BELUM
                </Text>
              </View>
            </View>
          </View>

          {/* Divider horizontal */}
          <View style={styles.horizontalDivider} />

          {/* Tombol aksi */}
          <View style={styles.btnRow}>
            {/* Checked In (ghost) */}
            <TouchableOpacity style={styles.btnGhost} activeOpacity={0.75}>
              <Ionicons name="log-in-outline" size={17} color="#8492b0" />
              <Text style={styles.btnGhostText}>Checked In</Text>
            </TouchableOpacity>

            {/* Check Out (solid) */}
            <TouchableOpacity style={styles.btnSolid} activeOpacity={0.85}>
              <MaterialCommunityIcons
                name="export"
                size={17}
                color="#fff"
                style={{ transform: [{ rotate: "180deg" }] }}
              />
              <Text style={styles.btnSolidText}>Check Out</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Recent Activity ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Feather name="more-horizontal" size={20} color="#8492b0" />
            </TouchableOpacity>
          </View>

          {recentActivity.map((item, index) => (
            <View key={item.id}>
              <View style={styles.activityItem}>
                {/* Ikon lokasi */}
                <View
                  style={[
                    styles.activityIcon,
                    { backgroundColor: item.iconBg },
                  ]}
                >
                  <Ionicons name="location" size={20} color={item.iconColor} />
                </View>

                {/* Info */}
                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}>{item.title}</Text>
                  <View style={styles.activityLocationRow}>
                    <Ionicons
                      name="location-outline"
                      size={11}
                      color="#b0bbd4"
                    />
                    <Text style={styles.activityLocation}>{item.location}</Text>
                  </View>
                </View>

                {/* Waktu & Status */}
                <View style={styles.activityRight}>
                  <Text style={styles.activityTime}>{item.time}</Text>
                  <Text
                    style={[styles.activityStatus, { color: item.statusColor }]}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>

              {/* Garis pemisah antar item */}
              {index < recentActivity.length - 1 && (
                <View style={styles.itemDivider} />
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const BLUE = "#1033c0";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f0f4ff",
  },
  scroll: {
    paddingBottom: 32,
  },

  // ── Header ──────────────────────────────────────────
  header: {
    backgroundColor: BLUE,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 60, // ruang untuk card overlap
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.4)",
  },
  logo: {
    width: 44,
    height: 44,
  },
  greetWrap: {
    flex: 1,
  },
  greetSub: {
    fontSize: 10,
    color: "rgba(255,255,255,0.65)",
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  greetName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
    marginTop: 1,
  },
  bellWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },

  // ── Card ────────────────────────────────────────────
  card: {
    marginHorizontal: 16,
    marginTop: -40,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  timeBlock: {
    flex: 1,
    alignItems: "flex-start",
    gap: 6,
  },
  timeLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#b0bbd4",
    letterSpacing: 1.2,
  },
  timeBig: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1a2340",
    letterSpacing: -0.5,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 4,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#16a34a",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  verticalDivider: {
    width: 1,
    height: "90%",
    backgroundColor: "#e8ecf5",
    marginHorizontal: 16,
    alignSelf: "center",
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: "#f0f4ff",
    marginBottom: 16,
  },
  btnRow: {
    flexDirection: "row",
    gap: 10,
  },
  btnGhost: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1.5,
    borderColor: "#dde3f0",
    borderRadius: 12,
    paddingVertical: 12,
    backgroundColor: "#f8f9fe",
  },
  btnGhostText: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#8492b0",
  },
  btnSolid: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: BLUE,
    borderRadius: 12,
    paddingVertical: 12,
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  btnSolidText: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#fff",
  },

  // ── Recent Activity ──────────────────────────────────
  section: {
    marginHorizontal: 16,
    marginTop: 24,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 18,
    shadowColor: "#3b5bdb",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1a2340",
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
  },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  activityInfo: {
    flex: 1,
    gap: 3,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1a2340",
  },
  activityLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  activityLocation: {
    fontSize: 12,
    color: "#b0bbd4",
    fontWeight: "500",
  },
  activityRight: {
    alignItems: "flex-end",
    gap: 3,
  },
  activityTime: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1a2340",
  },
  activityStatus: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  itemDivider: {
    height: 1,
    backgroundColor: "#f0f4ff",
    marginHorizontal: 4,
  },
});
