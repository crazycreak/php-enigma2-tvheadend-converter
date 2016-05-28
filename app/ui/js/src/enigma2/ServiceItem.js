var React = require('react');
var BootstrapButton = require('bootstrap-button');
var ChannelList = require('./ChannelList');

module.exports = React.createClass({
	loadChannels: function () {
		this.refs.channelList.loadChannels();
	},
	clearChannels: function () {
		this.refs.channelList.clearChannels();
	},
	render: function() {
		var servicename = this.props.data.e2servicename;
		var servicereference = this.props.data.e2servicereference;

		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<span className="service-name">{servicename}</span>
				</div>
				<div className="panel-body">
					<BootstrapButton className="btn-primary btn-xs" onClick={this.loadChannels}>channels</BootstrapButton>
					<BootstrapButton className="btn-danger btn-xs pull-right" onClick={this.clearChannels}>clear</BootstrapButton>
				</div>
				<ChannelList ref="channelList" servicereference={servicereference} />
			</div>
		);
	}
});