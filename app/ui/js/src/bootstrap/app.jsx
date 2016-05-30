import React, { Component, PropTypes } from 'react';
import NavItem from 'bootstrap-navitem';
// es6 import not working for jquery/bootstrap
global.jQuery = require("jquery");
var bootstrap = require('bootstrap');

export default class BootstrapApp extends Component {
        // define required / optional properties
	static propTypes = {
		menuItems: PropTypes.array.isRequired
	}
        // define default properties
	static defaultProps = {
        	menuItems: [
                        {'id': 1, 'link': 'enigma2', 'name': 'Enigma2'},
                        {'id': 2, 'link': 'tvheadend', 'name': 'TVHeadend'}
                ]
	}
        // initial state
	state = {
		menuItems: this.props.menuItems
	}

	constructor(props) {
		super(props);
	}

        render() {
                var menuItems = this.state.menuItems.map(function(item) {
                        return <NavItem key={item.id} item={item} />
                });
                return (
                        <div>
                                <nav className="navbar navbar-default navbar-fixed-top">
                        		<div className="container">
                        			<div className="navbar-header">
                        				<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        					<span className="sr-only">Toggle navigation</span>
                        					<span className="icon-bar"></span>
                        					<span className="icon-bar"></span>
                        					<span className="icon-bar"></span>
                        				</button>
                        				<a className="navbar-brand" href="#">E2-TVH-Converter</a>
                        			</div>
                        			<div id="navbar" className="navbar-collapse collapse">
                        				<ul className="nav navbar-nav">
                                                                {menuItems}
                        				</ul>
                        			</div>
                        		</div>
                        	</nav>
                                <div className="container">
                                        {this.props.children}
                                </div>
                        </div>
                );
        }
}
