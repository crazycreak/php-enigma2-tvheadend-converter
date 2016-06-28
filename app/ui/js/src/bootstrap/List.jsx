import React, { Component, PropTypes } from 'react';

export default class List extends Component {
	constructor(props) {
		super(props);

		this.state = {
			className: this.props.className,
			children: this.props.children
		};
	}

        render() {
                return (
                        <ul className={(this.state.className || '') + ' list-group'}>
				{this.state.children}
			</ul>
                );
        }
}

List.displayName = 'List';
List.propTypes = {
	className: PropTypes.string,
	children: PropTypes.any
};