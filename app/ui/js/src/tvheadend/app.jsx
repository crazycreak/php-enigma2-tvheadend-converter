import React, { Component, PropTypes } from 'react';

export default class TVHeadendApp extends Component {
	// define required / optional properties
	static propTypes = {
		url: PropTypes.string.isRequired
	}
	// define default properties
	static defaultProps = {
        	url: '/api/v1/tvheadend'
	}
	// child context variables
	static childContextTypes = {
		url: PropTypes.string
	}
	// get context function
	getChildContext() {
		return { url: this.state.url }
	}
	// initial state
	state = {
		url: this.props.url
	}

	constructor(props) {
		super(props);
	}

	render() {
		var message = 'TVHeadend';
		var header = (
			<h1>{message}</h1>
		);

		return (
			<div className="tvheadend-app">{header}</div>
		);
	}
}
