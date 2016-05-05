import React, {Component} from 'react'
import {connect} from 'react-redux'
import Forecast from './Forecast'

const Form = ({onSubmit}) => (
	<div className="weather-container hot">
		<div className="weather-upper">
			<form onSubmit={onSubmit} className="form-weather">
				<h2 className="subtitle">Please Enter your location</h2>
				<div className="field">
					<input type="text"/>
				</div>
			</form>
		</div>
		<div className="weather-lower">
			
		</div>
	</div>
)
// mapStateToProps
export default connect()(Form)