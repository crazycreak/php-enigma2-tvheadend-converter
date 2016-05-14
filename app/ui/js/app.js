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

var Enigma2BouquetItem = React.createClass({
	render: function() {
		return (
			<div className="Enigma2BouquetItem">{this.props.text}</div>
		);
	}
});

var Enigma2BouquetList = React.createClass({
	render: function() {
		var bouquetItems = this.props.data.map(function(item) {
			return (
				<Enigma2BouquetItem text={item.e2servicename} />
			);
		});
		return (
			<div className="Enigma2BouquetList">
				{bouquetItems}
			</div>
		);
	}
});

var Enigma2Box = React.createClass({
	loadBouquetsFromServer: function() {
		var bouquetsUrl = this.props.url + '/bouquets/tv';

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
		this.loadBouquetsFromServer();
	},
	render: function() {
		return (
			<div className="Enigma2Box">
				<Enigma2BouquetList data={this.state.data} />
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
				<Enigma2Box url="/api/v1/enigma2" />
				<BootstrapButton className="btn-default">Button 1</BootstrapButton>
				<BootstrapButton className="btn-default">Button 2</BootstrapButton>
			</div>
		);
	}
});

// render app
ReactDOM.render(<App />, document.getElementById('appContainer'));