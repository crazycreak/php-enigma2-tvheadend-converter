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

		return (
			<li className="channel-item list-group-item">
				<BootstrapButton className="btn-info btn-xs">map</BootstrapButton>
				<span className="service-name">{servicename}</span>
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

var Enigma2BouquetItem = React.createClass({
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

var Enigma2BouquetList = React.createClass({
	contextTypes: {
		url: React.PropTypes.string
	},
	loadBouquets: function() {
		var bouquetsUrl = this.context.url + '/service/bouquets/tv';

		$.ajax({
			url: bouquetsUrl,
			dataType: 'json',
			cache: false,
			success: function(data) {
				if (data['code'] == 200) {
					this.setState({data: data['data']});
				}
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(bouquetsUrl, status, err.toString());
			}.bind(this)
		});
	},
	clearBouquets: function() {
		this.setState({data: []});
	},
	getInitialState: function() {
		return {data: []};
	},
	render: function() {
		var bouquetItems = this.state.data.map(function(item) {
			return (
				<Enigma2BouquetItem data={item} />
			);
		});
		return (
			<div className="bouquets">
				{bouquetItems}
			</div>
		);
	}
});

var Enigma2Box = React.createClass({
	loadBouquets: function () {
		this.refs.bouquetList.loadBouquets();
	},
	clearBouquets: function () {
		this.refs.bouquetList.clearBouquets();
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
						<div className="well well-sm bouquets-actionbar">
							<span className="text-uppercase">actionbar:</span>
							<BootstrapButton className="btn-info btn-sm" onClick={this.loadBouquets}>load</BootstrapButton>
							<BootstrapButton className="btn-danger btn-sm" onClick={this.clearBouquets}>clear</BootstrapButton>
						</div>
						<Enigma2BouquetList ref="bouquetList" />
					</div>
					<div role="tabpanel" className="tab-pane" id="provider">
						<div className="well well-sm">fixme...</div>
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