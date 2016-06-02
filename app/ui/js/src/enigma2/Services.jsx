import React, { Component, PropTypes } from 'react';
import { getData } from "core-data";
import ServiceItem from './ServiceItem.jsx';

export var Services = getData('service', class extends Component {
	render() {
		if (this.props.data.length === 0) {
			return <div className="empty"></div>;
		}

		var items = this.props.data.map(function(item) {
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
