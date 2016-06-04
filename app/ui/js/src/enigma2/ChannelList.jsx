import React, { Component } from 'react';
import { withEnigma2Data } from "enigma2-data";
import ChannelItem from './ChannelItem.jsx';

export var ChannelList = withEnigma2Data('service', 'GET',  class extends Component {
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
