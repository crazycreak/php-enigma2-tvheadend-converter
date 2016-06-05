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

	handleMap = () => $.when(this.loadPreviewServices()).done(this.openPreviewModal());

	loadPreviewServices = () => this.refs.previewService.load();
	openPreviewModal = () => this.refs.previewModal.open();
	closePreviewModal = () => this.refs.previewModal.close();

	handlePreviewConfirm = () => {
		this.closePreviewModal();
		$.when(this.loadMapServices()).done(this.openMapModal());
	}
	handlePreviewCancel = () => {
		if (confirm('Are you sure you want to cancel?')) this.closePreviewModal();
	}
	handlePreviewLoad = (data) => this.refs.mapService.setParameterObj(data);

	loadMapServices = () => this.refs.mapService.load();
	openMapModal = () => this.refs.mapModal.open();
	closeMapModal = () => this.refs.mapModal.close();

	handleMapConfirm = () => this.closeMapModal();

        render() {
		var async = false;
		var parameters = null;
		parameters = {
			'svcname': this.state.data.e2servicename
		};
		var PreviewComponent = null;
                PreviewComponent = (
			<PreviewService ref="previewService" method="multiple" parameter="array" parameterObj={parameters} async={async} loaded={this.handlePreviewLoad} />
		);
		var MapComponent = null;
                MapComponent = (
			<MapService ref="mapService" method="channel" parameter="array" />
		);

                return (
			<div className="channel-map">
				<BootstrapModal ref="previewModal"
						className="preview-modal"
						confirm="map"
						onConfirm={this.handlePreviewConfirm}
						cancel="cancel"
						onCancel={this.handlePreviewCancel}
						title="Preview">
					<div><strong>Name:</strong> {this.state.data.e2servicename}</div>
					<div><strong>Reference:</strong> {this.state.data.e2servicereference}</div>
					{PreviewComponent}
				</BootstrapModal>
				<BootstrapModal ref="mapModal"
						className="map-modal"
						confirm="ok"
						onConfirm={this.handleMapConfirm}
						title="Map">
					<div><strong>Name:</strong> {this.state.data.e2servicename}</div>
					<div><strong>Reference:</strong> {this.state.data.e2servicereference}</div>
					{MapComponent}
				</BootstrapModal>
			</div>
                );
        }
}

var PreviewService = withTVHeadendData('service', 'GET', class extends Component {
	componentDidUpdate () {
		this.props.loaded(this.props.data[0]);
	}
	render() {
		if (this.props.data.length === 0) {
			return (
				<div className="no-channels-found">
					<strong>no TVHeadend Channel(s) found ...</strong>
				</div>
			);
		}
		var items = this.props.data.map(function(item) {
			return <li>{item.svcname} ({item.provider})</li>;
		});
		return (
			<div className="channels-found">
				<strong>TVHeadend Channel(s) found:</strong>
				<ul>{items}</ul>
			</div>
		);
	}
});

var MapService = withTVHeadendData('service', 'POST', class extends Component {
	render() {
		if (this.props.data.length === 0) {
			return <div className="empty"></div>;
		}
		return (
			<div className="channel-mapped">
				<strong>sucess</strong>
			</div>
		);
	}
});
