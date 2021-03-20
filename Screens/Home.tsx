import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
  Modal,
  Keyboard,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Card, CardItem, Item } from "native-base";
import Carousel, { Pagination } from "react-native-snap-carousel";
import PlacesInput from "react-native-places-input";
import { useNavigation } from "@react-navigation/native";
import Details from "../Screens/Details";
import { useSelector, useDispatch } from "react-redux";
import { setTrue, fetchData } from "../redux/actions";
import { colors } from "../constants/Theme";
import {SetIcon} from '../components/SetIcon/index.js'
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
const menu = require("../assets/images/menu.png");
const sunLogo = require("../assets/images/sunLogo.png");
const error = require("../assets/images/error.png");

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
  const [firstItem, setFirstItem] = useState("metric");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const currentConditions = data.current;
  const nextDays = data.daily.map((item) =>
    new Date(item.dt * 1000).toISOString().slice(0, 10).replace("T", " ")
  );

  const nextTemps = data.daily.map((item) => item.temp.day);
  const minTemps = data.daily.map((item) => item.temp.min);
  const maxTemps = data.daily.map((item) => item.temp.max);
  const weatherIcon = data.daily.map((item) => item.weather[0].icon);

  const convertToWeekday = (getDate) => {
    var d = new Date(getDate);
    var dayName = dayNames[d.getDay()];
    return dayName;
  };

  useEffect(() => {
    // fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + 35.832622 + ',' + 50.948702 + '&key=' + 'AIzaSyAUoB_3Q7D9ZAg_astS-Gr9aW9wEONJkSs')
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //         console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson.results[0].address_components[1]));
// })
    // console.log(nextDays);
    // console.log(currentConditions.weather[0].icon)
    // fetch("https://api.mocki.io/v1/b043df5a")
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     // console.log(responseJson.current.weather[0].description);
    //     setIsLoading(true);
    //     console.log(fetchData)
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     setIsLoading(false);
    //   });
  }, []);

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

  const _checkConnection = () => {
    if (isLoading == true) {
      navigation.navigate("HomeScreen");
    }
  };

  const _renderItem = ({ index }) => {
   
    
    return (
      <View>
        <Card style={styles.cardContainer}>
          <CardItem cardBody>
            <TouchableWithoutFeedback
              onPress={() => console.log(convertToWeekday(nextDays[index]))}
            >
              <View
                style={{
                  backgroundColor: mycolor[index],
                  width: width / 1,
                  height: 166,
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <Text style={styles.nextDaysText}>
                  {convertToWeekday(nextDays[index])}
                </Text>

                <Image style={styles.nextDaysIcon} source={setIcon(weatherIcon[index])} />

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

  const styles = StyleSheet.create({
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
    dotContainerStyle: {
      position: "absolute",
      marginHorizontal: 0,
      marginVertical: 0,
      justifyContent: "center",
      alignSelf: "center",
    },
    dotStyle: {
      width: 12,
      height: 12,
      borderRadius: 22,
      marginHorizontal: 0.2,
      backgroundColor: "#E7E4FF",
    },
 
    currentWeatherContainer: {
      marginTop: 30,
      alignItems: "center",
    },
    imageBackgroundContainer: {
      width: width,
      height: 250,
      marginTop: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    currentDegreeText: { color: "white", fontSize: 82 },
    currentWeatherText: { color: "white", fontSize: 20 },
    humidityText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 16,
    },
    humidityDegreeText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 6,
    },
    currentWeatherIcon: {
      width: 72,
      height: 72,
      position: "absolute",
      bottom: 14,
      right: 30,
    },
    nextDaysTitle: {
      fontSize: 16,
      color: colors.primary,
      alignSelf: "flex-start",
      marginLeft: 12,
      marginTop: 14,
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
      fontSize: 16,
      fontWeight: "bold",
      color: "white",
    },
    nextDaysIcon: { height: 42, width: 42 },
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
  });

  if (isLoading == true) {
    return (
      <View style={{justifyContent:'center',alignItems:'center',flex:1,backgroundColor:colors.secondary}}>
         <ActivityIndicator style={{alignSelf:'center'}} size="large" color={colors.white}/> 
<Text style={{color:colors.white,fontSize:16,fontWeight:'500',marginTop:14}}>please Wait...</Text>
<Image style={{width:120,height:120,top:0,position:'absolute',alignSelf:'center'}} source={sunLogo}></Image>
      </View>
    );
  }
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <Details />
      </Modal>
      <View style={styles.placesInputContainer}>
        <PlacesInput
          backgroundColor={"green"}
          googleApiKey={"AIzaSyAUoB_3Q7D9ZAg_astS-Gr9aW9wEONJkSs"}
          placeHolder={data.timezone}
          language={"en-US"}
          onSelect={(place) => (
            dispatch(
              fetchData(
                place.result.geometry.location.lat,
                place.result.geometry.location.lng
              )
            ),
            Keyboard.dismiss()
          )}
          // onSelect={place => {
          //     this.props.goToPoint(get(place, 'result.geometry.location.lat'), get(place, 'result.geometry.location.lng'))
          // }}
          // iconResult={<Ionicons name="md-pin" size={25} style={styles.placeIcon}/>}
          stylesContainer={{ shadowColor: colors.white }}
          stylesInput={styles.placeInput}
          stylesItemText={{ color: colors.primary }}
        />
      </View>

      <View style={styles.currentWeatherContainer}>
        <Pressable
          onPress={
            () => dispatch(setTrue())
            // console.log(data.daily.map((item)=>item.temp.day))
          }
        >
          <ImageBackground
            style={styles.imageBackgroundContainer}
            resizeMode={"contain"}
            source={menu}
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
            <Image style={styles.currentWeatherIcon} source={setIcon(currentConditions.weather[0].icon)}></Image>
          </ImageBackground>
        </Pressable>
        <Text style={styles.nextDaysTitle}>Next 7 days</Text>
        <Carousel
          data={dayNames}
          renderItem={_renderItem}
          sliderWidth={width * 1}
          itemWidth={width / 2.3}
          inactiveSlideScale={1}
          inactiveSlideOpacity={0.4}
          activeSlideAlignment="start"
          firstItem={0}
          useScrollView={false}
          onSnapToItem={(index) => setFirstItem(index)}
        ></Carousel>
      </View>
    </View>
  );
}
