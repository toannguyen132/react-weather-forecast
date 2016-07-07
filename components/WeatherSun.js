import React, {Component} from 'react'
import {connect} from 'react-redux'
import $ from 'jquery'

class WeatherRain extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
    }

    render(){
    	return(
    		<div className="the-sun">
                <div className="sun-wave-1"></div>
                <div className="sun-wave-2"></div>
                <div className="sun-wave-3"></div>
                <div className="sun"></div>
    		</div>
    	)
    }
}

export default WeatherRain