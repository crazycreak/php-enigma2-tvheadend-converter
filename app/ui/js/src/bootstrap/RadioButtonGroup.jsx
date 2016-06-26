import React, { Component } from 'react';
import BootstrapRadioButton from 'bootstrap-radiobutton';

export default class RadioButtonGroup extends Component {
	// initial state
	state = {
		name: this.props.name,
                buttons: this.props.buttons,
                onChange: this.props.onChange
	}

        constructor(props) {
		super(props);
	}

        onChange = (index) => this.state.onChange(index);

        render() {
                var checked = this.state.buttons.length === 1;
                var items = this.state.buttons.map((item, index) => {
                        var key = 'item-' + index;
                        return (
                                <BootstrapRadioButton key={key}
                                        label={item.label}
                                        value={item.value}
                                        disabled={item.disabled}
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

RadioButtonGroup.displayName = 'RadioButtonGroup';