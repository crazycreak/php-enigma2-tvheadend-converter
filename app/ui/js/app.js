var BootstrapButton = React.createClass({
	render: function() {
		return (
			<a {...this.props}
			    href="javascript:;"
			    role="button"
			    className={(this.props.className || '') + ' btn'} />
		);
	}
});

var Enigma2ChannelItem = React.createClass({
	render: function() {
		var servicename = this.props.data.e2servicename;
		if (typeof(this.props.data.e2servicename) != 'undefined') {
			servicename = <span className="service-name">{this.props.data.e2servicename}</span>;
		}

		var number = null;
		if (typeof(this.props.data.number) != 'undefined') {
			number = <span className="number label label-default">{this.props.data.number}</span>;
		}

		return (
			<li className="channel-item list-group-item">
				<BootstrapButton className="btn-info btn-xs">map</BootstrapButton>
				{number}
				{servicename}
			</li>
		);
	}
});

var Enigma2ChannelList = React.createClass({
	contextTypes: {
		url: React.PropTypes.string
	},
	loadChannels: function() {
		var channelsUrl = this.context.url + '/service/channels/' + this.props.servicereference;

		$.ajax({
			url: channelsUrl,
			dataType: 'json',
			cache: false,
			success: function(data) {
				if (data['code'] == 200) {
					this.setState({data: data['data']});
				}
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(channelsUrl, status, err.toString());
			}.bind(this)
		});
	},
	clearChannels: function() {
		this.setState({data: []});
	},
	getInitialState: function() {
		return {data: []};
	},
	render: function() {
		if (this.state.data.length === 0) {
			return (
				<div className="empty" />
			);
		}
		var channelItems = this.state.data.map(function(item) {
			return (
				<Enigma2ChannelItem data={item} />
			);
		});
		return (
			<ul className="channel-list list-group">
				{channelItems}
			</ul>
		);
	}
});

var Enigma2ServiceItem = React.createClass({
	loadChannels: function () {
		this.refs.channelList.loadChannels();
	},
	clearChannels: function () {
		this.refs.channelList.clearChannels();
	},
	render: function() {
		var servicename = this.props.data.e2servicename;
		var servicereference = this.props.data.e2servicereference;

		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<span className="service-name">{servicename}</span>
				</div>
				<div className="panel-body">
					<BootstrapButton className="btn-primary btn-xs" onClick={this.loadChannels}>channels</BootstrapButton>
					<BootstrapButton className="btn-danger btn-xs pull-right" onClick={this.clearChannels}>clear</BootstrapButton>
				</div>
				<Enigma2ChannelList ref="channelList" servicereference={servicereference} />
			</div>
		);
	}
});

var Enigma2ServiceList = React.createClass({
	contextTypes: {
		url: React.PropTypes.string
	},
	loadServices: function() {
		var serviceUrl = this.context.url + '/service/' + this.props.type + '/tv';

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
	},
	clearServices: function() {
		this.setState({data: []});
	},
	getInitialState: function() {
		return {data: []};
	},
	render: function() {
		var items = this.state.data.map(function(item) {
			return (
				<Enigma2ServiceItem data={item} />
			);
		});
		return (
			<div className="services">
				{items}
			</div>
		);
	}
});

var Enigma2Box = React.createClass({
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
		return (
			<div className="enigma2-box">
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
						<Enigma2ServiceList ref="bouquetService" type="bouquets" />
					</div>
					<div role="tabpanel" className="tab-pane" id="provider">
						<div className="well well-sm service-actionbar">
							<span className="text-uppercase">actionbar:</span>
							<BootstrapButton className="btn-info btn-sm" onClick={this.loadProvider}>load</BootstrapButton>
							<BootstrapButton className="btn-danger btn-sm" onClick={this.clearProvider}>clear</BootstrapButton>
						</div>
						<Enigma2ServiceList ref="providerService" type="provider" />
					</div>
				</div>
			</div>
		);
	}
});

var App = React.createClass({
	render: function() {
		var enigma2BoxHeaderMessage = 'Enigma2';
		var enigma2BoxHeader = (
			<h1>{enigma2BoxHeaderMessage}</h1>
		);

		return (
			<div className="mainApp">
				{enigma2BoxHeader}
				<Enigma2Box ref="enigma2box" url="/api/v1/enigma2" />
			</div>
		);
	}
});

// render app
ReactDOM.render(<App />, document.getElementById('appContainer'));