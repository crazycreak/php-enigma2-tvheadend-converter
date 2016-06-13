import React, { Component } from 'react';
import $ from 'jquery';

export function withData(httpMethod, ComposedComponent) {
	return class extends Component {
		// define default properties
		static defaultProps = {
			url: '',
			path: '',
			parameter: '',
			parameterObj: null,
			async: true
		}
		// initial state
		state = {
			data: [],
			url: this.props.url,
			path: this.props.path,
			parameter: this.props.parameter,
			parameterObj: this.props.parameterObj,
			async: this.props.async
		}

		constructor(props) {
			super(props);
		}

		handleSuccess = (result) => {
			if (result['code'] == 200) {
				this.setState({data: result['data']});
			}
		}

		handleError = (xhr, status, err) => {
			console.error(_url, status, err.toString());
		}

		setParameter = (param) => this.setState({parameter: param});
		setParameterObj = (obj) => this.setState({parameterObj: obj});

		load = () => {
			// required
			if (this.state.url == '' || this.state.path == '') return;

			var _url = this.state.url + this.state.path;
			// optional
			if (this.state.parameter != '') _url += '/' + this.state.parameter;

			return $.ajax({
				url: _url,
				type: httpMethod,
				async: this.state.async,
				dataType: 'json',
				data: this.state.parameterObj,
				cache: false,
				success: this.handleSuccess,
				error: this.handleError
			});
		}

		get = () => { return this.state.data; }

		clear = () => this.setState({data: []});

		render() {
			const addProps = {
				data: this.state.data
			}
			return <ComposedComponent {...this.props} {...addProps} />;
		}
	};
}
