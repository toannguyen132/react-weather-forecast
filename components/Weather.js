import React, {Component} from 'react'
import {connect} from 'react-redux'
import Forecast from './Forecast'

const Weather = ({data}) => (
	<div className={"weather-container " + data.weatherClassName}> 
		<div className="weather-upper">
			<div className="bg"></div>
			<h1 className="title location">{data.location}</h1>
			<h2 className="temperature subtitle">{data.condition.temp}&deg;</h2>
			<h3 className="text subtitle">{data.condition.text}</h3>
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