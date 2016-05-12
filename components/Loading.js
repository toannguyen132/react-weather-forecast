import React, {Component} from 'react'
import {connect} from 'react-redux'


const mapStateToProps = (state, ownProps) => {
    console.log(state);
    return{
        screenClass: state.screen !== 'loading' ? 'hidden' : '',
        ownProps
    }
}

const Loading = ({screenClass}) => (
    <div className={"screen-container loading-screen " + screenClass}>
        <h1>Loading</h1>
    </div>
)
// mapStateToProps
export default connect(mapStateToProps)(Loading)