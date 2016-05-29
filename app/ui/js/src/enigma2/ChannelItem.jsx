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
		var servicename = null;
		if (typeof(this.state.data.e2servicename) != 'undefined') {
			servicename = <span className="service-name">{this.state.data.e2servicename}</span>;
		}

		var number = null;
		if (typeof(this.state.data.number) != 'undefined') {
			number = <span className="number label label-default">{this.state.data.number}</span>;
		}

		return (
			<li className="channel-item list-group-item">
				<BootstrapButton className="btn-info btn-xs">map</BootstrapButton>
				{number}
				{servicename}
			</li>
		);
	}
}
