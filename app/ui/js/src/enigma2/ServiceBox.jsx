import React, { Component } from 'react';
import { withEnigma2Data } from "enigma2-data";
import ServiceItem from './ServiceItem.jsx';

export var ServiceBox = withEnigma2Data('service', 'GET', class extends Component {
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
			<div className="service-box">
				{items}
			</div>
		);
	}
});
