import React, { Component, PropTypes } from 'react';
import ServiceItem from './ServiceItem.jsx';

export default class ServiceBox extends Component {
        constructor(props) {
                super(props);

                this.state = {
                        data: this.props.data
                };
        }

	componentWillReceiveProps(nextProps) {
		this.setState({
                        data: nextProps.data
                });
	}

        render() {
		if (this.state.data.length === 0) {
			return <div className="empty"></div>;
		}

		let items = this.state.data.map(function(item, index) {
			return (
				<ServiceItem data={item} />
			);
		});
		return (
			<div className="service-box">{items}</div>
		);
	}
}

ServiceBox.displayName = 'ServiceBox';
ServiceBox.propTypes = {
	data: PropTypes.array
};