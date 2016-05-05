import React, {Component} from 'react'
import {connect} from 'react-redux'

const Forecast = ({forecast}) => (
	<div className="forecast-item">
		<div className="day">{forecast.day}</div>
		<div className="high">{forecast.high}</div>
		<div className="low">{forecast.low}</div>
	</div>
)
// mapStateToProps
export default connect()(Forecast)