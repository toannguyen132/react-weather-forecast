import React, {Component} from 'react'
import {connect} from 'react-redux'
import $ from 'jquery'

let d3 = require("d3");

let gravity = 0.3
let wind = -0.015
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

    this.copy = function(){
        return new Vector(this.x, this.y)
    }
}

let Drop = function(container){
    let width = $(window).width()
    let height = $(window).height()
    let self = this
    this.pos = new Vector(Math.random() * width, -50)
    this.prev = this.pos
    this.vel = new Vector()

    this.line = container.append("line")

    this.update = function(){
        this.prev = this.pos.copy()

        this.vel.y += gravity;
        this.vel.x += wind;

        this.pos.add( this.vel )

        if ( this.pos.y > height ){
            this.pos = new Vector(Math.random() * width, -50)
            this.prev = this.pos
            this.vel = new Vector()
        }
    }

    this.draw = function(){
        self.line.attr('x1', self.pos.x)
            .attr('y1', self.pos.y)
            .attr('x2', self.prev.x)
            .attr('y2', self.prev.y)
            .attr("stroke-width", 2)
            .attr("stroke", "#fff");
    }
}

window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };


let RainAnimation = function(){
    let canvas = $('#weather_rain')
    let width = canvas.width()
    let height = canvas.height()

    let svg = d3.select('#weather_rain').append('svg')
                    .attr('width', width)
                    .attr('height', height)
    let self = this
    let rain = []
    let numberOfDrops = 50

    let n = numberOfDrops

    // while (n--){
    //     rain.push(new Drop(svg));
    // }

    let requestUpdate = function(callback){
        setTimeout(callback, 20);
    }

    this.update = function() {
        var i = rain.length

        while (i--){
            var raindrop = rain[i]
            raindrop.update()
            raindrop.draw()
        }

        if (Math.random() < 0.4 && rain.length < 200) 
            rain.push(new Drop(svg))

        requestUpdate( self.update )
    }

    this.init = function(){
        self.update()
    }
}

class WeatherRain extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        let rain = new RainAnimation()
        rain.init()
    }

    render(){
    	return(
    		<div className="weather-rain" id="weather_rain">
    		</div>
    	)
    }
}

export default WeatherRain