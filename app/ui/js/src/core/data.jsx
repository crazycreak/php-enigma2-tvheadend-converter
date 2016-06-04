import React, { Component } from 'react';
import $ from 'jquery';

export function withData(httpMethod, ComposedComponent) {
        return class extends Component {
                // define default properties
        	static defaultProps = {
                        url: '',
                        path: '',
                	parameter: ''
        	}
                // initial state
                state = {
                        data: [],
                        url: this.props.url,
                        path: this.props.path,
                        parameter: this.props.parameter
                }

                constructor(props) {
        		super(props);
        	}

                load = () => {
                        // required
                        if (this.state.url == '' || this.state.path == '') return;

                        var _url = this.state.url + this.state.path;
                        // optional
                        if (this.state.parameter != '') _url += '/' + this.state.parameter;

                        $.ajax({
                		url: _url,
                                type: httpMethod,
                		dataType: 'json',
                		cache: false,
                		success: function(result) {
                			if (result['code'] == 200) {
                				this.setState({data: result['data']});
                			}
                		}.bind(this),
                		error: function(xhr, status, err) {
                			console.error(_url, status, err.toString());
                		}.bind(this)
                        });
                }

                clear = () => this.setState({data: []});

                render() {
                        const addProps = {
                                data: this.state.data
                        }
                        return <ComposedComponent {...this.props} {...addProps} />;
                }
        };
}
