import React, { Component } from 'react';
import { withData } from "core-data";

export function withEnigma2Data(e2Module, httpMethod, ComposedComponent) {
        return class extends Component {
                // define default properties
        	static defaultProps = {
                        url: '/api/v1/enigma2',
                        path: ''
        	}
                // initial state
                state = {
                        url: this.props.url,
                        path: '/' + e2Module + '/' + this.props.method
                }

                constructor(props) {
        		super(props);
        	}

                load = () => this.refs.data.load();
                clear = () => this.refs.data.clear();

                render() {
                        const addProps = {
                                url: this.state.url,
                                path: this.state.path
                        }

                        var Data = withData(httpMethod, ComposedComponent);
                        return <Data ref="data" {...this.props} {...addProps} />;
                }
        }
}
