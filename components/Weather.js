import React, {Component} from 'react'
import {connect} from 'react-redux'
import Forecast from './Forecast'


// class Weather extends Component {

// 	componentDidMount() {
// 		console.log(this);
// 		console.log('a');
// 	}

// 	render() {
// 		return (
//   			<div> a </div>
// 		)
// 	}
// }

const Weather = ({data}) => (
	<div className={"weather-container " + data.weatherClassName}> 
		<div className="weather-upper">
			<div className="bg"></div>
			<h1 className="location">{data.location}</h1>
			<h2 className="temp">{data.condition.temp} a &deg;</h2>
			<h3 className="text">{data.condition.text}</h3>
		</div>
		<div className="weather-lower">
			<div className="forecasts">
				{data.forecast.map( (forecast, key) => 	
					<Forecast key={key} forecast={forecast} />
				)}
			</div>
		</div>
	</div>
)
// mapStateToProps
export default connect()(Weather)