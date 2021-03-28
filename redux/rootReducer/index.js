import { combineReducers } from 'redux';
import {modalStatusReducer,fetchDataReducer,fetchLocationReducer} from '../reducers';

export default combineReducers({
    modalStatusReducer,
    fetchDataReducer,
    fetchLocationReducer
});