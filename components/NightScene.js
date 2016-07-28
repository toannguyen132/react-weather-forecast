import React, {Component} from 'react'
import {connect} from 'react-redux'
import $ from 'jquery'
import imgMoon from '../img/moon.svg'

class NightScene extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
    }

    render(){
    	return(
    		<div className="moon"><img src={imgMoon} /></div>
    	)
    }
}

export default NightScene