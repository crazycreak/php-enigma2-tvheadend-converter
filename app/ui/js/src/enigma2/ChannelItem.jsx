import React, { Component, PropTypes } from 'react';
import BootstrapButton from 'bootstrap-button';
import ChannelMap from './ChannelMap.jsx';

export default class ChannelItem extends Component {
	// initial state
	state = {
		data: this.props.data
	}

	constructor(props) {
		super(props);
	}

	handleClick = () => this.refs.modal.handleMap();

	render() {
		var servicename = null;
		if (typeof(this.state.data.e2servicename) != 'undefined') servicename = <span className="service-name">{this.state.data.e2servicename}</span>;

		var servicereference = null;
		if (typeof(this.state.data.e2servicereference) != 'undefined') servicereference = <span className="service-name">{this.state.data.e2servicereference}</span>;

		var number = null;
		if (typeof(this.state.data.number) != 'undefined') number = <span className="number label label-default">{this.state.data.number}</span>;

		var modal = null;
		modal = (
			<ChannelMap ref="modal" data={this.state.data} />
		);

		return (
			<li className="channel-item list-group-item">
				<BootstrapButton className="btn-info btn-xs" onClick={this.handleClick}>map</BootstrapButton>
				{number}
				{servicename}
				{modal}
			</li>
		);
	}
}
