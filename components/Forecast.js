import React, {Component} from 'react'
import {connect} from 'react-redux'
import Conditions from '../constants/ConditionCode'

const Forecast = ({forecast, index}) => (
	<div className="forecast-item delay-5">
		<div className="day">{index == 0 ? 'Now' : forecast.day }</div>
		<div className="icon wicon"><span className={"icon-" + Conditions[forecast.code].icon}></span></div>
		<div className="high">{forecast.high}</div>
		<div className="low">{forecast.low}</div>
	</div>
)
// mapStateToProps
export default connect()(Forecast)