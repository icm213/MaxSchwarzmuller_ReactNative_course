import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

function Map({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState();
  const region = {
    latitude: 37.37,
    longitude: -122.02,
    latitudeDelta: 0.092,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat, lng });
    console.log("log from map component: ", selectedLocation);
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("no location picked", "pick a location");
      return;
    }

    navigation.navigate("AddPlace", {
      pickdeLat: selectedLocation.lat,
      pickdeLgn: selectedLocation.lgn,
    }),
      [navigation, selectedLocation];
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);
  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="picked location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        ></Marker>
      )}
    </MapView>
  );
}

export default Map;
const styles = StyleSheet.create({
  map: { flex: 1 },
});
