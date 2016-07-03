import React, { Component, PropTypes } from 'react';
import NavigationHeader from './NavigationHeader.jsx';
import NavigationItem from './NavigationItem.jsx';

export default class Navigation extends Component {
        constructor(props) {
		super(props);

		this.state = {
			menuItems: this.props.menuItems
		};
	}

        render() {
                var headerText = 'E2-TVH-Converter';
                var headerHref = '/ui/';
                var items = this.state.menuItems.map(function(item) {
                        return <NavigationItem key={item.id} item={item} />
                });
                return (
                        <nav className="navbar navbar-default navbar-fixed-top">
                		<div className="container">
                			<NavigationHeader href={headerHref} title={headerText} />
                			<div id="navbar" className="navbar-collapse collapse">
                				<ul className="nav navbar-nav">
                                                        {items}
                				</ul>
                			</div>
                		</div>
                	</nav>
                );
        }
}

Navigation.displayName = 'Navigation';
Navigation.propTypes = {
	menuItems: PropTypes.array.isRequired
};
Navigation.defaultProps = {
	menuItems: [
		{'id': 1, 'link': '/ui/enigma2', 'name': 'Enigma2'},
		{'id': 2, 'link': '/ui/tvheadend', 'name': 'TVHeadend'}
	]
};