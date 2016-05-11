import weatherData from './weatherData';
import queryOptions from './queryOptions';
import dogeFrames from './dogeFrames';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({weatherData, queryOptions})

export default rootReducer