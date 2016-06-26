import React, { Component, PropTypes } from 'react';
import BootstrapButton from 'bootstrap-button';
import BootstrapWell from 'bootstrap-well';
import { ChannelList } from './ChannelList.jsx';

export default class TVHeadendApp extends Component {
	loadChannels = () => this.refs.channelService.load();
	clearChannels = () => this.refs.channelService.clear();

	render() {
		var message = 'TVHeadend';
		var header = (
			<h1>{message}</h1>
		);

		return (
			<div className="tvheadend-app">
				{header}
				<ul className="nav nav-tabs" role="tablist">
					<li role="presentation" className="active"><a href="#channels" aria-controls="channels" role="tab" data-toggle="tab">Channels</a></li>
				</ul>
				<div className="tab-content">
					<div role="tabpanel" className="tab-pane active" id="channels">
						<BootstrapWell className="channel-actionbar well-sm">
							<span className="text-uppercase">actionbar:</span>
							<BootstrapButton className="btn-info btn-sm" onClick={this.loadChannels}>load</BootstrapButton>
							<BootstrapButton className="btn-danger btn-sm" onClick={this.clearChannels}>clear</BootstrapButton>
						</BootstrapWell>
						<ChannelList ref="channelService" method="all" />
					</div>
				</div>
			</div>
		);
	}
}

TVHeadendApp.displayName = 'TVHeadendApp';