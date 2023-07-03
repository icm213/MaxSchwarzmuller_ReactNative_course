import { FlatList, View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constans/colors";
import PlaceItem from "./PlaceItem";

function PlaceList({ places }) {
  if (places && places.length !== 0) console.log(places[0].title);

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>no places added yet!!</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(item) => <PlaceItem place={item} />}
    ></FlatList>
  );
}

export default PlaceList;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary100,
  },
});
