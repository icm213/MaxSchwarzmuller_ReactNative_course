import { useCallback, useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constans/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../../models/Place";

function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectImage, setSelectImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  function takeImageHandler(imageUri) {
    setSelectImage(imageUri);
  }

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  function savePlaceHandler() {
    const placeData = new Place(enteredTitle, selectImage, pickedLocation);
    onCreatePlace(placeData);
  }
  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>some text about sth</Text>
        <TextInput
          onChangeText={(enteredTxt) => setEnteredTitle(enteredTxt)}
          value={enteredTitle}
          style={styles.input}
        ></TextInput>
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>add place</Button>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: { padding: 12, flex: 1 },
  label: { fontWeight: "bold", marginBottom: 12, color: Colors.primary500 },
  input: {
    marginVertical: 4,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
    borderRadius: 5,
  },
});
