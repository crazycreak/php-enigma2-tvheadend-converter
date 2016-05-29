import React, { Component, PropTypes } from 'react';
import BootstrapButton from 'bootstrap-button';
import ServiceList from './ServiceList.jsx';

export default class Enigma2App extends Component {
	// define required / optional properties
	static propTypes = {
		url: PropTypes.string.isRequired
	}
	// define default properties
	static defaultProps = {
        	url: '/api/v1/enigma2'
	}
	// child context variables
	static childContextTypes = {
		url: PropTypes.string
	}
	// get context function
	getChildContext() {
		return { url: this.state.url }
	}
	// initial state
	state = {
		url: this.props.url
	}

	constructor(props) {
		super(props);
	}

	loadBouquets = () => this.refs.bouquetService.loadServices();

	clearBouquets = () => this.refs.bouquetService.clearServices();

	loadProvider = () => this.refs.providerService.loadServices();

	clearProvider = () => this.refs.providerService.clearServices();

	render() {
		var message = 'Enigma2';
		var header = (
			<h1>{message}</h1>
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
						<div className="well well-sm service-actionbar">
							<span className="text-uppercase">actionbar:</span>
							<BootstrapButton className="btn-info btn-sm" onClick={this.loadBouquets}>load</BootstrapButton>
							<BootstrapButton className="btn-danger btn-sm" onClick={this.clearBouquets}>clear</BootstrapButton>
						</div>
						<ServiceList ref="bouquetService" type="bouquets" />
					</div>
					<div role="tabpanel" className="tab-pane" id="provider">
						<div className="well well-sm service-actionbar">
							<span className="text-uppercase">actionbar:</span>
							<BootstrapButton className="btn-info btn-sm" onClick={this.loadProvider}>load</BootstrapButton>
							<BootstrapButton className="btn-danger btn-sm" onClick={this.clearProvider}>clear</BootstrapButton>
						</div>
						<ServiceList ref="providerService" type="provider" />
					</div>
				</div>
			</div>
		);
	}
}
