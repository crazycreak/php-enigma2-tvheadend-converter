import React, { Component, PropTypes } from 'react';

export default class Well extends Component {
	constructor(props) {
		super(props);

		this.state = {
			className: this.props.className,
			children: this.props.children
		};
	}

        render() {
                return (
                        <div className={(this.state.className || '') + ' well'}>
				{this.state.children}
			</div>
                );
        }
}

Well.displayName = 'Well';
Well.propTypes = {
	className: PropTypes.string,
	children: PropTypes.any
};