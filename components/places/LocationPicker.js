import { Alert, StyleSheet, View, Image, Text } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constans/colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useState } from "react";
import getMapPreview from "../../util/location";
import { useNavigation } from "@react-navigation/native";

function LocationPicker() {
  const navigation = useNavigation();
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();
  const [currentLocation, setCurrentLocation] = useState();
  async function verifyPermissions() {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      const permissionResponse = await requestPermission();
      Alert.alert("insufficient permissions!!");
      return false;
    }
    return true;
  }
  async function getLocationHander() {
    const hasPermission = verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    setCurrentLocation({
      lat: location.coords.latitude,
      lgn: location.coords.longitude,
    });
    console.log(location);
  }
  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = <Text>No location picked</Text>;

  if (currentLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(currentLocation.lat, currentLocation.lgn),
        }}
      />
    );
    console.log(getMapPreview(currentLocation.lat, currentLocation.lgn));
  }
  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHander}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick up Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  locationPicker: {
    marginHorizontal: 12,
  },
  mapPreview: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 200,
    backgroundColor: Colors.primary100,
    borderRadius: 6,
  },
  actions: {
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: { width: "100%", height: "100%", borderRadius: 6 },
});
