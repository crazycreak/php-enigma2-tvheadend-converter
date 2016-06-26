import React, { Component } from 'react';

export default class ListItem extends Component {
	// initial state
	state = {
		className: this.props.className,
                children: this.props.children
	}

	constructor(props) {
		super(props);
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