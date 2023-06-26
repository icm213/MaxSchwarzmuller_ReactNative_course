import { Alert, View, Button } from "react-native";
import {
  // launchCameraAsync, <= IMPOSSIBLE TO USE AT THIS MOMENT, BCS OF EXPO GO ISSUE (?)
  launchImageLibraryAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

function ImagePicker() {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

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
    console.log("ddddddddddddddkjjkjjjjjjjjd");
    const image = await launchImageLibraryAsync();
    // ({
    //   allowsEditing: true,
    //   aspect: [16, 9],
    //   quality: 0.5,
    // });
    console.log("gowwfwef");
  }
  return (
    <View>
      <View></View>
      <Button title="take an image" onPress={takeImageHandler}></Button>
    </View>
  );
}

export default ImagePicker;
