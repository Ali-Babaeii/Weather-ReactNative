import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { fetchData, fetchLocation } from "../redux/actions";
import ErrorConnection from "../components/ErrorConnection/index.js";

const MainImage = require("../assets/images/main.png");
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
export default function App() {
  const isLoading = useSelector((state) => state.fetchDataReducer.isLoading);
  const data = useSelector((state) => state.fetchDataReducer.data);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const request = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      let location = await Location.getCurrentPositionAsync({});
      dispatch(fetchData(location.coords.latitude, location.coords.longitude));
      dispatch(
        fetchLocation(location.coords.latitude, location.coords.longitude)
      );
    } else {
      Alert.alert("Please turn on your location service and try again");
    }
  };

  useEffect(() => {
    request();
    // dispatch(fetchData());
  }, []);

  if (isLoading == true || data.lat == undefined)
    return <ErrorConnection></ErrorConnection>;

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={MainImage}></Image>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Text style={styles.text}>EXPLORE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5D50FE",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    position: "absolute",
    marginBottom: 32,
    bottom: 0,
    backgroundColor: "white",
    width: 220,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  text: { color: "#130E51", fontWeight: "bold", fontSize: 16 },
  image: {
    width: "100%",
    height: "90%",
    position: "absolute",
    bottom: 0,
  },
});
