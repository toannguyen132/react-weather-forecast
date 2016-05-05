import * as ActionTypes from '../constants/ActionTypes';

let defaultOptions = {
	location: '',
	geolocation: '',
	text: '',
	woeid: 56249853 // new york
}

function makeQueryText(options){
	if ( options.location ){
		return options.location;
	} else if (options.geolocation) {
		return '(' + options.geolocation.lat +','+ options.geolocation.lon + ')';
	}
	return 'Ho Chi Minh city'; //fallback
}

function queryOptions(state = defaultOptions, action) {
	switch(action.type){
		case 'CHANGE_FETCH_OPTIONS': 
			let text = makeQueryText(action);

			return Object.assign({}, state, action, {text: text})
		default:
			return state;
	}
}

export default queryOptions