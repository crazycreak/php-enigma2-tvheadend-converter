import React, { Component } from 'react';
import { withTVHeadendData } from "tvheadend-data";
import ChannelItem from './ChannelItem.jsx';

export var ChannelList = withTVHeadendData('channel', 'GET', class extends Component {
	render() {
		if (this.props.data.length === 0) {
			return <div className="empty"></div>;
		}

		var items = this.props.data.map(function(item) {
			return (
				<ChannelItem data={item} />
			);
		});
		return (
			<ul className="channel-list list-group">
				{items}
			</ul>
		);
	}
});
