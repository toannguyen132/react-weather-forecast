import React, {Component} from 'react'
import {connect} from 'react-redux'
import Forecast from './Forecast'
import GoogleForm from './GoogleForm'
import Conditions from '../constants/ConditionCode'
import {changeScreen} from '../actions/HomeActions'
import WeatherRain from './WeatherRain'
import WeatherSun from './WeatherSun'
import WeatherSnow from './WeatherSnow'
import NightScene from './NightScene'
import $ from 'jquery'

import bodymovin from '../utils/bodymovin.js'
import dogeData from '../utils/data.json'
import imgMountain from '../img/mountain.svg'
import imgMountainNight from '../img/mountain-night.svg'
import imgCloud1 from '../img/cloud-1.svg'
import imgCloud2 from '../img/cloud-2.svg'

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

// mapStateToProps
const mapStateToProps = (state, ownProps) => {
    let {data} = ownProps
    let weatherType = 'fair'
    let rain = [1,2,3,4,5,6,7,8,9,10,11,12]
    let date = new Date(data.condition.date.substr(5, 20))
    let timeType = 'morning'

    // rain > night > others
    // night first
    if ( rain.indexOf(parseInt(data.condition.code)) >= 0 ){
        weatherType = 'rain'
    } else if ( (data.condition.temp >= 30 && data.units.temp == 'c') ||  (data.condition.temp >= 86 && data.units.temp == 'f')){
        weatherType = 'hot'
    } else if ( (data.condition.temp < 10 && data.units.temp == 'c') ||  (data.condition.temp < 50 && data.units.temp == 'f') ) {
        weatherType = 'cold'
    } else {
        weatherType = 'fair'
    }

    let time = date.getHours();
    if ( time >= 6 && time < 11 ){
        timeType = 'morning'
    } else if ( time >= 11 && time < 15){
        timeType = 'noon'
    } else if ( time >= 15 && time <= 18) {
        timeType = 'afternoon'
    } else {
        timeType = 'night'
    }

    timeType = 'night';
    weatherType = 'fair';

    let mountainImage = imgMountain;
    if (weatherType != 'rain' && timeType == 'night'){
        mountainImage = imgMountainNight;
    }

    return {
        classes: state.weatherData.classes,
        screen: state.screen,
        date: date,
        weatherType: weatherType,
        timeType: timeType,
        mountainImage: mountainImage,
        backgroundClass() {
            let rain = [1,2,3,4,5,6,7,8,9,10,11,12]
            let hot = []
            let normal = []

            if ( rain.indexOf(parseInt(data.condition.code)) >= 0 ){
                return 'rain'
            } else if ( (data.condition.temp >= 30 && data.units.temp == 'c') ||  (data.condition.temp >= 86 && data.units.temp == 'f')){
                return 'hot'
            } else if ( (data.condition.temp < 10 && data.units.temp == 'c') ||  (data.condition.temp < 50 && data.units.temp == 'f') ) {
                return 'cold'
            } else {
                return 'fair'
            }
        }
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    onSearch(data) {
        let value = data.searchValue
        window.location = 'https://www.google.com/search?q=' + encodeURI(value);
    },
    onChangeLocation(e) {
        e.preventDefault();
        dispatch( changeScreen("form") )
    }
  }
}

class Weather extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount() {
        let {dispatch} = this.props
        setTimeout(function(){
            dispatch( { type: 'WEATHER_PANEL_MOUNTED', 'classes': {'mounted': true} } )
        }, 200)

        let element = $('.doge-figure').get(0)
        bodymovin.loadAnimation({
          container: element, // the dom element
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: dogeData // the animation data
        })
    }

    changeLocation(e) {
        e.preventDefault()
    }

    onChangeMeasurement(e){
        e.preventDefault()
        this.props.changeMeasure(  )
    }

    render(){
        let {data, backgroundClass, classes, screen, date, onSearch, searchValue, onChangeLocation, changeMeasure, weatherType, timeType} = this.props
        let {mountainImage} = this.props
        let displayClass = screen == 'weather' ? ' showup ' : ' hidden '

        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thusday', 'Friday', 'Saturday']

        let handleClick = this.onChangeMeasurement.bind(this);
        let temp = typeof data.units != 'undefined' ? data.units.temp : 'C';
        let switchClass = temp == 'F' ? 'on' : '' ;

        let extraAnimation = () => {
            if (weatherType == 'rain') return <WeatherRain></WeatherRain>
        }

        let sunAnimation = () => {
            if ((weatherType == 'hot' || weatherType == 'fair') && timeType == 'noon' ) return <WeatherSun></WeatherSun>
        }

        let snowAnimation = () => {
            if (weatherType == 'cold') return <WeatherSnow></WeatherSnow>
        }

        let nightScene = () => {
            if (timeType == 'night') return <NightScene></NightScene>
        }

        let starScene = () => {
            if (timeType == 'night') return <StarsScene></StarsScene>
        }

        return (
            <div className={"screen-container weather-container " + weatherType + " " + timeType + (displayClass) }>
                <div className="gradient-bg"></div>
                {extraAnimation()}
                {snowAnimation()}
                <div className="g-form">
                    <GoogleForm onSearch={onSearch}/>
                </div>
                <div className="setting-section">
                    <div className="city item"><a href="#" onClick={onChangeLocation}>{data.location} &nbsp;&nbsp; <span className="icon-caret-down"></span></a></div>
                    <div className="measure item">
                        <a href="#" onClick={handleClick}>
                            <span className={'switch ' + switchClass}>
                                <span className="text"><span className="temp"></span>{temp}</span>
                                <span className="switch-button"></span>
                            </span>
                        </a>
                    </div>
                </div>

                <div className="weather-upper">
                    <div className="container">
                        <div className="weather-right">
                            <div className="weather-info">
                                <h3 className="subtitle weather-date delay-8">
                                    {weekday[date.getDay()] + ', ' }<strong>{months[date.getMonth()] + ' '+ date.getDate()}</strong>
                                </h3>
                                <h2 className="temperature subtitle delay-9">
                                    {data.condition.temp}<sup>&deg;</sup>
                                    <span className={"weather-icon icon-" + Conditions[data.condition.code].icon } title={Conditions[data.condition.code].text}></span>
                                </h2>
                                <div className="forecasts delay-10">
                                    <div className="inner">
                                        {data.forecast.map((forecast, key) =>
                                            <Forecast key={key} index={key} forecast={forecast}/>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="weather-background">
                    <div className="container">
                        <div className="bg">
                            <img className="mountain" src={mountainImage}/>
                            {sunAnimation()}
                            {nightScene()}
                            <div className="cloud-1 cloud">
                                <div className="cloud-vertical-animate">
                                    <div className="cloud-horizontal-animate"><img src={imgCloud1} /></div>
                                </div>
                            </div>
                            <div className="cloud-2 cloud">
                                <div className="cloud-vertical-animate">
                                    <div className="cloud-horizontal-animate"><img src={imgCloud2} /></div>
                                </div>
                            </div>
                        </div>
                        <div className="doge">
                            <div className="doge-circles delay-10">
                                <div className="circle-big"></div>
                                <div className="circle-small"></div>
                            </div>
                            <div className="doge-figure delay-12"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Weather)