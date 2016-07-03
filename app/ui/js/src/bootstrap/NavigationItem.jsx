import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class NavigationItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			item: this.props.item
		};
	}

        render() {
                var className = '';
                if (this.context.router.isActive(this.state.item.link)) {
                        className = 'active';
                }
                return (
                        <li className={className}><Link to={this.state.item.link}>{this.state.item.name}</Link></li>
                );
        }
}

NavigationItem.displayName = 'NavigationItem';
NavigationItem.propTypes = {
	item: PropTypes.object
};
NavigationItem.contextTypes = {
	router: PropTypes.object.isRequired
};