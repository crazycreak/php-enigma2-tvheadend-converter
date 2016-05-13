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

var App = React.createClass({
	render: function() {
		var message = 'Hello World Application!'
		var header = null;

		header = (
			<h1>{message}</h1>
		);

		return (
			<div className="main">
				{header}
				<BootstrapButton className="btn-default">Button 1</BootstrapButton>
				<BootstrapButton className="btn-default">Button 2</BootstrapButton>
			</div>
		);
	}
});

// render app
ReactDOM.render(<App />, document.getElementById('appContainer'));