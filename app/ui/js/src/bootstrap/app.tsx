import * as React from 'react';
import Navigation from './Navigation';

export default class BootstrapApp extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
	}

        render() {
                return (
			<div className="bootstrap-app">
				<Navigation />
				<div className="container">
                                        {this.props.children}
                                </div>
			</div>
		);
	}
}
