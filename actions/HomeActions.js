import {WEATHER_DATA_FETCH,
		WEATHER_DATA_SUCCEEDED,
		WEATHER_DATA_FAILED,
		CHANGE_FETCH_OPTIONS,
		GET_CURRENT_LOC,
		GET_CURRENT_LOC_SUCCESS,
		SCREEN_CHANGED} from '../constants/ActionTypes';

require('isomorphic-fetch');

export function loadWeatherData(query = '') {
	return {
		type: WEATHER_DATA_FETCH,
		query: query
	}
}

export function loadWeatherDataSuccess(data) {
	return {
		type: WEATHER_DATA_SUCCEEDED,
		data: data
	}
}

export function loadWeatherDataFailed(err) {
	return {
		type: WEATHER_DATA_FAILED,
		err: err
	}
}

export function updateLocationOptions(options){
	return {
		type: CHANGE_FETCH_OPTIONS,
		options
	}
}

export function changeLocation(location){
	return {
		type: CHANGE_FETCH_OPTIONS,
		location: location
	}
}

export function getCurrentGeoLocation(lat, lon){
	return{
		type: CHANGE_FETCH_OPTIONS,
		geolocation: {lat: lat, lon: lon}
	}
}

export function getWoeidByLocation( callback, fail_callback ){
	//get geo navigator
	if ( navigator.geolocation && typeof navigator.geolocation.getCurrentPosition == 'function' ){
		navigator.geolocation.getCurrentPosition( position => {
			let lat = position.coords.latitude;
			let lon = position.coords.longitude;
			callback( lat, lon );
		}, () => {
			fail_callback()
		});
	} else {
		fail_callback();
	}
}

export function getWoeidByText(dispatch, text){
	let query = 'select woeid from geo.places(1) where text="'+text+'"';
	let url = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURI(query) + '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

	fetch( url )
		.then( res => res.json() )
		.then(
			data => {},
			err => {}
		)
}

export function doFetchWeatherData(dispatch, weatherOptions){
	let {text} = weatherOptions.options;

	let query = 'Select * from weather.forecast where u = "c" and woeid IN (select woeid from geo.places(1) where text="'+text+'")';
	let url = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURI(query) + '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

	dispatch( loadWeatherData() );

	fetch( url )
		.then( res => res.json() )
		.then( 
			data => {
				dispatch( changeScreen('weather') )
				dispatch( loadWeatherDataSuccess(refineData( data.query.results.channel )) )
			},
			err => {
				dispatch( changeScreen('form') )
				dispatch( loadWeatherDataFailed(err) )
			}
		)
}

export function changeScreen( screen ){
	return {
		type: SCREEN_CHANGED,
		screen: screen
	}
}

let refineData = (data) => {
	// fore yahoo weather
	let forecast = data.item.forecast.splice(0, 5);
	const refineData = {
		location: data.location.city,
		weatherClassName: 'hot',
		// date: '',
		units: {
			temp: data.units.temperature
		},
		condition: {
			code: data.item.condition.code,
			temp: data.item.condition.temp,
			date: data.item.condition.date,
			text: data.item.condition.text
		},
		forecast: forecast.map( item => {
			return {
				code: item.code,
				high: item.high,
				low: item.low,
				text: item.text,
				date: item.date,
				day: item.day
			}
		})
	}
	return refineData;
}