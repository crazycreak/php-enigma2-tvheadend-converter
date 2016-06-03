import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import BootstrapButton from 'bootstrap-button';

export default class Modal extends Component {
        // define default properties
	static defaultProps = {
        	confirm: false,
                onConfirm: null,
                cancel: false,
                onCancel: null,
                children: null,
                title: 'Title'
	}
        // initial state
	state = {
		confirm: this.props.confirm,
                onConfirm: this.props.onConfirm,
                cancel: this.props.cancel,
                onCancel: this.props.onCancel,
                children: this.props.children,
                title: this.props.title
	}

        constructor(props) {
		super(props);
	}

        handleCancel = () => { if (this.state.onCancel) this.state.onCancel(); }
        handleConfirm = () => { if (this.state.onConfirm) this.state.onConfirm(); }

        close = () => $(this.refs.root).modal('hide');
        open = () => $(this.refs.root).modal('show');

        render() {
                var confirmButton = null;
                var cancelButton = null;

                if (this.state.confirm) {
                        confirmButton = (
                                <BootstrapButton onClick={this.handleConfirm} className="btn-primary">
                                        {this.state.confirm}
                                </BootstrapButton>
                        );
                }

                if (this.state.cancel) {
                        cancelButton = (
                                <BootstrapButton onClick={this.handleCancel} className="btn-default">
                                        {this.state.cancel}
                                </BootstrapButton>
                        );
                }

                return (
                        <div className="modal fade" ref="root">
                                <div className="modal-dialog">
                                        <div className="modal-content">
                                                <div className="modal-header">
                                                        <h3>{this.state.title}</h3>
                                                </div>
                                                <div className="modal-body">
                                                        {this.state.children}
                                                </div>
                                                <div className="modal-footer">
                                                        {cancelButton}
                                                        {confirmButton}
                                                </div>
                                        </div>
                                </div>
                        </div>
                );
        }
}
