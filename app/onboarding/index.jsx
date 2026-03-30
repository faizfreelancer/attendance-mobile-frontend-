import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Animated,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Svg, {
  Rect,
  Circle,
  Path,
  Line,
  Text as SvgText,
  Image,
} from "react-native-svg";
import { ONBOARDING_KEY } from "../index";

const { width: SCREEN_W } = Dimensions.get("window");

// ─── Ilustrasi Slide 1 ───────────────────────────────────────────────────────
function Illus1() {
  return (
    <Svg width="240" height="220" viewBox="0 0 280 260">
      <Circle cx="140" cy="130" r="105" fill="#dde8ff" />
      <Rect
        x="60"
        y="55"
        width="160"
        height="180"
        rx="18"
        fill="#fff"
        stroke="#c5d3f5"
        strokeWidth="1.5"
      />
      <Rect x="72" y="73" width="136" height="13" rx="6" fill="#eef1fb" />
      <Rect x="72" y="93" width="100" height="9" rx="4" fill="#eef1fb" />
      <Rect
        x="72"
        y="110"
        width="80"
        height="95"
        rx="12"
        fill="#f4f6ff"
        stroke="#dde5f7"
        strokeWidth="1"
      />
      <Rect
        x="160"
        y="110"
        width="48"
        height="44"
        rx="12"
        fill="#f4f6ff"
        stroke="#dde5f7"
        strokeWidth="1"
      />
      <Rect
        x="160"
        y="161"
        width="48"
        height="44"
        rx="12"
        fill="#f4f6ff"
        stroke="#dde5f7"
        strokeWidth="1"
      />
      <Circle cx="112" cy="148" r="21" fill="#3b5bdb" opacity={0.12} />
      <Circle cx="112" cy="148" r="13" fill="#3b5bdb" />
      <Path
        d="M106 148 l4 4 7-8"
        stroke="#fff"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Rect
        x="84"
        y="178"
        width="56"
        height="8"
        rx="4"
        fill="#3b5bdb"
        opacity={0.2}
      />
      <Rect
        x="84"
        y="192"
        width="40"
        height="8"
        rx="4"
        fill="#3b5bdb"
        opacity={0.12}
      />
      <Rect x="163" y="117" width="38" height="6" rx="3" fill="#c5d3f5" />
      <Rect x="163" y="128" width="26" height="6" rx="3" fill="#dde8ff" />
      <Rect x="163" y="168" width="38" height="6" rx="3" fill="#c5d3f5" />
      <Rect x="163" y="179" width="26" height="6" rx="3" fill="#dde8ff" />
      <Circle cx="196" cy="70" r="22" fill="#3b5bdb" />
      <Circle cx="196" cy="70" r="16" fill="#5272e8" />
      <Line
        x1="196"
        y1="70"
        x2="196"
        y2="61"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Line
        x1="196"
        y1="70"
        x2="203"
        y2="74"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Circle cx="72" cy="64" r="13" fill="#22c55e" />
      <Path
        d="M66 64 l4 4 6-7"
        stroke="#fff"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Ilustrasi Slide 2 ───────────────────────────────────────────────────────
function Illus2() {
  return (
    <Svg width="240" height="220" viewBox="0 0 280 260">
      <Circle cx="140" cy="130" r="105" fill="#d3f9ee" />
      <Rect
        x="50"
        y="55"
        width="180"
        height="180"
        rx="18"
        fill="#fff"
        stroke="#b6edd8"
        strokeWidth="1.5"
      />
      <Rect
        x="65"
        y="72"
        width="148"
        height="20"
        rx="8"
        fill="#0d9467"
        opacity={0.1}
      />
      <SvgText
        x="139"
        y="86"
        fontSize="10"
        fontWeight="700"
        fill="#0d9467"
        textAnchor="middle"
      >
        Rekap Kehadiran Bulan Ini
      </SvgText>
      <Rect x="65" y="100" width="42" height="40" rx="10" fill="#d3f9ee" />
      <SvgText
        x="86"
        y="115"
        fontSize="9"
        fill="#0d9467"
        fontWeight="700"
        textAnchor="middle"
      >
        Hadir
      </SvgText>
      <SvgText
        x="86"
        y="130"
        fontSize="14"
        fill="#0d9467"
        fontWeight="800"
        textAnchor="middle"
      >
        18
      </SvgText>
      <Rect x="114" y="100" width="42" height="40" rx="10" fill="#fff0d9" />
      <SvgText
        x="135"
        y="115"
        fontSize="9"
        fill="#b45309"
        fontWeight="700"
        textAnchor="middle"
      >
        Lambat
      </SvgText>
      <SvgText
        x="135"
        y="130"
        fontSize="14"
        fill="#b45309"
        fontWeight="800"
        textAnchor="middle"
      >
        3
      </SvgText>
      <Rect x="163" y="100" width="48" height="40" rx="10" fill="#fee2e2" />
      <SvgText
        x="187"
        y="115"
        fontSize="9"
        fill="#dc2626"
        fontWeight="700"
        textAnchor="middle"
      >
        Absen
      </SvgText>
      <SvgText
        x="187"
        y="130"
        fontSize="14"
        fill="#dc2626"
        fontWeight="800"
        textAnchor="middle"
      >
        2
      </SvgText>
      <Rect x="65" y="150" width="148" height="65" rx="10" fill="#f7faf9" />
      <Rect
        x="76"
        y="195"
        width="14"
        height="12"
        rx="3"
        fill="#0d9467"
        opacity={0.4}
      />
      <Rect
        x="76"
        y="181"
        width="14"
        height="26"
        rx="3"
        fill="#0d9467"
        opacity={0.7}
      />
      <Rect x="76" y="171" width="14" height="36" rx="3" fill="#0d9467" />
      <Rect
        x="97"
        y="187"
        width="14"
        height="20"
        rx="3"
        fill="#0d9467"
        opacity={0.55}
      />
      <Rect x="97" y="173" width="14" height="34" rx="3" fill="#0d9467" />
      <Rect
        x="118"
        y="191"
        width="14"
        height="16"
        rx="3"
        fill="#0d9467"
        opacity={0.4}
      />
      <Rect
        x="118"
        y="178"
        width="14"
        height="29"
        rx="3"
        fill="#0d9467"
        opacity={0.7}
      />
      <Rect x="139" y="174" width="14" height="33" rx="3" fill="#0d9467" />
      <Rect
        x="160"
        y="185"
        width="14"
        height="22"
        rx="3"
        fill="#0d9467"
        opacity={0.6}
      />
      <Rect
        x="160"
        y="172"
        width="14"
        height="35"
        rx="3"
        fill="#0d9467"
        opacity={0.85}
      />
      <Circle cx="218" cy="66" r="20" fill="#3b5bdb" />
      <Path
        d="M218 57 a7 7 0 0 1 0 14 a7 7 0 0 1 0-14z"
        fill="#fff"
        opacity={0.9}
      />
      <Circle cx="218" cy="64" r="2.5" fill="#3b5bdb" />
      <Path d="M218 71 l-5 5 5 0 5 0 z" fill="#fff" opacity={0.9} />
      <Circle cx="63" cy="64" r="14" fill="#22c55e" />
      <Path
        d="M57 64 l4 4 6-7"
        stroke="#fff"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Ilustrasi Slide 3 ───────────────────────────────────────────────────────
function Illus3() {
  return (
    <Svg width="200" height="180" viewBox="0 0 200 180">
      <Circle cx="100" cy="90" r="80" fill="#ede9fe" />
      <Rect
        x="40"
        y="45"
        width="120"
        height="90"
        rx="16"
        fill="#fff"
        stroke="#c4b5fd"
        strokeWidth="1.5"
      />
      <Image
        x="88"
        y="53  "
        width="30"
        height="30"
        href={require("../../assets/images/google.png")}
      />
      <Rect x="52" y="89" width="96" height="7" rx="4.5" fill="#ede9fe" />
      <Rect x="64" y="101" width="72" height="7" rx="4.5" fill="#ede9fe" />
      <Circle cx="157" cy="50" r="18" fill="#22c55e" />
      <Path
        d="M149 50 l5 5 9-9"
        stroke="#fff"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="43" cy="130" r="10" fill="#7c3aed" opacity={0.25} />
      <Circle cx="163" cy="125" r="7" fill="#22c55e" opacity={0.3} />
    </Svg>
  );
}

// ─── Data slide ──────────────────────────────────────────────────────────────
const SLIDES = [
  {
    id: "1",
    chip: "Absensi Digital",
    chipColor: "#3b5bdb",
    chipBg: "#dde8ff",
    title: "Absen Kantor\nKapan Saja",
    desc: "Catat kehadiran kamu dengan mudah, cepat, dan akurat — langsung dari ponsel tanpa antre.",
    illustrationBg: "",
    Illustration: Illus1,
  },
  {
    id: "2",
    chip: "Rekap & Laporan",
    chipColor: "#0d9467",
    chipBg: "#d3f9ee",
    title: "Pantau Kehadiran\nTim Real-time",
    desc: "Lihat rekap harian, mingguan, dan bulanan dalam satu dasbor. Laporan otomatis siap setiap saat.",
    illustrationBg: "",
    Illustration: Illus2,
  },
  {
    id: "3",
    chip: "Siap Bekerja",
    chipColor: "#7c3aed",
    chipBg: "#ede9fe",
    title: "Mulai Dalam\nHitungan Detik",
    desc: "Masuk dengan akun Google kantor kamu dan langsung nikmati semua fiturnya.",
    illustrationBg: "",
    Illustration: Illus3,
  },
];

// ─── Komponen Dots ───────────────────────────────────────────────────────────
function Dots({ count, scrollX }) {
  return (
    <View style={styles.dotsRow}>
      {Array.from({ length: count }).map((_, i) => {
        const dotWidth = scrollX.interpolate({
          inputRange: [(i - 1) * SCREEN_W, i * SCREEN_W, (i + 1) * SCREEN_W],
          outputRange: [8, 22, 8],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange: [(i - 1) * SCREEN_W, i * SCREEN_W, (i + 1) * SCREEN_W],
          outputRange: [0.35, 1, 0.35],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={i}
            style={[styles.dot, { width: dotWidth, opacity }]}
          />
        );
      })}
    </View>
  );
}

// ─── Komponen SlideItem ──────────────────────────────────────────────────────
function SlideItem({ item }) {
  const { Illustration } = item;
  return (
    <View style={[styles.slide, { width: SCREEN_W }]}>
      <View
        style={[
          styles.illustrationArea,
          { backgroundColor: item.illustrationBg },
        ]}
      >
        <Illustration />
      </View>
      <View style={styles.textArea}>
        <View style={[styles.chip, { backgroundColor: item.chipBg }]}>
          <Text style={[styles.chipText, { color: item.chipColor }]}>
            {item.chip}
          </Text>
        </View>
        <Text style={styles.slideTitle}>{item.title}</Text>
        <Text style={styles.slideDesc}>{item.desc}</Text>
      </View>
    </View>
  );
}

// ─── Screen Utama ────────────────────────────────────────────────────────────
export default function OnboardingScreen() {
  const router = useRouter();
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false },
  );

  const handleMomentumEnd = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_W);
    setCurrentIndex(index);
  };

  const goNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      finishOnboarding();
    }
  };

  const finishOnboarding = async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, "true");
    router.replace("/(auth)");
  };

  const isLast = currentIndex === SLIDES.length - 1;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f4ff" />

      {!isLast && (
        <TouchableOpacity
          style={styles.skipBtn}
          onPress={finishOnboarding}
          activeOpacity={0.6}
        >
          <Text style={styles.skipText}>Lewati</Text>
        </TouchableOpacity>
      )}

      <Animated.FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumEnd}
        scrollEventThrottle={16}
      />

      <View style={styles.bottomArea}>
        <Dots count={SLIDES.length} scrollX={scrollX} />
        <TouchableOpacity
          style={styles.btnNext}
          onPress={goNext}
          activeOpacity={0.85}
        >
          <Text style={styles.btnNextText}>
            {isLast ? "Masuk Sekarang" : "Selanjutnya"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  skipBtn: {
    position: "absolute",
    top: 40,
    right: 24,
    zIndex: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  skipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#94a3c0",
  },
  slide: {
    flex: 1,
    alignItems: "center",
  },
  illustrationArea: {
    width: "100%",
    height: 340,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  textArea: {
    flex: 1,
    paddingHorizontal: 32,
    alignItems: "center",
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  chipText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1a2340",
    textAlign: "center",
    lineHeight: 36,
    marginBottom: 14,
  },
  slideDesc: {
    fontSize: 14,
    color: "#6b7a9f",
    textAlign: "center",
    lineHeight: 22,
  },
  bottomArea: {
    paddingHorizontal: 28,
    paddingBottom: 48,
    paddingTop: 16,
    backgroundColor: "#ffffff",
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginBottom: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3b5bdb",
  },
  btnNext: {
    backgroundColor: "#3b5bdb",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  
  btnNextText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});
