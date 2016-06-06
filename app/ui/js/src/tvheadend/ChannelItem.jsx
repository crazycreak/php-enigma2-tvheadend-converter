import React, { Component, PropTypes } from 'react';
import BootstrapButton from 'bootstrap-button';
import BootstrapListItem from 'bootstrap-listitem';

export default class ChannelItem extends Component {
	// initial state
	state = {
		data: this.props.data
	}

	constructor(props) {
		super(props);
	}

	render() {
		var name = null;
		if (typeof(this.state.data.name) != 'undefined') {
			name = <span className="name">{this.state.data.name}</span>;
		}

		var number = null;
		if (typeof(this.state.data.number) != 'undefined') {
			number = <span className="number label label-default">{this.state.data.number}</span>;
		}

		return (
			<BootstrapListItem className="channel-item">
				{number}
				{name}
			</BootstrapListItem>
		);
	}
}
