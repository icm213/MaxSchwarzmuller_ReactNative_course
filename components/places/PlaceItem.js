import { Pressable, View, StyleSheet, Image, Text } from "react-native";
import { Colors } from "../../constans/colors";

function PlaceItem({ place, onSelect }) {
  return (
    <Pressable
      onPress={onSelect.bind(this, place.id)}
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
    >
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    margin: 12,
    backgroundColor: Colors.primary500,
  },
  pressed: { opacity: 0.9 },
  image: { flex: 1, height: 100 },
  info: { flex: 2 },
  address: { fontSize: 12, color: Colors.gray700 },
  title: { fontSize: 15, color: Colors.gray700 },
});
