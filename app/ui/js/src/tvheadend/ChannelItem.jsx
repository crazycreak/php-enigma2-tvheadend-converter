import React, { Component, PropTypes } from 'react';
import BootstrapButton from 'bootstrap-button';

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
		console.log(this.state.data);
		if (typeof(this.state.data.name) != 'undefined') {
			name = <span className="name">{this.state.data.name}</span>;
		}

		var number = null;
		if (typeof(this.state.data.number) != 'undefined') {
			number = <span className="number label label-default">{this.state.data.number}</span>;
		}

		return (
			<li className="channel-item list-group-item">
				{number}
				{name}
			</li>
		);
	}
}
