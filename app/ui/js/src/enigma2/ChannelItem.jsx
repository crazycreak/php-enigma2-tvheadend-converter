import React, { Component, PropTypes } from 'react';
import BootstrapButton from 'bootstrap-button';
import BootstrapModal from 'bootstrap-modal';

export default class ChannelItem extends Component {
	// initial state
	state = {
		data: this.props.data
	}

	constructor(props) {
		super(props);
	}

	mapChannel = () => {
		// todo: call server with data
		console.log(this.state.data);
	}

	openModal = () => this.refs.modal.open();
	closeModal = () => this.refs.modal.close();
	handleConfirm = () => {
		this.mapChannel();
		this.closeModal();
	}
	handleCancel = () => {
		if (confirm('Are you sure you want to cancel?')) {
			this.refs.modal.close();
		}
	}

	render() {
		var servicename = null;
		if (typeof(this.state.data.e2servicename) != 'undefined') servicename = <span className="service-name">{this.state.data.e2servicename}</span>;

		var servicereference = null;
		if (typeof(this.state.data.e2servicereference) != 'undefined') servicereference = <span className="service-name">{this.state.data.e2servicereference}</span>;

		var number = null;
		if (typeof(this.state.data.number) != 'undefined') number = <span className="number label label-default">{this.state.data.number}</span>;

		var modal = null;
		modal = (
			<BootstrapModal ref="modal"
					confirm="map"
					onConfirm={this.handleConfirm}
					cancel="cancel"
					onCancel={this.handleCancel}
					title="Map TVHeadend Channel">
				<h4>Name: {servicename}</h4>
				<span>Ref: {servicereference}</span>
			</BootstrapModal>
		);

		return (
			<li className="channel-item list-group-item">
				<BootstrapButton className="btn-info btn-xs" onClick={this.openModal}>map</BootstrapButton>
				{modal}
				{number}
				{servicename}
			</li>
		);
	}
}
