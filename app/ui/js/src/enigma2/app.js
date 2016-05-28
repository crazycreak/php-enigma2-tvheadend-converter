var React = require('react');
var BootstrapButton = require('bootstrap-button');
var ServiceList = require('./ServiceList');

module.exports = React.createClass({
	loadBouquets: function () {
		this.refs.bouquetService.loadServices();
	},
	clearBouquets: function () {
		this.refs.bouquetService.clearServices();
	},
	loadProvider: function () {
		this.refs.providerService.loadServices();
	},
	clearProvider: function () {
		this.refs.providerService.clearServices();
	},
	getInitialState: function() {
		return {url: ''};
	},
	childContextTypes: {
		url: React.PropTypes.string
	},
	getChildContext: function() {
		return {url: this.state.url};
	},
	componentWillMount: function() {
		this.setState({url: this.props.url});
	},
	render: function() {
		var headerMessage = 'Enigma2';
		var header = (
			<h1>{headerMessage}</h1>
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
});