import React, { Component } from 'react';
import $ from 'jquery';
import { withTVHeadendData } from 'tvheadend-data';
import BootstrapModal from 'bootstrap-modal';
import BootstrapRadioButtonGroup from 'bootstrap-radiobuttongroup';

export default class ChannelMap extends Component {
	// initial state
	state = {
		loaded: false,
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
		if (this.state.loaded) {
			this.closePreviewModal();
			$.when(this.loadMapServices()).done(this.openMapModal());
		} else {
			if (confirm('No channel selected, cancel?')) this.closePreviewModal();
		}
	}
	handlePreviewCancel = () => {
		if (confirm('Are you sure you want to cancel?')) this.closePreviewModal();
	}
	handleLoaded = (data) => {
		if (!this.state.loaded) this.setState({loaded: true});
		this.refs.mapService.setParameterObj(data);
	}

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
			<PreviewService ref="previewService" method="multiple" parameter="array" parameterObj={parameters} async={async} loaded={this.handleLoaded} />
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
	// initial state
	state = {
                checkedIndex: ''
	}


	componentDidUpdate () {
		var index = this.state.checkedIndex;
		if (this.props.data.length === 1 && (typeof(this.props.data.channel) == 'undefined' || this.props.data.channel.length === 0)) {
			index = 0;
		}
		if (index !== '') {
			this.props.loaded(this.props.data[index]);
		}
	}
	onChange = (index) => {
		if (this.state.checkedIndex !== index) this.setState({checkedIndex: index});
	}
	render() {
		if (this.props.data.length === 0) {
			return (
				<div className="no-channels-found">
					<strong>no TVHeadend Channel(s) found ...</strong>
				</div>
			);
		}
		var items = this.props.data.map(function(item, index) {
			var disabled = (typeof(item.channel) != 'undefined' && item.channel.length > 0 ? true : false);
			var label = item.svcname + ' (' + item.provider + ')';
			if (disabled) label += ' - already mapped';
			return {
				label: label,
				value: index,
				disabled: disabled
			};
		});
		return (
			<div className="channels-found">
				<strong>TVHeadend Channel(s) found:</strong>
				<BootstrapRadioButtonGroup name="tvh-items" buttons={items} onChange={this.onChange} />
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
