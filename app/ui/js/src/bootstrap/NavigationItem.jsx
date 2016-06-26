import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class NavigationItem extends Component {
        // context variables
        static contextTypes = {
                router: PropTypes.object.isRequired
        }
        // initial state
	state = {
		item: this.props.item
	}

	constructor(props) {
		super(props);
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