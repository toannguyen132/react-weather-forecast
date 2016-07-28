import React, {Component} from 'react'
import {connect} from 'react-redux'
import Forecast from './Forecast'

const mapStateToProps = (state, ownProps) => {
	return{
		screenClass: state.screen !== 'form' ? 'hidden' : '',
		ownProps
	}
}

const Form = ({screenClass, onSubmit}) => (
	<div className={"screen-container weather-form " + screenClass }>
		<div className="weather-form-container">
			<form onSubmit={onSubmit} className="form-weather">
				<div className="field">
					<span className="icon-location"></span>
					<input type="text" placeholder="Enter a location"/>
					<a className="trigger"><span className="icon-search"></span></a>
				</div>
			</form>
		</div>
	</div>
)
// mapStateToProps
export default connect(mapStateToProps)(Form)