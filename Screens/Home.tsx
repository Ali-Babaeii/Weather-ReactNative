import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Keyboard,
  Pressable,
} from "react-native";
import ErrorConnection from "../components/ErrorConnection/index.js";
import { Ionicons } from "@expo/vector-icons";
import { Card, CardItem, Item } from "native-base";
import Carousel, { Pagination } from "react-native-snap-carousel";
import PlacesInput from "react-native-places-input";
import { useNavigation } from "@react-navigation/native";
import Details from "../Screens/Details";
import { useSelector, useDispatch } from "react-redux";
import { setTrue, fetchData, fetchLocation } from "../redux/actions";
import { colors } from "../constants/Theme";
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
const cloud = require("../assets/images/cloud.png");
const location = require("../assets/images/location.png");
const man = require("../assets/images/man.png");

// const error = require("../assets/images/error.png");

const width = Dimensions.get("window").width;

const sliderWidth = width * 1;

const mycolor = [
  "#FF0090",
  "#0090FF",
  "#FFAE00",
  "#209A79",
  "#FF1313",
  "#0051FF",
  "#FF0090",
  "#FFAE00",
];

var dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export default function HomeScreen() {
  const modalVisible = useSelector(
    (state) => state.modalStatusReducer.modalStatus
  );
  const isLoading = useSelector((state) => state.fetchDataReducer.isLoading);
  const data = useSelector((state) => state.fetchDataReducer.data);
  const getLocation = useSelector(
    (state) => state.fetchLocationReducer.location
  );

  const [locName, setLocName] = useState("");
  const dispatch = useDispatch();

  const currentConditions = data.current;
  const nextDays = data.daily.map((item) =>
    new Date(item.dt * 1000).toISOString().slice(0, 10).replace("T", " ")
  );

  const nextTemps = data.daily.map((item) => item.temp.day);
  const minTemps = data.daily.map((item) => item.temp.min);
  const maxTemps = data.daily.map((item) => item.temp.max);
  const weatherIcon = data.daily.map((item) => item.weather[0].icon);

  const convertToWeekday = (getDate) => {
    var date = new Date(getDate);
    var dayName = dayNames[date.getDay()];
    return dayName;
  };

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
  const mathRound = (Num) => {
    return Math.round(Num);
  };

  const _renderItem = ({ index }) => {
    return (
      <View>
        <Card style={styles.cardContainer}>
          <CardItem cardBody>
            <TouchableWithoutFeedback>
              <View
                style={{
                  backgroundColor: mycolor[index],
                  width: width / 1,
                  height: 186,
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <Text style={styles.nextDaysText}>
                  {convertToWeekday(nextDays[index])}
                </Text>

                <Image
                  style={styles.nextDaysIcon}
                  source={setIcon(weatherIcon[index])}
                />

                <Text style={styles.nextDaysDegree}>
                  {mathRound(nextTemps[index])}&#xb0;
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.minimumDegreeText}>
                    {mathRound(minTemps[index])}&#xb0;
                  </Text>
                  <Text style={styles.maximomDegreeText}>
                    {mathRound(maxTemps[index])}&#xb0;
                  </Text>
                </View>

                <Image style={styles.cardImage} source={cloud}></Image>
              </View>
            </TouchableWithoutFeedback>
          </CardItem>
        </Card>
      </View>
    );
  };

  if (isLoading == true) {
    return <ErrorConnection></ErrorConnection>;
  }
  return (
    <View style={styles.mainContainer}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <Details />
      </Modal>

      <PlacesInput
        googleApiKey={"AIzaSyAUoB_3Q7D9ZAg_astS-Gr9aW9wEONJkSs"}
        placeHolder={"Search Location"}
        language={"en-US"}
        onSelect={(place) => {
          dispatch(
            fetchData(
              place.result.geometry.location.lat,
              place.result.geometry.location.lng
            ),
            dispatch(
              fetchLocation(
                place.result.geometry.location.lat,
                place.result.geometry.location.lng
              )
            )
          ),
            Keyboard.dismiss();
          setLocName(place.result.name);
        }}
        iconResult={
          <Ionicons
            name="md-pin"
            size={25}
            color={colors.secondary}
            style={styles.placeIcon}
          />
        }
        stylesContainer={{ shadowColor: colors.white }}
        stylesInput={styles.placeInput}
        stylesItemText={{ color: colors.primary }}
      />

      <View style={styles.currentWeatherContainer}>
        <Pressable
          style={styles.pressableContainer}
          onPress={() => dispatch(setTrue(convertToWeekday(nextDays[0])))}
        >
          <Text style={styles.currentDegreeText}>
            {mathRound(currentConditions.temp)}&#xb0;
          </Text>
          <Text style={styles.currentWeatherText}>
            {currentConditions.weather[0].description}
          </Text>
          <Text style={styles.humidityText}>Humidity</Text>
          <Text style={styles.humidityDegreeText}>
            {mathRound(currentConditions.humidity)}
          </Text>
          <View style={styles.PressableBottomContainer}>
            <View style={styles.locationContainer}>
              <Image style={styles.locationIconStyle} source={location}></Image>
              <Text style={styles.locationText}>{getLocation}</Text>
            </View>
            <Text></Text>
            <Image
              style={{ width: 82, height: 82 }}
              source={setIcon(currentConditions.weather[0].icon)}
            ></Image>
          </View>
        </Pressable>
      </View>

      <View>
        <View style={styles.next7DaysContainer}>
          <Text style={styles.nextDaysTitle}>Next 7 days</Text>
          <Image
            style={{ width: 50, height: 50 }}
            resizeMode={"contain"}
            source={man}
          ></Image>
        </View>
        <Carousel
          data={nextDays}
          renderItem={_renderItem}
          sliderWidth={width * 1}
          itemWidth={width / 2.3}
          inactiveSlideScale={1}
          inactiveSlideOpacity={0.4}
          activeSlideAlignment="start"
          firstItem={0}
          useScrollView={false}
          onSnapToItem={(index) => {
            1;
          }}
        ></Carousel>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, marginTop: 12, backgroundColor: "white" },
  placesInputContainer: { marginTop: 24, flex: 1, zIndex: 1 },
  placeInput: {
    color: colors.primary,
    height: 40,
    fontWeight: "500",
    textAlign: "center",
    borderColor: "gray",
    borderRadius: 12,
    borderWidth: 0.5,
    backgroundColor: colors.white,
  },

  currentWeatherContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 60,
  },
  imageBackgroundContainer: {
    width: width,
    height: 250,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  currentDegreeText: { color: "white", fontSize: 88 },
  currentWeatherText: { color: "white", fontSize: 30 },
  humidityText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  humidityDegreeText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  currentWeatherIcon: {
    width: 82,
    height: 82,
    // position: "absolute",
    alignSelf: "flex-end",
    marginRight: 22,
    bottom: 4,
  },
  nextDaysTitle: {
    fontSize: 16,
    color: colors.primary,
    // alignSelf: "flex-start",
    // marginLeft: 12,
    // marginTop: 14,
    fontWeight: "500",
  },
  cardContainer: {
    overflow: "hidden",
    borderRadius: 10,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  nextDaysText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  nextDaysIcon: { height: 50, width: 50 },
  nextDaysDegree: {
    fontSize: 36,
    color: "white",
  },
  minimumDegreeText: {
    fontSize: 16,
    paddingHorizontal: 12,
    fontWeight: "bold",
    color: "white",
  },
  maximomDegreeText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 12,
    color: "white",
  },
  cardImage: { position: "absolute", bottom: -20 },
  errorConnection: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 12,
  },
  placeIcon: { position: "absolute", top: 10, right: 12 },
  pressableContainer: {
    backgroundColor: colors.secondary,
    flex: 1,
    margin: 12,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  PressableBottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },
  next7DaysContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 14,
  },
  locationText: { color: colors.white, fontSize: 20, fontWeight: "500" },
  locationIconStyle: { width: 30, height: 30, marginRight: 4 },
  locationContainer: { flexDirection: "row", alignItems: "center" },
});
