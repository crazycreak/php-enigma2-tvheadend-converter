import Store from 'core-store';
import dispatcher from '../dispatcher';
import Enigma2Actions from '../actions/Enigma2Actions';
import $ from 'jquery';

class Enigma2Store extends Store {
	constructor() {
        	super('Enigma2Store');
        	this.logger.debug('Initializing AppStore');

		this.initialize('appHeaderText', 'Enigma2');
	}

	onAction(actionType, data) {
		this.logger.debug(`Received Action ${actionType} with data`, data);
		switch (actionType) {
			case 'REQUEST-ENIGMA2-DATA':
				let path = '/' + data.module + '/' + data.method;
				let url = data.url + path;
				if (data.parameter != '') url += '/' + data.parameter;

				this.sendAjaxRequest(url, data.http, data.async, data.property);
				break;
			case 'PROCESS-ENIGMA2-DATA':
				if (data['request']['code'] == 200) {
					this.set(data['setProperty'], data['request']['data']);
				}
				break;
			case 'RESET-ENIGMA2-DATA':
				this.set(data, []);
				break;
			default:
                		this.logger.debug('Unknown actionType for this store - ignoring');
                		break;
		}
        }

	sendAjaxRequest(url, method, async, setProperty) {
		$.ajax({
			url: url,
			type: method,
			async: async,
			dataType: 'json',
			cache: false
		}).done(response => {
			Enigma2Actions.processEnigma2Data(response, setProperty);
		});
	}
}

var enigma2Store = new Enigma2Store();
dispatcher.registerStore(enigma2Store);

export default enigma2Store;
