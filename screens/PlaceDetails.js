import { StyleSheet, View } from "react-native";
import { Text } from "react-native";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constans/colors";
import { useEffect } from "react";

function PlaceDetails({ route }) {
  function showOnMapHandler() {}

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {}, [selectedPlaceId]);
  return (
    <ScrollView>
      <Image style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>address</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          view on map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  image: { height: "35%", minHeight: 300, width: "100%" },
  locationContainer: { justifyContent: "center", alignItems: "center" },
  addressContainer: { padding: 12 },
  address: { color: Colors.primary500, textAlign: "center" },
});
