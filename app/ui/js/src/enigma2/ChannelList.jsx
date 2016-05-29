import React, { Component, PropTypes } from 'react';
import ChannelItem from './ChannelItem.jsx';
import { Data } from "./Data.jsx";

export var ChannelList = Data('service', class extends Component {
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
