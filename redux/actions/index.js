import {
  SETTRUE,
  SETFALSE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
} from "../types";

import AsyncStorage from "@react-native-community/async-storage";


export const fetchDataRequest = (data) => {
  return {
    type: FETCH_DATA_REQUEST,
    payload: data,

  };
};
export const fetchDataSuccess = (data) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data,
  };
};

export const fetchDataError = (erros) => {
  return { type: FETCH_DATA_ERROR, payload: erros };
};

export const setFalse = () => {
  return {
    type: SETFALSE,
  };
};

export const setTrue = () => {
  return {
    type: SETTRUE,
  };
};



export const fetchData = (lat, lng,userAge) => {
  return async (dispatch) => {
    if (lat == null && lng == null) {
      lat = "35.832622";
      lng = "50.948702";
    }
    dispatch(fetchDataRequest(userAge));
    try {
      const response = await fetch(
        
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lng +
          "&exclude=minutely&units=metric&appid=5d0288071e5fa7919d4766e818916496"
          
      );
      const json = await response.json();
      // console.log(lat+"   "+lng);
      await AsyncStorage.setItem("STORAGE_KEY",JSON.stringify(json))

      dispatch(fetchDataSuccess(json));
      console.log("data recieved")
    } catch (error) {
      dispatch(fetchDataError(error));
    }
  };
};

// https://api.mocki.io/v1/b043df5a
// await AsyncStorage.setItem("STORAGE_KEY",JSON.stringify(json))
// const userAge = await AsyncStorage.getItem("STORAGE_KEY")