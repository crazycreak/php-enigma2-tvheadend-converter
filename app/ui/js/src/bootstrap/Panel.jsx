import React, { Component } from 'react';

export default class Panel extends Component {
	// initial state
	state = {
		classNamePanel: this.props.classNamePanel,
                classNameHeading: this.props.classNameHeading,
                classNameFooter: this.props.classNameFooter,
                headingText: this.props.headingText,
                children: this.props.children,
                footerText: this.props.footerText
	}

	constructor(props) {
		super(props);
	}

        render() {
                var header = null;
                if (this.state.headingText) header = <div className={(this.state.classNameHeading || '') + ' panel-heading'}>{this.state.headingText}</div>;

                var footer = null;
                if (this.state.footerText) footer = <div className={(this.state.classNameFooter || '') + ' panel-footer'}>{this.state.footerText}</div>;

                return (
                        <div className={(this.state.classNamePanel || '') + ' panel'}>
				{header}
				{this.state.children}
                                {footer}
			</div>
                );
        }
}
