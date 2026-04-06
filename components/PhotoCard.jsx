import { Ionicons } from "@expo/vector-icons";
import { CameraView } from "expo-camera";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";

const BLUE = "#1033c0";

// ─── Sub-components ──────────────────────────────────────────────────────────

function PermissionBox({ onGrant }) {
  return (
    <View style={styles.permissionBox}>
      <Ionicons name="camera-outline" size={36} color="#b0bbd4" />
      <Text style={styles.permissionText}>Kamera belum diizinkan</Text>
      <TouchableOpacity
        style={styles.grantBtn}
        onPress={onGrant}
        activeOpacity={0.85}
      >
        <Text style={styles.grantBtnText}>Izinkan Kamera</Text>
      </TouchableOpacity>
    </View>
  );
}

function PreviewMode({ uri, onRetake, onAccept }) {
  return (
    <View style={styles.photoBox}>
      <Image source={{ uri }} style={styles.photoImage} />
      <View style={styles.previewOverlay}>
        <TouchableOpacity
          style={[styles.previewBtn, { backgroundColor: "#ef4444" }]}
          onPress={onRetake}
          activeOpacity={0.85}
        >
          <Ionicons name="close" size={15} color="#fff" />
          <Text style={styles.previewBtnText}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.previewBtn, { backgroundColor: "#22c55e" }]}
          onPress={onAccept}
          activeOpacity={0.85}
        >
          <Ionicons name="checkmark" size={15} color="#fff" />
          <Text style={styles.previewBtnText}>Gunakan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function PhotoResult({ uri, onReset }) {
  return (
    <View style={styles.photoBox}>
      <Image source={{ uri }} style={styles.photoImage} />
      <TouchableOpacity
        style={styles.retakeBtn}
        onPress={onReset}
        activeOpacity={0.85}
      >
        <Ionicons name="camera" size={14} color="#fff" />
        <Text style={styles.retakeBtnText}>Retake Photo</Text>
      </TouchableOpacity>
    </View>
  );
}

function LiveCamera({ cameraRef, isCapturing, onTakePhoto }) {
  return (
    <View style={styles.photoBox}>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing="front"
      />
      <TouchableOpacity
        style={styles.shutterBtn}
        onPress={onTakePhoto}
        activeOpacity={0.85}
        disabled={isCapturing}
      >
        {isCapturing ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <>
            <Ionicons name="camera" size={14} color="#fff" />
            <Text style={styles.retakeBtnText}>Ambil Foto</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function PhotoCard({
  cameraRef,
  permission,
  requestPermission,
  previewUri,
  photoUri,
  isCapturing,
  onTakePhoto,
  onAcceptPhoto,
  onRetake,
  onResetPhoto,
}) {
  const renderContent = () => {
    if (!permission) {
      return <ActivityIndicator color={BLUE} style={{ marginVertical: 32 }} />;
    }
    if (!permission.granted) {
      return <PermissionBox onGrant={requestPermission} />;
    }
    if (previewUri) {
      return (
        <PreviewMode
          uri={previewUri}
          onRetake={onRetake}
          onAccept={onAcceptPhoto}
        />
      );
    }
    if (photoUri) {
      return <PhotoResult uri={photoUri} onReset={onResetPhoto} />;
    }
    return (
      <LiveCamera
        cameraRef={cameraRef}
        isCapturing={isCapturing}
        onTakePhoto={onTakePhoto}
      />
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardTopRow}>
        <View>
          <Text style={styles.verifLabel}>VERIFICATION</Text>
          <Text style={styles.verifTitle}>Ambil Foto Selfie</Text>
        </View>
        <View style={styles.cameraIconWrap}>
          <Ionicons name="camera" size={18} color={BLUE} />
        </View>
      </View>
      {renderContent()}
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  verifLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#b0bbd4",
    letterSpacing: 1.5,
    marginBottom: 3,
  },
  verifTitle: { fontSize: 17, fontWeight: "800", color: "#1a2340" },
  cameraIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#eef1fb",
    alignItems: "center",
    justifyContent: "center",
  },
  photoBox: {
    height: 500,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#6b7fa3",
    borderWidth: 1.5,
    borderColor: "#6b7fa3",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  photoImage: { width: "100%", height: "100%" },
  shutterBtn: {
    position: "absolute",
    bottom: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#1033c0",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  retakeBtn: {
    position: "absolute",
    bottom: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#1033c0",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  retakeBtnText: { fontSize: 13, fontWeight: "700", color: "#fff" },
  previewOverlay: {
    position: "absolute",
    bottom: 14,
    flexDirection: "row",
    gap: 10,
  },
  previewBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
  },
  previewBtnText: { fontSize: 13, fontWeight: "700", color: "#fff" },
  permissionBox: {
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#f8f9fe",
    borderRadius: 14,
  },
  permissionText: { fontSize: 13, color: "#8492b0", fontWeight: "600" },
  grantBtn: {
    backgroundColor: BLUE,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 9,
  },
  grantBtnText: { fontSize: 13, fontWeight: "700", color: "#fff" },
});
