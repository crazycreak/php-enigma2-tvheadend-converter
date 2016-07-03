import React, { Component } from 'react';
import { withData } from 'core-data';

export function withTVHeadendData(tvhModule, httpMethod, ComposedComponent) {
	return class extends Component {
		// define default properties
		static defaultProps = {
			url: '/api/v1/tvheadend',
			path: ''
		}
		// initial state
		state = {
			url: this.props.url,
			path: '/' + tvhModule + '/' + this.props.method
		}

		constructor(props) {
			super(props);
		}

		setParameter = (param) => this.refs.core.setParameter(param);
		setParameterObj = (obj) => this.refs.core.setParameterObj(obj);

		load = () => this.refs.core.load();
		get = () => this.refs.core.get();
		clear = () => this.refs.core.clear();

		render() {
			const addProps = {
				url: this.state.url,
				path: this.state.path
			}

			var Data = withData(httpMethod, ComposedComponent);
			return <Data ref="core" {...this.props} {...addProps} />;
		}
	}
}
