import React, {Component} from 'react'
import {connect} from 'react-redux'
import Forecast from './Forecast'

const Weather = ({data}) => (
	<div className={"weather-container " + data.weatherClassName}> 
		<div className="weather-upper">
			<div className="bg"></div>
			<div className="container">
				<h1 className="title location">{data.location}</h1>
				<div className="weather-right">
					<div className="inner">
						<h3 className="weather-icon subtitle">
							<span className="icon-rain"></span>
						</h3>
						<h2 className="temperature subtitle">{data.condition.temp}<sup>&deg;</sup></h2>
					</div>
				</div>
			</div>
		</div>
		<div className="weather-lower">
			<div className="container">
				<div className="forecasts">
					<div className="inner">
						{data.forecast.map((forecast, key) =>
							<Forecast key={key} forecast={forecast}/>
						)}
					</div>
				</div>
			</div>
		</div>
	</div>
)
// mapStateToProps
export default connect()(Weather)