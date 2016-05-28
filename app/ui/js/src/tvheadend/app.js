var React = require('react');

module.exports = React.createClass({
	render: function() {
		var headerMessage = 'TVHeadend';
		var header = (
			<h1>{headerMessage}</h1>
		);

		return (
			<div className="tvheadend-app">
				{header}
			</div>
		);
	}
});