import React, { Component, PropTypes } from 'react';

export default class Panel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			classNamePanel: this.props.classNamePanel,
			classNameHeading: this.props.classNameHeading,
			classNameFooter: this.props.classNameFooter,
			headingText: this.props.headingText,
			footerText: this.props.footerText,
			children: this.props.children
		};
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

Panel.displayName = 'Panel';
Panel.propTypes = {
	classNamePanel: PropTypes.string,
	classNameHeading: PropTypes.string,
	classNameFooter: PropTypes.string,
	headingText: PropTypes.string,
	footerText: PropTypes.string,
	children: PropTypes.any
};