import React, { Component, PropTypes } from 'react';
import Navigation from './Navigation.jsx';
// es6 import not working for jquery/bootstrap
global.jQuery = require('jquery');
var bootstrap = require('bootstrap');

export default class BootstrapApp extends Component {
	constructor(props) {
		super(props);
	}

        render() {
                return (
                        <div className="bootstrap-app">
                                <Navigation />
                                <div className="container">
                                        {this.props.children}
                                </div>
                        </div>
                );
        }
}

BootstrapApp.displayName = 'BootstrapApp';