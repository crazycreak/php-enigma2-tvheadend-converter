import React, { Component, PropTypes } from 'react';
import BootstrapButton from 'bootstrap-button';
import { ChannelList } from './ChannelList.jsx';

export default class ServiceItem extends Component {
	// initial state
	state = {
		servicename: this.props.data.e2servicename,
		servicereference: this.props.data.e2servicereference
	}

	constructor(props) {
		super(props);
	}

	loadChannels = () => this.refs.channelList.load();

	clearChannels = () => this.refs.channelList.clear();

	render() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<span className="service-name">{this.state.servicename}</span>
				</div>
				<div className="panel-body">
					<BootstrapButton className="btn-primary btn-xs" onClick={this.loadChannels}>channels</BootstrapButton>
					<BootstrapButton className="btn-danger btn-xs pull-right" onClick={this.clearChannels}>clear</BootstrapButton>
				</div>
				<ChannelList ref="channelList" method="channels" parameter={this.state.servicereference} />
			</div>
		);
	}
}
