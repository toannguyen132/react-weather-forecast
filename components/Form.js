import React, {Component} from 'react'
import {connect} from 'react-redux'
import Forecast from './Forecast'

const mapStateToProps = (state, ownProps) => {
	console.log(ownProps)
	return{
		screenClass: state.screen !== 'form' ? 'hidden' : '',
		ownProps
	}
}

const Form = ({screenClass, onSubmit}) => (
	<div className={"screen-container weather-form " + screenClass }>
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
export default connect(mapStateToProps)(Form)