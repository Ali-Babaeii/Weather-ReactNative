import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Asset } from "expo-asset";
import { Provider } from "react-redux";
import store from "./redux/store";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import AsyncStorage from "@react-native-community/async-storage";
import StartScreen from "./Screens/Start";
import HomeScreen from "./Screens/Home";
import DetailsScreen from "./Screens/Details";
import { setTrue, fetchData } from "./redux/actions";

// NAVIGATION
const StackNavigator = createStackNavigator();

export default function App() {
  // const dispatch = useDispatch();

  const [cacheData,setCacheData]=useState("")
  const getData = () => {
    axios({
      method: "get",
      url:
        "https://api.mocki.io/v1/b043df5a",
      responseType: "json",
      headers: {},
    })
      .then(function (response) {
        // console.log("Response Data: ", response.data);
        console.log("yessss")
        setCacheData(response.data)
      })
      .catch(function (error) {
        console.log("Error Response: ", error.response);
      });
  };

  const saveData = async () => {
    try {


      await AsyncStorage.setItem("STORAGE_KEY",JSON.stringify(cacheData))
      alert('Data successfully saved')
    
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  }

  const readData = async () => {
    try {
      const userAge = await AsyncStorage.getItem("STORAGE_KEY")
console.log(userAge)
  
      // if (userAge !== null) {
        // setCacheData(userAge)
        store.dispatch(fetchData(0,0,userAge))
      // }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }

  useEffect(() => {
    
    // console.log(store.getState().fetchDataReducer.data)
// console.log(store.dispatch(fetchData()))
// readData()
    
    // showData( )
    // saveData();

  }, []);
  return (
    // <View></View>
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator.Navigator initialRouteName="StartScreen">
          <StackNavigator.Screen
            name="StartScreen"
            component={StartScreen}
            options={{ headerShown: false }}
          />

          <StackNavigator.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />

          <StackNavigator.Screen
            name="DetailsScreen"
            component={DetailsScreen}
            options={{ headerShown: false }}
          />
        </StackNavigator.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require("./assets/images/error.png"),
      require("./assets/images/sunLogo.png"),
      require("./assets/images/menu.png"),
      require("./assets/images/cloud.png"),
      require("./assets/images/mist.png"),
      require("./assets/images/snow.png"),
      require("./assets/images/thunderstorm.png"),
      require("./assets/images/clearDay.png"),
      require("./assets/images/clearNight.png"),
      require("./assets/images/fewCloudDay.png"),
      require("./assets/images/fewCloudNight.png"),
      require("./assets/images/clouds.png"),
      require("./assets/images/showerRain.png"),
      require("./assets/images/rainDay.png"),
      require("./assets/images/rainNight.png"),
      // require("./assets/images/details.png"),
      require("./assets/icons/close.png"),
      require("./assets/icons/sunny.png"),
      require("./assets/icons/cloudyDay.png"),
      require("./assets/icons/cloudyNight.png"),
      require("./assets/icons/windy.png"),
      require("./assets/icons/rainy.png"),
      require("./assets/icons/snow.png"),
    ]),
  ]);
}
