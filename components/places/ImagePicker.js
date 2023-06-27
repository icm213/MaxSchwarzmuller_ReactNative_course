import { Text, Alert, View, Button, Image, StyleSheet } from "react-native";
import {
  // launchCameraAsync, <= IMPOSSIBLE TO USE AT THIS MOMENT, BCS OF EXPO GO ISSUE (?)
  launchImageLibraryAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";

function ImagePicker() {
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
  }

  let imagePreview = <Text style={styles.testText}>No image yet..</Text>;

  if (imageURI) {
    imagePreview = (
      <Image style={styles.imagePreview} source={{ uri: imageURI }} />
    );
  }

  return (
    <View>
      <View>{imagePreview}</View>
      <View style={styles.btnContainer}>
        <Button title="take an image" onPress={takeImageHandler}></Button>
        <Button onPress={() => setImageURI("")} title="delete image"></Button>
      </View>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  btnContainer: {
    padding: 12,
    gap: 12,
  },
  testText: { color: "#fff" },
  imagePreview: { width: "100%", height: 200 },
});
