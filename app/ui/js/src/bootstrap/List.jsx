import React, { Component } from 'react';

export default class List extends Component {
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
                        <ul className={(this.state.className || '') + ' list-group'}>
				{this.state.children}
			</ul>
                );
        }
}
