import PlaceList from "../components/places/PlaceList";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { fetchPlaces } from "../util/database";

function AllPlaces({ route }) {
  const isFocused = useIsFocused();
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }
    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return <PlaceList places={loadedPlaces}></PlaceList>;
}

export default AllPlaces;
