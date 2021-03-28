import React, { useEffect } from "react";

import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setFalse } from "../redux/actions";
import { colors } from "../constants/Theme";

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
const umbrella = require("../assets/icons/umbrella.png");
const coupleUmbrella= require("../assets/icons/raining.png");


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
  const currentDay = useSelector(
    (state) => state.modalStatusReducer.currentDay
  );

  const dispatch = useDispatch();
  const currentConditions = data.current;
  const minTemps = data.daily[0].temp.min;
  const maxTemps = data.daily[0].temp.max;
  const nextTemps = data.hourly.map((item) => item.temp);
  const id = data.hourly.map((item) => item);
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

  const mathRound = (Num) => {
    return Math.round(Num);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.nextHoursContainer}>
      <Text style={{fontSize:16}}>{nextHours[index]}</Text>
      <Image
        style={styles.nextHoursIcons}
        source={setCardIcon(nextIcons[index])}
      ></Image>
      <Text style={styles.nextTempsText}>{mathRound(nextTemps[index])}&#xb0;</Text>
    </View>
  );
  return (
      <View
        style={styles.mainContainer}
      >
        <View
          style={styles.currentContainer}
        >

          <TouchableOpacity
            style={styles.closeContainer}
            onPress={() => dispatch(setFalse())}
          >
            <Image
              style={styles.closeIcon}
              source={close}
            ></Image>
          </TouchableOpacity>

          <View style={styles.topContainer}>
          <Image style={styles.topIcons} source={umbrella}></Image>
          
          <Text
            style={styles.currentDayText}
          >
            {currentDay}
          </Text>
          <Image style={styles.topIcons} source={coupleUmbrella}></Image>
          </View>

          <Image
            style={styles.currentDayIcon}
            source={setIcon(currentConditions.weather[0].icon)}
          ></Image>
          <Text style={styles.currentDegreeText}>
            {mathRound(currentConditions.temp)}&#xb0;
          </Text>

          <Text>{useSelector((state) => state.modalStatus)}</Text>
          <View style={styles.minMaxContainer}>
            <Text
              style={styles.minText}
            >
              {mathRound(minTemps)}&#xb0;
            </Text>
            <Text
              style={styles.minText}
            >
              {mathRound(maxTemps)}&#xb0;
            </Text>
          </View>
        </View>
        <View
          style={styles.bottomContainer}
        >
          <FlatList
            horizontal
            data={id}
            renderItem={renderItem}
            keyExtractor={(item, index) => id[index].dt.toString()}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: colors.secondary,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
marginTop: 80
  },
  nextHoursContainer:{ padding: 20, alignItems: "center" },
  nextHoursIcons:{ height: 44, width: 44, marginVertical: 8 },
  currentContainer:{     flex: 1,
    alignItems: "center",
    justifyContent: "center",},
    closeContainer:{
      backgroundColor: "white",
      padding: 10,
      top: -18,
      position: "absolute",
      borderRadius: 50,
    },
    closeIcon:{ width: 28, height: 28, alignSelf: "center" },
    topContainer:{flexDirection:'row',width:'100%',justifyContent:'space-evenly',alignItems:'center'},
    topIcons:{width:52,height:52},
    currentDayText:{
      color: "white",
      fontSize: 42,
      fontWeight: "bold",
    },
    currentDayIcon:{ width: 100, height: 100, marginTop: 8 },
    currentDegreeText:{ color: "white", fontSize: 52, marginTop: 8 },
    minMaxContainer:{ flexDirection: "row", marginTop: 8 },
    minText:{
      color: "white",
      fontSize: 32,
      fontWeight: "600",
      paddingHorizontal: 44,
    },
    bottomContainer:{
      backgroundColor: "white",
      width: "90%",
      borderRadius: 20,
      marginBottom:32
 
    },
    nextTempsText:{ marginTop: 4,fontSize:16 }
});
