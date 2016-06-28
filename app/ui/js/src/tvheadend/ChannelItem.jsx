import React, { Component, PropTypes } from 'react';
import BootstrapButton from 'bootstrap-button';
import BootstrapListItem from 'bootstrap-listitem';

export default class ChannelItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: this.props.data
		};
	}

	render() {
		var name = null;
		if (typeof(this.state.data.name) != 'undefined') {
			name = <span className="name">{this.state.data.name}</span>;
		}

		var number = null;
		if (typeof(this.state.data.number) != 'undefined') {
			number = <span className="number label label-default">{this.state.data.number}</span>;
		}

		return (
			<BootstrapListItem className="channel-item">
				{number}
				{name}
			</BootstrapListItem>
		);
	}
}

ChannelItem.displayName = 'ChannelItem';
ChannelItem.propTypes = {
	data: PropTypes.object
};