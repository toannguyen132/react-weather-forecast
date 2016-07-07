import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {loadWeatherData,
    loadWeatherDataSuccess, 
    loadWeatherDataFailed, 
    getCurrentGeoLocation,
    doFetchWeatherData,
    getWoeidByText,
    getWoeidByLocation,
    changeLocation,
    updateLocationOptions,
    changeScreen} from '../actions/HomeActions'
import Weather from './Weather'
import Form from './Form'
import Loading from './Loading'
import $ from 'jquery'
import {makeLocationOptions, loadSetting, updateSetting} from '../reducers/queryOptions'
import styles from '../css/app.css'
import cookie from 'react-cookie'

function mapStateToProps(state, ownProps){
  return {
    weatherData: state.weatherData,
    queryOptions: state.queryOptions,
    screen: state.screen
  }
}

function mapDispatchToProps(dispatch, ownProps){
  return {
    dispatch: dispatch,

    onChangeLocation(event) {
      dispatch( changeLocation(event.target.value) )
    }
  }
}

function mergeProps(stateProps, dispatchProps, ownProps){
  const {queryOptions} = stateProps
  const {dispatch} = dispatchProps

  return Object.assign({}, ownProps, stateProps, dispatchProps, {
    onRefresh() {
      doFetchWeatherData(dispatch, queryOptions)
    },
    onSubmit(event) {
      event.preventDefault();
      let location = $(event.currentTarget).find('input[type=text]').val()

      // save location in cookie
      let setting = cookie.load('ls')
      if ( typeof setting != 'undefined' && typeof setting.location != 'undefined'){
        setting.location = location
        delete setting.geolocation
      }
      else {
        setting = Object.assign({}, { 'location': location, 'measure': 'c' })
      }
      let options = makeLocationOptions( setting )

      doFetchWeatherData( dispatch, dispatch( updateLocationOptions( options ) ) )
    },
    
    changeMeasure(measure){
      let s = loadSetting()
      if ( !measure ){
        s.measure = s.measure == 'c' ? 'f' : 'c'
      } else {
        s.measure = measure
      }

      let options = makeLocationOptions( s )

      doFetchWeatherData( dispatch, dispatch( updateLocationOptions( options ) ) )
    }
  })
}

class Home extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let {dispatch, queryOptions} = this.props
    let $this = this;
    let lastSetting = loadSetting();

    // get coordinate
    getWoeidByLocation( (lat, lon) => {
      let options = makeLocationOptions( {
        geolocation: {lat: lat, lon: lon}
      } )
      options = Object.assign({},options, { measure: lastSetting.measure })

      doFetchWeatherData(
          dispatch,
          dispatch(
              updateLocationOptions( options )
          )
      )
    }, () => { // false
      if ( lastSetting.location ){
        let options = makeLocationOptions( {'location': lastSetting.location } )
        options = Object.assign({}, options, { measure: lastSetting.measure })

        doFetchWeatherData( dispatch, dispatch( updateLocationOptions( options ) ) )
      } else {
        dispatch( changeScreen('form') )  
      }
    } )
  }

  render() {
    const {weatherData, queryOptions, request, dispatch, onSubmit, onChangeLocation, changeMeasure} = this.props
    /*
    <!--<p>
          <input type="text" {...queryOptions.location} onChange={onChangeLocation}/>
          <button onClick={onRefresh}>refresh</button>
        </p>
        weather at {queryOptions.location}: -->
    */
    return (
      <div className="weather-app-container">
        <Weather data={weatherData.data} changeMeasure={changeMeasure} />
        <Form onSubmit={onSubmit} /> x
        <Loading />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Home)
