import React, { Component } from 'react';
import BootstrapRadioButton from 'bootstrap-radiobutton';

export default class RadioButtonGroup extends Component {
	// initial state
	state = {
		name: this.props.name,
                choices: this.props.choices,
                onChange: this.props.onChange
	}

        constructor(props) {
		super(props);
	}

        onChange = (index) => this.state.onChange(index);

        render() {
                var checked = this.state.choices.length === 1;
                var items = this.state.choices.map((item, index) => {
                        return (
                                <BootstrapRadioButton key={index}
                                        label={item.label}
                                        value={item.index}
                                        name={this.state.name}
                                        checked={checked}
                                        onChange={this.onChange} />
                        );
                });
                return (
                        <div className="radio-group">
                                {items}
                        </div>
                );
        }
}
