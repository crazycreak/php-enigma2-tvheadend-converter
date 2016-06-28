import React, { Component, PropTypes } from 'react';
import enigma2Store from 'enigma2-store';
import Actions from '../actions';
import { withEnigma2Data } from 'enigma2-data';
import ServiceItem from './ServiceItem.jsx';

export default class ServiceBox extends Component {
        constructor(props) {
                super(props);

		let module = 'service';
		let data = [];
		let dataName = module + '-' + props.method + '-' + props.parameter;
		let requestObj = {
			module: module,
			method: props.method,
			parameter: props.parameter,
			property: dataName
		};

                this.state = {
                        data: data,
			dataName: dataName,
			requestObj: requestObj
                };
		// initialize default
		enigma2Store.initialize(dataName, data);
        }

        componentWillMount() {
                this.appStoreId = enigma2Store.registerView(() => this.updateState());
                this.updateState();
        }

        componentWillUnmount() {
                enigma2Store.deregisterView(this.appStoreId);
        }

        updateState() {
                this.setState({
                        data: enigma2Store.get(this.state.dataName)
                });
        }

	load = () => Actions.requestEnigma2Data(this.state.requestObj);
	clear = () => Actions.resetEnigma2Data(this.state.dataName);

        render() {
		if (this.state.data.length === 0) {
			return <div className="empty"></div>;
		}

		var items = this.state.data.map(function(item, index) {
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
}

ServiceBox.displayName = 'ServiceBox';
ServiceBox.propTypes = {
	method: PropTypes.string,
	parameter: PropTypes.string
};