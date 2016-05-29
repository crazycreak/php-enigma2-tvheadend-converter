import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import ServiceItem from './ServiceItem.jsx';

export default class ServiceList extends Component {
	// context variables
	static contextTypes = {
		url: PropTypes.string.isRequired
	}
	// initial state
	state = {
		type: this.props.type,
		data: []
	}

	constructor(props) {
		super(props);
	}

	loadServices = () => {
		var serviceUrl = this.context.url + '/service/' + this.state.type + '/tv';

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
	}

	clearServices = () => {
		this.setState({data: []});
	}

	render() {
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
}
