import React, { Component } from 'react';

export default class Button extends Component {
	// initial state
	state = {
		props: this.props,
		className: this.props.className
	}

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<a {...this.state.props}
			    href="javascript:;"
			    role="button"
			    className={(this.state.className || '') + ' btn'} />
		);
	}
}
