import { useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constans/colors";
import ImagePicker from "./ImagePicker";

function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState("");

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
      <ImagePicker />
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
