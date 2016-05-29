import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import ChannelItem from './ChannelItem.jsx';

export default class ChannelList extends Component {
	// context variables
	static contextTypes = {
		url: PropTypes.string.isRequired
	}
	// initial state
	state = {
		servicereference: this.props.servicereference,
		data: []
	}

	constructor(props) {
		super(props);
	}

	loadChannels = () => {
		var channelsUrl = this.context.url + '/service/channels/' + this.state.servicereference;

		$.ajax({
			url: channelsUrl,
			dataType: 'json',
			cache: false,
			success: function(data) {
				if (data['code'] == 200) {
					this.setState({data: data['data']});
				}
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(channelsUrl, status, err.toString());
			}.bind(this)
		});
	}

	clearChannels = () => {
		this.setState({data: []});
	}

	render() {
		if (this.state.data.length === 0) {
			return (
				<div className="empty" />
			);
		}
		var channelItems = this.state.data.map(function(item) {
			return (
				<ChannelItem data={item} />
			);
		});
		return (
			<ul className="channel-list list-group">
				{channelItems}
			</ul>
		);
	}
}
