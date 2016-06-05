import React, { Component } from 'react';
import $ from 'jquery';
import { withTVHeadendData } from "tvheadend-data";
import BootstrapModal from 'bootstrap-modal';

export default class ChannelMap extends Component {
	// initial state
	state = {
		data: this.props.data
	}

	constructor(props) {
		super(props);
	}

	openModal = () => this.refs.root.open();
	closeModal = () => this.refs.root.close();
	loadServices = () => this.refs.tvhService.load();

        handleMap = () => $.when(this.loadServices()).done(this.openModal());

	handleConfirm = () => {
		this.mapChannel();
		this.closeModal();
	}
	handleCancel = () => {
		if (confirm('Are you sure you want to cancel?')) this.closeModal();
	}
	mapChannel = () => {
		// todo: call server with data
		console.log(this.refs.tvhData);
	}

        render() {
                var ModalComponent = class extends Component {
			render() {
				if (this.props.data.length === 0) {
					return <div className="no-channels-found">no TVHeadend Channel(s) found ...</div>;
				}
				var items = this.props.data.map(function(item) {
					return <li>{item.svcname}</li>;
				});
				return (
					<div className="channels-found">
						<strong>TVHeadend Channel(s) found:</strong>
						<ul>{items}</ul>
					</div>
				);
			}
                };

                var TVHService = withTVHeadendData('service', 'GET', ModalComponent);

		var async = false;
		var parameters = {'svcname': this.state.data.e2servicename};
                var TVHComponent = (
			<TVHService ref="tvhService" method="multiple" parameter="array" parameterObj={parameters} async={async} />
		);

                return (
			<BootstrapModal ref="root"
					className="channel-map"
					confirm="map"
					onConfirm={this.handleConfirm}
					cancel="cancel"
					onCancel={this.handleCancel}
					title="Map Channel => E2-to-TVH">
				<div><strong>Name:</strong> {this.state.data.e2servicename}</div>
				<div><strong>Reference:</strong> {this.state.data.e2servicereference}</div>
                                {TVHComponent}
			</BootstrapModal>
                );
        }
}
