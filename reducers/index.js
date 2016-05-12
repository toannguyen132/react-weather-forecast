import weatherData from './weatherData';
import queryOptions from './queryOptions';
import screen from './screen';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({weatherData, queryOptions, screen})

export default rootReducer