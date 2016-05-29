import React from 'react';

export default class TVHeadendApp extends React.Component {
	render() {
		var message = 'TVHeadend';
		var header = (
			<h1>{message}</h1>
		);

		return (
			<div className="tvheadend-app">{header}</div>
		);
	}
}
