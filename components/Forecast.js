import React, {Component} from 'react'
import {connect} from 'react-redux'
import Conditions from '../constants/ConditionCode'

const Forecast = ({forecast}) => (
	<div className="forecast-item">
		<div className="day">{forecast.day}</div>
		<div className="icon"><span className={"icon-" + Conditions[forecast.code].icon}></span></div>
		<div className="high">{forecast.high}</div>
		<div className="low">{forecast.low}</div>
	</div>
)
// mapStateToProps
export default connect()(Forecast)