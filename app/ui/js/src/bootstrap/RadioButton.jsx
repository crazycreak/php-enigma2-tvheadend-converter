import React, { Component } from 'react';

export default class RadioButton extends Component {
	// initial state
	state = {
                name: this.props.name,
                label: this.props.label,
                value: this.props.value,
                checked: this.props.checked,
                onChange: this.props.onChange
	}

	constructor(props) {
		super(props);
	}

        handleChange = () => this.state.onChange(this.state.value);

	render() {
                var props = {};
                if (this.state.checked) props.checked = true;
		return (
                        <div class="radio">
                                <label>
                                        <input type="radio" name={this.state.name} value={this.state.value} onChange={this.handleChange} {...props} />
                                        {this.state.label}
                                </label>
                        </div>
		);
	}
}
