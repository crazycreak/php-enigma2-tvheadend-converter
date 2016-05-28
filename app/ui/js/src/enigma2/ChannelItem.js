var React = require('react');
var BootstrapButton = require('bootstrap-button');

module.exports = React.createClass({
	render: function() {
		var servicename = this.props.data.e2servicename;
		if (typeof(this.props.data.e2servicename) != 'undefined') {
			servicename = <span className="service-name">{this.props.data.e2servicename}</span>;
		}

		var number = null;
		if (typeof(this.props.data.number) != 'undefined') {
			number = <span className="number label label-default">{this.props.data.number}</span>;
		}

		return (
			<li className="channel-item list-group-item">
				<BootstrapButton className="btn-info btn-xs">map</BootstrapButton>
				{number}
				{servicename}
			</li>
		);
	}
});