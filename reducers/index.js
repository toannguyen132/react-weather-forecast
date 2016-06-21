import weatherData from './weatherData';
import queryOptions from './queryOptions';
import screen from './screen';
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({weatherData, queryOptions, screen, form: formReducer})

export default rootReducer