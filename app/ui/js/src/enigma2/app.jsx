import React, { Component, PropTypes } from 'react';
import Enigma2Store from 'enigma2-store';
import Enigma2Actions from '../actions/Enigma2Actions';
import BootstrapButton from 'bootstrap-button';
import BootstrapWell from 'bootstrap-well';
import ServiceBox from './ServiceBox.jsx';

export default class Enigma2App extends Component {
	constructor(props) {
		super(props);
		// initialize state
		this.state = {
                        appHeaderText: 'Header',
			bouquets: [],
			provider: [],
                };
		// initialize store
		Enigma2Store.initialize('bouquets', []);
		Enigma2Store.initialize('provider', []);
	}

        componentWillMount() {
                this.appStoreId = Enigma2Store.registerView(() => { this.updateState(); });
                this.updateState();
        }

        componentWillUnmount() {
                Enigma2Store.deregisterView(this.appStoreId);
        }

        updateState() {
		this.setState({
                        appHeaderText: Enigma2Store.get('appHeaderText'),
			bouquets: Enigma2Store.get('bouquets'),
			provider: Enigma2Store.get('provider')
                });
        }

	loadData(type) {
		let requestObj = this.getRequestObj(type, type, 'tv');
		Enigma2Actions.requestEnigma2Data(requestObj);
	}

	clearData(type) {
		Enigma2Actions.resetEnigma2Data(type);
	}

	render() {
		var header = (
			<h1>{this.state.appHeaderText}</h1>
		);

		let loadBouquetsHandler = event => { return this.loadData('bouquets'); };
		let clearBouquetsHandler = event => { return this.clearData('bouquets'); };

		let loadProviderHandler = event => { return this.loadData('provider'); };
		let clearProviderHandler = event => { return this.clearData('provider'); };

		return (
			<div className="enigma2-app">
				{header}
				<ul className="nav nav-tabs" role="tablist">
					<li role="presentation" className="active"><a href="#bouquets" aria-controls="bouquets" role="tab" data-toggle="tab">Bouquets</a></li>
					<li role="presentation"><a href="#provider" aria-controls="provider" role="tab" data-toggle="tab">Provider</a></li>
				</ul>
				<div className="tab-content">
					<div role="tabpanel" className="tab-pane active" id="bouquets">
						<BootstrapWell className="service-actionbar well-sm">
							<span className="text-uppercase">actionbar:</span>
							<BootstrapButton className="btn-info btn-sm" onClick={loadBouquetsHandler}>load</BootstrapButton>
							<BootstrapButton className="btn-danger btn-sm" onClick={clearBouquetsHandler}>clear</BootstrapButton>
						</BootstrapWell>
						<ServiceBox data={this.state.bouquets} />
					</div>
					<div role="tabpanel" className="tab-pane" id="provider">
						<BootstrapWell className="service-actionbar well-sm">
							<span className="text-uppercase">actionbar:</span>
							<BootstrapButton className="btn-info btn-sm" onClick={loadProviderHandler}>load</BootstrapButton>
							<BootstrapButton className="btn-danger btn-sm" onClick={clearProviderHandler}>clear</BootstrapButton>
						</BootstrapWell>
						<ServiceBox data={this.state.provider} />
					</div>
				</div>
			</div>
		);
	}

	getRequestObj(property, method, parameter) {
		let module = 'service';
		return {
			module: module,
			method: method,
			parameter: parameter,
			property: property
		};
	}
}

Enigma2App.displayName = 'Enigma2App';