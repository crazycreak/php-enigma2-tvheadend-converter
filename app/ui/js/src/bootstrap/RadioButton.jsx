import React, { Component, PropTypes } from 'react';

export default class RadioButton extends Component {
        // define default properties
	static defaultProps = {
                'disabled': false,
                'checked': false
	}
	// initial state
	state = {
                name: this.props.name,
                label: this.props.label,
                value: this.props.value,
                disabled: this.props.disabled,
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
                else if (this.state.disabled) props.disabled = true;

		return (
                        <div class="radio">
                                <label>
                                        <input {...props} type="radio" name={this.state.name} value={this.state.value} onChange={this.handleChange} />
                                        {this.state.label}
                                </label>
                        </div>
		);
	}
}
