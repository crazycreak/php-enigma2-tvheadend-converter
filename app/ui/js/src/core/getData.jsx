import React, { Component, PropTypes } from 'react';
import $ from 'jquery';

export function getData(module, method, ComposedComponent) {
        return class extends Component {
                // context variables
                static contextTypes = {
                        url: PropTypes.string.isRequired
                }
                // define default properties
        	static defaultProps = {
                	parameter: ''
        	}
                // initial state
                state = {
                        method: this.props.method,
                        parameter: this.props.parameter,
                        data: []
                }

                constructor(props) {
        		super(props);
        	}

                load = () => {
                        var _url = this.context.url + '/' + module + '/' + this.state.method;
                        if (this.state.parameter != '') _url += '/' + this.state.parameter;
                        $.ajax({
                		url: _url,
                                type: method,
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
                        return <ComposedComponent {...this.props} data={this.state.data} />;
                }
        };
}
