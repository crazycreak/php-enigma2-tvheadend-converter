import React, { Component } from 'react';

export default class NavigationHeader extends Component {
	constructor(props) {
		super(props);
	}

        render() {
                return (
                        <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                        <span className="sr-only">Toggle navigation</span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand" href={this.props.href}>{this.props.title}</a>
                        </div>
                );
        }
}
