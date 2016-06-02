import React, { Component, PropTypes } from 'react';
import BootstrapButton from 'bootstrap-button';
import { ChannelList } from './ChannelList.jsx';

export default class TVHeadendApp extends Component {
	// define required / optional properties
	static propTypes = {
		url: PropTypes.string.isRequired
	}
	// define default properties
	static defaultProps = {
        	url: '/api/v1/tvheadend'
	}
	// child context variables
	static childContextTypes = {
		url: PropTypes.string
	}
	// get context function
	getChildContext() {
		return { url: this.state.url }
	}
	// initial state
	state = {
		url: this.props.url
	}

	constructor(props) {
		super(props);
	}

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
						<div className="well well-sm channel-actionbar">
							<span className="text-uppercase">actionbar:</span>
							<BootstrapButton className="btn-info btn-sm" onClick={this.loadChannels}>load</BootstrapButton>
							<BootstrapButton className="btn-danger btn-sm" onClick={this.clearChannels}>clear</BootstrapButton>
						</div>
						<ChannelList ref="channelService" method="all" parameter="" />
					</div>
				</div>
			</div>
		);
	}
}
