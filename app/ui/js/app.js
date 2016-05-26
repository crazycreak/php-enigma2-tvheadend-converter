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
				<BootstrapButton className="btn-danger btn-xs">map</BootstrapButton>
				<span className="service-name">{servicename}</span>
			</li>
		);
	}
});

var Enigma2ChannelList = React.createClass({
	contextTypes: {
		url: React.PropTypes.string
	},
	loadChannelsFromServer: function() {
		this.setState({data: []});
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
	openChannelList: function () {
		this.refs.channelList.loadChannelsFromServer();
	},
	render: function() {
		var servicename = this.props.data.e2servicename;
		var servicereference = this.props.data.e2servicereference;

		return (
			<li className="bouquet-item list-group-item">
				<BootstrapButton className="btn-primary btn-xs" onClick={this.openChannelList}>channels</BootstrapButton>
				<span className="service-name">{servicename}</span>
				<Enigma2ChannelList ref="channelList" servicereference={servicereference} />
			</li>
		);
	}
});

var Enigma2BouquetList = React.createClass({
	contextTypes: {
		url: React.PropTypes.string
	},
	loadBouquets: function() {
		this.setState({data: []});
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
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		this.loadBouquets();
	},
	render: function() {
		var bouquetItems = this.state.data.map(function(item) {
			return (
				<Enigma2BouquetItem data={item} />
			);
		});
		return (
			<ul className="bouquet-list list-group">
				{bouquetItems}
			</ul>
		);
	}
});

var Enigma2Box = React.createClass({
	reloadBouquets: function () {
		this.refs.bouquetList.loadBouquets();
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
				<BootstrapButton className="btn-default" onClick={this.reloadBouquets}>reload</BootstrapButton>
				<Enigma2BouquetList ref="bouquetList" />
			</div>
		);
	}
});

var App = React.createClass({
	render: function() {
		var enigma2BoxHeaderMessage = 'Enigma2 Box!';
		var enigma2BoxHeader = null;

		enigma2BoxHeader = (
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