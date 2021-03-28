import {
  SETTRUE,
  SETFALSE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
} from "../types";



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
export const fetchLocationSuccess = (loc) => {
  return {
    type: "FETCH_LOCATION_SUCCESS",
    payload: loc,
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

export const setTrue = (day) => {
  return {
    type: SETTRUE,
    payload:day
  };
};



export const fetchData = (lat, lng) => {
  return async (dispatch) => {

    dispatch(fetchDataRequest());
    try {
      const response = await fetch(
        
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lng +
          "&exclude=minutely&units=metric&appid=5d0288071e5fa7919d4766e818916496"
          
      );
      const json = await response.json();


      dispatch(fetchDataSuccess(json));

    } catch (error) {
      dispatch(fetchDataError(error));
    }
  };
};

export const fetchLocation=(lat,lon)=>{

    return async (dispatch) => {

      // dispatch(fetchLocationRequest());
      try {
        const response = await fetch(
          "https://maps.googleapis.com/maps/api/geocode/json?address=" +
     lat +
      "," +
      lon +
      "&key=" +
      "AIzaSyAUoB_3Q7D9ZAg_astS-Gr9aW9wEONJkSs"
            
        );
        const json = await response.json();
      
  
        let location = JSON.stringify(
          json.results[0].address_components[2].long_name
        )
        dispatch(fetchLocationSuccess(JSON.parse(location)));

      } catch (error) {
        // dispatch(fetchLocationError(error));
      }
    };
};

// https://api.mocki.io/v1/b043df5a
