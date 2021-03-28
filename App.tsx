import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Asset } from "expo-asset";
import { Provider } from "react-redux";
import store from "./redux/store";

import StartScreen from "./Screens/Start";
import HomeScreen from "./Screens/Home";
import DetailsScreen from "./Screens/Details";
const StackNavigator = createStackNavigator();

export default function App() {
  useEffect(() => {
    loadResourcesAsync()
    // store.getState().fetchDataReducer.data
  }, []);
  return (
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
      require("./assets/images/man.png"),
      require("./assets/images/location.png"),
      require("./assets/icons/close.png"),
      require("./assets/icons/sunny.png"),
      require("./assets/icons/cloudyDay.png"),
      require("./assets/icons/cloudyNight.png"),
      require("./assets/icons/windy.png"),
      require("./assets/icons/rainy.png"),
      require("./assets/icons/snow.png"),
      require("./assets/icons/raining.png"),
      require("./assets/icons/umbrella.png"),

    ]),
  ]);
}
