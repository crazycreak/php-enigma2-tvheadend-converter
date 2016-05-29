import React, { Component, PropTypes } from 'react';
import ServiceItem from './ServiceItem.jsx';
import { Data } from "./Data.jsx";

export var Services = Data('service', class extends Component {
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
