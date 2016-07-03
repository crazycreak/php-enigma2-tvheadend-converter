import React, { Component, PropTypes } from 'react';
import TVHeadendStore from 'tvheadend-store';
import BootstrapButton from 'bootstrap-button';
import BootstrapWell from 'bootstrap-well';
import { ChannelList } from './ChannelList.jsx';

export default class TVHeadendApp extends Component {
	constructor(props) {
		super(props);

		this.state = {
                        appHeaderText: 'Header'
                };
	}

	componentWillMount() {
                this.appStoreId = TVHeadendStore.registerView(() => { this.updateState(); });
                this.updateState();
        }

        componentWillUnmount() {
                TVHeadendStore.deregisterView(this.appStoreId);
        }

        updateState() {
		this.setState({
                        appHeaderText: TVHeadendStore.get('appHeaderText')
                });
        }

	loadChannels() { this.refs.channelService.load(); }
	clearChannels() { this.refs.channelService.clear(); }

	render() {
		var header = (
			<h1>{this.state.appHeaderText}</h1>
		);

		let loadChannelsHandler = event => { return this.loadChannels(event); };
		let clearChannelsHandler = event => { return this.clearChannels(event); };

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
							<BootstrapButton className="btn-info btn-sm" onClick={loadChannelsHandler}>load</BootstrapButton>
							<BootstrapButton className="btn-danger btn-sm" onClick={clearChannelsHandler}>clear</BootstrapButton>
						</BootstrapWell>
						<ChannelList ref="channelService" method="all" />
					</div>
				</div>
			</div>
		);
	}
}

TVHeadendApp.displayName = 'TVHeadendApp';