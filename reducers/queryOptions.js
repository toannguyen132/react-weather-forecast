import * as ActionTypes from '../constants/ActionTypes';

let defaultOptions = {
	location: '',
	geolocation: '',
	text: '',
	woeid: 56249853 // new york
}

export function makeLocationOptions(args){

	let text = 'Ho Chi Minh city';
	if ( args.location ){
		text = args.location;
	} else if (args.geolocation) {
		text = '(' + args.geolocation.lat +','+ args.geolocation.lon + ')';
	}

	return Object.assign({}, {
		location: '',
		geolocation: '',
		text: text,
		woeid: 56249853 // new york
	} , args);
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
			// let text = makeQueryText(action);
			console.log(action)
			return Object.assign({}, state, action)
		default:
			return state;
	}
}

export default queryOptions