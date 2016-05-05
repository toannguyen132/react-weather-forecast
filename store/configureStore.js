import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {devTools, persistState} from 'redux-devtools';
// import * as reducers from '../reducers/index';
import weatherData from '../reducers/weatherData';
import queryOptions from '../reducers/queryOptions';

let createStoreWithMiddleware;

// Configure the dev tools when in DEV mode
let __DEV__ = false
if (__DEV__) {
  createStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleware),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
}

const rootReducer = combineReducers({weatherData, queryOptions});

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
