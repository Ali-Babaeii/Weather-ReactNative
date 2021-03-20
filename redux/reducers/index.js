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
  isLoading:false
};

const modalStatusReducer = (state = intialState, action) => {
  switch (action.type) {
    case SETFALSE:
      return { ...state, modalStatus: (state.modalStatus = false) };
    case SETTRUE:
      return { ...state, modalStatus: (state.modalStatus = true) };
    default:
      return state;
  }
};

const fetchDataReducer = (state = intialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST: {
      return { ...state,  data: action.payload,isLoading:false };
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

export { modalStatusReducer, fetchDataReducer };
