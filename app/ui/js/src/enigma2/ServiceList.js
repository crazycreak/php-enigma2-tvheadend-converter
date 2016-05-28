var React = require('react');
var $ = require("jquery");
var ServiceItem = require('./ServiceItem');

module.exports = React.createClass({
	contextTypes: {
		url: React.PropTypes.string
	},
	loadServices: function() {
		var serviceUrl = this.context.url + '/service/' + this.props.type + '/tv';

		$.ajax({
			url: serviceUrl,
			dataType: 'json',
			cache: false,
			success: function(data) {
				if (data['code'] == 200) {
					this.setState({data: data['data']});
				}
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(serviceUrl, status, err.toString());
			}.bind(this)
		});
	},
	clearServices: function() {
		this.setState({data: []});
	},
	getInitialState: function() {
		return {data: []};
	},
	render: function() {
		var items = this.state.data.map(function(item) {
			return (
				<ServiceItem data={item} />
			);
		});
		return (
			<div className="services">
				{items}
			</div>
		);
	}
});