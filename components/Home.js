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
import {makeLocationOptions} from '../reducers/queryOptions'
import styles from '../css/app.css'

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

      doFetchWeatherData( dispatch, dispatch( updateLocationOptions( makeLocationOptions( {'location': location } ) ) ) )
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
    // get coordinate
    getWoeidByLocation( (lat, lon) => {
      doFetchWeatherData(
          dispatch,
          dispatch(
              updateLocationOptions(
                  makeLocationOptions( {
                    geolocation: {lat: lat, lon: lon}
                  } )
              )
          )
      )
    }, () => {
      dispatch( changeScreen('form') )
    } )
  }

  render() {
    const {weatherData, queryOptions, request, dispatch, onSubmit, onChangeLocation} = this.props
    /*
    <!--<p>
          <input type="text" {...queryOptions.location} onChange={onChangeLocation}/>
          <button onClick={onRefresh}>refresh</button>
        </p>
        weather at {queryOptions.location}: -->
    */
    return (
      <div className="weather-app-container">
        <Weather data={weatherData.data} />
        <Form onSubmit={onSubmit} /> x
        <Loading />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Home)
