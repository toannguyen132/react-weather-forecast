import React, {Component} from 'react'
import {connect} from 'react-redux'
import Forecast from './Forecast'
import GoogleForm from './GoogleForm'
import Conditions from '../constants/ConditionCode'
import {changeScreen} from '../actions/HomeActions'

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

// mapStateToProps
const mapStateToProps = (state, ownProps) => {
    let {data} = ownProps
    return {
        classes: state.weatherData.classes,
        screen: state.screen,
        date: new Date(data.condition.date.substr(5, 11)),
        backgroundClass() {
            let rain = [1,2,3,4,5,6,7,8,9,10,11,12]
            let hot = []
            let normal = []
            if ( rain.indexOf(data.condition.code) >= 0 ){
                return 'rain'
            } else if ( data.condition.temp > 32 ){
                return 'hot'
            } else {
                return 'normal'
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
        console.log(e);
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
    }

    changeLocation(e) {
        e.preventDefault()


    }

    render(){
        let {data, backgroundClass, classes, screen, date, onSearch, searchValue, onChangeLocation} = this.props
        let displayClass = screen == 'weather' ? ' showup ' : ' hidden '

        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thusday', 'Friday', 'Saturday']

        return (
            <div className={"screen-container weather-container " + backgroundClass() + (displayClass) }>
                <div className="gradient-bg"></div>
                <div className="g-form">
                    <GoogleForm onSearch={onSearch}/>
                </div>
                <div className="setting-section">
                    <div className="city item"><a href="#" onClick={onChangeLocation}>{data.location} &nbsp;&nbsp; <span className="icon-caret-down"></span></a></div>
                </div>
                <div className="weather-upper">
                    <div className="bg"></div>
                    <div className="container">
                        <div className="weather-right">
                            <div className="inner">
                                <h3 className="subtitle delay-8">
                                    {weekday[date.getDay()] + ', ' }<strong>{months[date.getMonth()] + ' '+ date.getDate()}</strong>
                                </h3>
                                <h2 className="temperature subtitle delay-9">
                                    {data.condition.temp}<sup>&deg;</sup>
                                    <span className={"weather-icon icon-" + Conditions[data.condition.code].icon }></span>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="weather-lower">
                    <div className="container">
                        <div className="doge">
                            <div className="doge-circles delay-9">
                                <div className="circle-big"></div>
                                <div className="circle-small"></div>
                            </div>
                            <div className="doge-bg delay-12"></div>
                        </div>
                        <div className="forecasts">
                            <div className="inner">
                                {data.forecast.map((forecast, key) =>
                                    <Forecast key={key} forecast={forecast}/>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Weather)