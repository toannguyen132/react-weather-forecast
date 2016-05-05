import * as ActionTypes from '../constants/ActionTypes'

let defaultState = {
  title: 'Home'
};

let defaultData = false /*{
	isFetching: false,
	data:{
		condition: {
			temp: '',
			text: '',
			date: ''
		}
	}
}*/

function weatherData(state = defaultData, action) {	
	switch(action.type){
		case ActionTypes.WEATHER_DATA_FETCH:
			return Object.assign({}, state, { 'isFetching': true });
		case ActionTypes.WEATHER_DATA_SUCCEEDED:
			// refine data
			// let data = refineData(action.data);
			// console.log(data);
			return Object.assign({}, state, { 'isFetching': false, 'data': action.data });
		case ActionTypes.WEATHER_DATA_FAILED: 
			return Object.assign({}, state, { 'isFetching': false, 'err': action.err });
		default: 
			return state;
	}
}

export default weatherData