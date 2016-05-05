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
    changeLocation } from '../actions/HomeActions'
import Weather from './Weather'

function mapStateToProps(state, ownProps){
  return {
    weatherData: state.weatherData,
    queryOptions: state.queryOptions
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
    }
  })
}

class Home extends Component {

  constructor(props) {
    super(props)
    // this.onRefresh = this.onRefresh.bind(this)
  }

  componentDidMount() {
    let {dispatch, queryOptions} = this.props
    let $this = this;
    // get coordinate

    // doFetchWeatherData(dispatch, {location: 'Ha Noi city'})

    getWoeidByLocation( (lat, lon) => {
      dispatch( getCurrentGeoLocation(lat, lon) )

      setTimeout(() => {
        doFetchWeatherData( dispatch, $this.props.queryOptions)
      }, 1000);
    })
  }

  render() {
    const {weatherData, queryOptions, request, dispatch, onRefresh, onChangeLocation} = this.props
    /*
    <!--<p>
          <input type="text" {...queryOptions.location} onChange={onChangeLocation}/>
          <button onClick={onRefresh}>refresh</button>
        </p>
        weather at {queryOptions.location}: -->
    */
    return (
      <div>
        { !weatherData.isFetching && weatherData.data ? 
          <Weather data={weatherData.data} />
        :
          <p className="text">loading</p>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Home)
