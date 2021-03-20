import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setFalse } from "../redux/actions";

const clearDay1 = require("../assets/detailsImages/clearDay.png");
const clearNight1 = require("../assets/detailsImages/clearNight.png");
const fewCloudDay1 = require("../assets/detailsImages/fewCloudDay.png");
const fewCloudNight1 = require("../assets/detailsImages/fewCloudNight.png");
const clouds1 = require("../assets/detailsImages/clouds.png");
const showerRain1 = require("../assets/detailsImages/showerRain.png");
const rainDay1 = require("../assets/detailsImages/rainDay.png");
const rainNight1 = require("../assets/detailsImages/rainNight.png");
const thunderstorm1 = require("../assets/detailsImages/thunderstorm.png");
const snow1 = require("../assets/detailsImages/snow.png");
const mist1 = require("../assets/detailsImages/mist.png");

const clearDay = require("../assets/images/clearDay.png");
const clearNight = require("../assets/images/clearNight.png");
const fewCloudDay = require("../assets/images/fewCloudDay.png");
const fewCloudNight = require("../assets/images/fewCloudNight.png");
const clouds = require("../assets/images/clouds.png");
const showerRain = require("../assets/images/showerRain.png");
const rainDay = require("../assets/images/rainDay.png");
const rainNight = require("../assets/images/rainNight.png");
const thunderstorm = require("../assets/images/thunderstorm.png");
const snow = require("../assets/images/snow.png");
const mist = require("../assets/images/mist.png");
const close = require("../assets/icons/close.png");

export default function Details() {
  const data = useSelector((state) => state.fetchDataReducer.data);
  const dispatch = useDispatch();
  const currentConditions = data.current;
  const minTemps = data.daily[0].temp.min;
  const maxTemps = data.daily[0].temp.max;
  const nextTemps = data.hourly.map((item) => item.temp);
  const id = data.hourly.map((item) => item.dt);
  const nextIcons = data.hourly.map((item) => item.weather[0].icon);
  const nextHours = data.hourly.map(
    (item) => new Date(item.dt * 1000).getHours() + ":00"
  );
  const setIcon = (iconAddress) => {
    switch (iconAddress) {
      case "01d":
        return clearDay;
      case "01n":
        return clearNight;
      case "02d":
        return fewCloudDay;
      case "02n":
        return fewCloudNight;
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        return clouds;
      case "09d":
      case "09n":
        return showerRain;
      case "10d":
        return rainDay;
      case "10n":
        return rainNight;
      case "11d":
      case "11n":
        return thunderstorm;
      case "13d":
      case "13n":
        return snow;
      case "50d":
      case "50n":
        return mist;
      default:
        return snow;
    }
  };

  const setCardIcon = (iconAddress) => {
    switch (iconAddress) {
      case "01d":
        return clearDay1;
      case "01n":
        return clearNight1;
      case "02d":
        return fewCloudDay1;
      case "02n":
        return fewCloudNight1;
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        return clouds1;
      case "09d":
      case "09n":
        return showerRain1;
      case "10d":
        return rainDay1;
      case "10n":
        return rainNight1;
      case "11d":
      case "11n":
        return thunderstorm1;
      case "13d":
      case "13n":
        return snow1;
      case "50d":
      case "50n":
        return mist1;
      default:
        return snow1;
    }
  };

  const currentDay = new Date();
  let weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][currentDay.getDay()];
  const Data = [
    {
      title: weekday,
      date: currentDay.getHours() + ":" + "00",
      time: "40&#xb0;",
      id: 0,
    },
    {
      title: "one",
      date: currentDay.getHours() + ":" + "00",
      time: "40&#xb0;",
      id: 1,
    },
    {
      title: "one",
      date: currentDay.getHours() + ":" + "00",
      time: "40&#xb0;",
      id: 2,
    },
    {
      title: "one",
      date: currentDay.getHours() + ":" + "00",
      time: "40&#xb0;",
      id: 3,
    },
    {
      title: "one",
      date: currentDay.getHours() + ":" + "00",
      time: "40&#xb0;",
      id: 4,
    },
    {
      title: "one",
      date: currentDay.getHours() + ":" + "00",
      time: "40&#xb0;",
      id: 5,
    },
  ];

  const mathRound = (Num) => {
    return Math.round(Num);
  };

  const renderItem = ({ item, index }) => (
    <View style={{ padding: 20, alignItems: "center" }}>
      <Text>{nextHours[index]}</Text>
      <Image
        style={{ height: 38, width: 38, marginVertical: 8 }}
        source={setCardIcon(nextIcons[index])}
      ></Image>
      <Text style={{ marginTop: 4 }}>{mathRound(nextTemps[index])}&#xb0;</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      {/* <ImageBackground
 style={{width:'100%',height:'100%',marginTop:94,flex:1,borderRadius:24}}
     resizeMode={"contain"}
     source={details}
> */}
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          backgroundColor: "#5D50FE",
          borderTopLeftRadius: 38,
          borderTopRightRadius: 38,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            padding: 10,
            top: -18,
            position: "absolute",
            borderRadius: 50,
          }}
          onPress={
            () =>
              // console.log(nextIcons[0])
              dispatch(setFalse())
            // console.log(id)
          }
        >
          <Image
            style={{ width: 26, height: 26, alignSelf: "center" }}
            source={close}
          ></Image>
        </TouchableOpacity>

        <Text
          style={{
            color: "white",
            fontSize: 38,
            fontWeight: "bold",
            marginTop: 18,
          }}
        >
          Monday
        </Text>
        <Image
          style={{ width: 100, height: 100, marginTop: 8 }}
          source={setIcon(currentConditions.weather[0].icon)}
        ></Image>
        <Text style={{ color: "white", fontSize: 52, marginTop: 8 }}>
          {mathRound(currentConditions.temp)}&#xb0;
        </Text>

        <Text>{useSelector((state) => state.modalStatus)}</Text>
        <View style={{ flexDirection: "row", marginTop: 8 }}>
          <Text
            style={{
              color: "white",
              fontSize: 26,
              fontWeight: "600",
              paddingHorizontal: 44,
            }}
          >
            {mathRound(minTemps)}&#xb0;
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 26,
              fontWeight: "600",
              paddingHorizontal: 44,
            }}
          >
            {mathRound(maxTemps)}&#xb0;
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "white",
            width: "90%",
            borderRadius: 20,
            marginTop: 32,
            bottom: 16,
          }}
        >
          <FlatList
            horizontal
            data={id}
            renderItem={renderItem}
            // keyExtractor={item => item.id.toString()}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", marginTop: 90 },
});
