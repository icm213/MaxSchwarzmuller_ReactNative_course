import { Text, Alert, View, Button, Image, StyleSheet } from "react-native";
import {
  // launchCameraAsync, <= IMPOSSIBLE TO USE AT THIS MOMENT, BCS OF EXPO GO ISSUE (?)
  launchImageLibraryAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constans/colors";
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker({ onTakeImage }) {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  const [imageURI, setImageURI] = useState();

  async function verifyPermissions() {
    if (verifyPermissions.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (verifyPermissions.status === PermissionStatus.DENIED) {
      const permissionResponse = await requestPermission();
      Alert.alert("insufficient permissions!!");
      return false;
    }
    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await launchImageLibraryAsync();
    // ({
    //   allowsEditing: true,
    //   aspect: [16, 9],
    //   quality: 0.5,
    // });
    setImageURI(image.assets[0].uri);
    onTakeImage(image.assets[0].uri);
  }

  let imagePreview = <Text style={styles.testText}>No image yet..</Text>;

  if (imageURI) {
    imagePreview = <Image style={styles.image} source={{ uri: imageURI }} />;
  }

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <View style={styles.btnContainer}>
        <OutlinedButton icon="camera" onPress={takeImageHandler}>
          Take an Image
        </OutlinedButton>
        <OutlinedButton icon="trash-outline" onPress={() => setImageURI("")}>
          Delete an Image
        </OutlinedButton>
      </View>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePicker: { margin: 12 },
  btnContainer: {
    marginVertical: 16,
    gap: 12,
  },
  testText: { color: Colors.primary700 },
  imagePreview: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 200,
    backgroundColor: Colors.primary100,
    borderRadius: 6,
  },
  image: { width: "100%", height: "100%" },
});
