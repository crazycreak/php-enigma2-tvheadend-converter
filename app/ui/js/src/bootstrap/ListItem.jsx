import React, { Component, PropTypes } from 'react';

export default class ListItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			className: this.props.className,
			children: this.props.children
		};
	}

        render() {
                return (
                        <li className={(this.state.className || '') + ' list-group-item'}>
				{this.state.children}
			</li>
                );
        }
}

ListItem.displayName = 'ListItem';
ListItem.propTypes = {
	className: PropTypes.string,
	children: PropTypes.any
};