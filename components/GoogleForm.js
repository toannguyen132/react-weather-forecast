import React, {Component} from 'react';
import {reduxForm} from 'redux-form';

class GoogleForm extends Component {

	render(){
    	const {fields: {searchValue}, handleSubmit, onSearch} = this.props
    	const onHandleSubmit = (data) => {
			onSearch(data)
    	}

		return (
			<form onSubmit={handleSubmit(onHandleSubmit)}>
				<span className="google-logo"></span>
                <input type="text" className="search-input" {...searchValue} />
                <span className="icon-search"></span>
            </form>
		)
	}
}

GoogleForm = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'google-form',                           // a unique name for this form
  fields: ['searchValue'] // all the fields in your form
})(GoogleForm);

export default GoogleForm