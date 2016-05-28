var React = require('react');
var $ = require("jquery");
var ChannelItem = require('./ChannelItem');

module.exports = React.createClass({
	contextTypes: {
		url: React.PropTypes.string
	},
	loadChannels: function() {
		var channelsUrl = this.context.url + '/service/channels/' + this.props.servicereference;

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
	},
	clearChannels: function() {
		this.setState({data: []});
	},
	getInitialState: function() {
		return {data: []};
	},
	render: function() {
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
});