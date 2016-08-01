import React, {Component} from 'react'
import {connect} from 'react-redux'
import $ from 'jquery'
import imgMoon from '../img/moon.svg'

class NightScene extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        $('.stars').each(function(){
            let number = 20;
            let $this = $(this);
            console.log($this);
            for (var i = 0; i < number; i++) {
                let pos = {x: Math.round(Math.random() * 100), y: Math.round(Math.random() * 100) };
                let size = Math.round(Math.random() * 6 ) + 'px';
                let star = $('<div>').addClass('star').css({'width': size, 'height': size, 'top': pos.y + '%', 'left': pos.x + '%'});
                $this.append(star);
            }
        });
    }

    render(){
    	return(
    		<div className="night-scene">
                <div className="moon"><img src={imgMoon} /></div>
                <div className="stars"></div>
            </div>
    	)
    }
}

export default NightScene