import { useCameraPermissions } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import { useRef, useState } from "react";

export function useCamera() {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [previewUri, setPreviewUri] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleTakePhoto = async () => {
    if (!cameraRef.current || isCapturing) return;
    try {
      setIsCapturing(true);
      const raw = await cameraRef.current.takePictureAsync({
        quality: 1,
        skipProcessing: true,
      });
      const compressed = await ImageManipulator.manipulateAsync(
        raw.uri,
        [
          { resize: { width: 720 } },
          { flip: ImageManipulator.FlipType.Horizontal },
        ],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG },
      );
      setPreviewUri(compressed.uri);
    } catch (e) {
      console.error("Gagal ambil foto:", e);
    } finally {
      setIsCapturing(false);
    }
  };

  const handleAcceptPhoto = () => {
    setPhotoUri(previewUri);
    setPreviewUri(null);
  };

  const handleRetake = () => setPreviewUri(null);

  const handleResetPhoto = () => setPhotoUri(null);

  return {
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
  };
}
