import { combineReducers } from 'redux';
import {modalStatusReducer,fetchDataReducer} from '../reducers';

export default combineReducers({
    modalStatusReducer,
    fetchDataReducer
});