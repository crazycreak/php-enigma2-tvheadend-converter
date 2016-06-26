import React, { Component, PropTypes } from 'react';
import BootstrapButton from 'bootstrap-button';
import BootstrapPanel from 'bootstrap-panel';
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
			<BootstrapPanel classNamePanel="panel-default" classNameHeading="service-name" headingText={this.state.servicename}>
				<div className="panel-body">
					<BootstrapButton className="btn-primary btn-xs" onClick={this.loadChannels}>channels</BootstrapButton>
					<BootstrapButton className="btn-danger btn-xs pull-right" onClick={this.clearChannels}>clear</BootstrapButton>
				</div>
				<ChannelList ref="channelList" method="channels" parameter={this.state.servicereference} />
			</BootstrapPanel>
		);
	}
}

ServiceItem.displayName = 'ServiceItem';