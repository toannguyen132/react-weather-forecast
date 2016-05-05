import weatherData from './weatherData';
import queryOptions from './queryOptions';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({weatherData, queryOptions})

export default rootReducer