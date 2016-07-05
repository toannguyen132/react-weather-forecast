import React, {Component} from 'react'
import {connect} from 'react-redux'

let Vector = function(x,y){
	this.x = x || 0
	this.y = y || 0

	this.add = function(v){
		if (v.x != null && v.y != null) {
			this.x += v.x;
			this.y += v.y;
		} else {
			this.x += v;
			this.y += v;
		}
		return this;
	}
}

let Drop = function(){

}

class WeatherRain extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
    	var canvas = document.getElementById('weather_rain');
    	var ctx = canvas.getContext('2d');
    }

    render(){
    	return(
    		<div className="weather-rain">
    			<canvas id="weather_rain"></canvas>
    		</div>
    	)
    }
}

export default WeatherRain