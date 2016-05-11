import React, {Component} from 'react'
import {connect} from 'react-redux'
import Forecast from './Forecast'
import Conditions from '../constants/ConditionCode'

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

// mapStateToProps
const mapStateToProps = (state, ownProps) => {
    let {data} = ownProps;
    return {
        classes: state.weatherData.classes,
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

    render(){
        let {data, backgroundClass, classes} = this.props

        return (
            <div className={"weather-container " + backgroundClass() + (classes.mounted ? ' showup': '')}>
                <div className="weather-upper">
                    <div className="bg"></div>
                    <div className="container">
                        <h1 className="title location delay-2">{data.location}</h1>
                        <div className="weather-right">
                            <div className="inner">
                                <h3 className="weather-icon subtitle delay-3">
                                    <span className={"icon-" + Conditions[data.condition.code].icon }></span>
                                </h3>
                                <h2 className="temperature subtitle delay-4">{data.condition.temp}<sup>&deg;</sup></h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="weather-lower">
                    <div className="container">
                        <div className="doge delay-5">
                            <div className="doge-bg"></div>
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

// const Weather = ({data, backgroundClass}) => (
//
// )

export default connect(mapStateToProps)(Weather)