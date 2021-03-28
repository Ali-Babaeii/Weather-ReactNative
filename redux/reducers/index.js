import {
  SETTRUE,
  SETFALSE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
} from "../types";

const intialState = {
  modalStatus: false,
  data: [],
  error: "",
  isLoading:false,
  location:"",
  currentDay:""
};

const modalStatusReducer = (state = intialState, action) => {
  switch (action.type) {
    case SETFALSE:
      return { ...state, modalStatus: (state.modalStatus = false) };
    case SETTRUE:
      return { ...state, modalStatus: (state.modalStatus = true),currentDay:action.payload};
    default:
      return state;
  }
};

const fetchDataReducer = (state = intialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST: {
      return { ...state,isLoading:true };
    }
    case FETCH_DATA_SUCCESS: {
      return { ...state, data: action.payload,isLoading:false };
    }
    case FETCH_DATA_ERROR: {
      return { ...state, error: action.payload };
    }
  }

  return state;
};

const fetchLocationReducer = (state = intialState, action) => {
  switch (action.type) {
 
    case "FETCH_LOCATION_SUCCESS": {
      return { ...state, location: action.payload,isLoading:false};
    }

  }

  return state;
};
export { modalStatusReducer, fetchDataReducer,fetchLocationReducer };
