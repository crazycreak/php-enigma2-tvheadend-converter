import React, { Component } from 'react';

export default class Well extends Component {
	// initial state
	state = {
		className: this.props.className,
                children: this.props.children
	}

	constructor(props) {
		super(props);
	}

        render() {
                return (
                        <div className={(this.state.className || '') + ' well'}>
				{this.state.children}
			</div>
                );
        }
}
