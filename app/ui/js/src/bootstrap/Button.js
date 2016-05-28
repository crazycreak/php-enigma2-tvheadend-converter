var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
			<a {...this.props}
			    href="javascript:;"
			    role="button"
			    className={(this.props.className || '') + ' btn'} />
		);
	}
});