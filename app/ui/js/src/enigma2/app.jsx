import React, { Component, PropTypes } from 'react';
import enigma2Store from 'enigma2-store';
import BootstrapButton from 'bootstrap-button';
import BootstrapWell from 'bootstrap-well';
import ServiceBox from './ServiceBox.jsx';

export default class Enigma2App extends Component {
	constructor(props) {
		super(props);

		this.state = {
                        appHeaderText: 'Header'
                }
	}

        componentWillMount() {
                this.appStoreId = enigma2Store.registerView(() => { this.updateState(); });
                this.updateState();
        }

        componentWillUnmount() {
                enigma2Store.deregisterView(this.appStoreId);
        }

        updateState() {
		this.setState({
                        appHeaderText: enigma2Store.get('appHeaderText')
                });
        }

	loadBouquets = () => this.refs.bouquetService.load();
	clearBouquets = () => this.refs.bouquetService.clear();

	loadProvider = () => this.refs.providerService.load();
	clearProvider = () => this.refs.providerService.clear();

	render() {
		var header = (
			<h1>{this.state.appHeaderText}</h1>
		);

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
							<BootstrapButton className="btn-info btn-sm" onClick={this.loadBouquets}>load</BootstrapButton>
							<BootstrapButton className="btn-danger btn-sm" onClick={this.clearBouquets}>clear</BootstrapButton>
						</BootstrapWell>
						<ServiceBox ref="bouquetService" method="bouquets" parameter="tv" />
					</div>
					<div role="tabpanel" className="tab-pane" id="provider">
						<BootstrapWell className="service-actionbar well-sm">
							<span className="text-uppercase">actionbar:</span>
							<BootstrapButton className="btn-info btn-sm" onClick={this.loadProvider}>load</BootstrapButton>
							<BootstrapButton className="btn-danger btn-sm" onClick={this.clearProvider}>clear</BootstrapButton>
						</BootstrapWell>
						<ServiceBox ref="providerService" method="provider" parameter="tv" />
					</div>
				</div>
			</div>
		);
	}
}
