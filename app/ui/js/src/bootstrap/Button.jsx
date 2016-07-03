import React, { Component, PropTypes } from 'react';

export default class Button extends Component {
	constructor(props) {
		super(props);

		this.state = {
			props: this.props,
			className: this.props.className
		};
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

Button.displayName = 'Button';
Button.propTypes = {
	className: PropTypes.string
};