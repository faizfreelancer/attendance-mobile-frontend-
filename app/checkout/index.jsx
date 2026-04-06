import { BackHeader } from "@/components/BackHeader";
import { BottomBar } from "@/components/BottomBar";
import { ListsSection } from "@/components/ListsSection";
import { PhotoCard } from "@/components/PhotoCard";
import { useCamera } from "@/hooks/useCamera";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { useLists } from "@/hooks/useLists";
import { useLocationCheck } from "@/hooks/useLocationCheck";
import {
    Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NoteSection } from "../../components/NotesSection";
import { useNote } from "../../hooks/useNote";
import { checkout } from "../../services/checkoutService";

export default function CheckInScreen() {
  const currentTime = useCurrentTime();
  const { location, isInRange } = useLocationCheck();
  const { note, setNote } = useNote();
  const { Lists, inputList, setInputList, handleAddList, handleRemoveList } =
    useLists();

  const {
    cameraRef,
    permission,
    requestPermission,
    previewUri,
    photoUri,
    isCapturing,
    handleTakePhoto,
    handleAcceptPhoto,
    handleRetake,
    handleResetPhoto,
  } = useCamera();

  const handleCheckout = async () => {
    try {
      const data = await checkout(
        location.coords.latitude,
        location.coords.longitude,
        note,
        { uri: photoUri },
        Lists.map((t) => t.text),
      );
      Alert.alert("Sukses", "Check-out berhasil!");
      console.log("Check-out berhasil:", data);
    } catch (e) {
      Alert.alert("Gagal", "Check-out gagal!");
      console.error("Check-out gagal:", e);
      console.log("STATUS:", e.response?.status );
      console.log("DATA:", e.response?.data);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <BackHeader page="Check Out" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <PhotoCard
              cameraRef={cameraRef}
              permission={permission}
              requestPermission={requestPermission}
              previewUri={previewUri}
              photoUri={photoUri}
              isCapturing={isCapturing}
              onTakePhoto={handleTakePhoto}
              onAcceptPhoto={handleAcceptPhoto}
              onRetake={handleRetake}
              onResetPhoto={handleResetPhoto}
            />

            <NoteSection note={note} onChangeNote={setNote} page="Check Out" />

            <ListsSection
              Lists={Lists}
              inputList={inputList}
              onChangeInput={setInputList}
              onAdd={handleAddList}
              onRemove={handleRemoveList}
              placeholder="Tambah tugas yang sudah dikerjakan..."
            />

            <View style={{ height: 120 }} />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <BottomBar
        currentTime={currentTime}
        isInRange={isInRange}
        photoUri={photoUri}
        onSubmit={handleCheckout}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#ffffff" },
  scroll: { paddingTop: 16, paddingHorizontal: 16 },
});
