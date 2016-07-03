import dispatcher from '../dispatcher';
import { assign } from 'lodash';

export default class Enigma2Actions {
	static requestEnigma2Data(obj) {
		let defaultOptions = {
			url: '/api/v1/enigma2',
			http: 'GET',
			async: true,
			module: '',
			method: '',
			parameter: '',
			parameterObj: {}
		};
		let options = assign(defaultOptions, obj);
                dispatcher.dispatch('REQUEST-ENIGMA2-DATA', options);
        }

	static processEnigma2Data(request, property) {
		let options = {
			'request': request,
			'property': property
		};
		dispatcher.dispatch('PROCESS-ENIGMA2-DATA', options);
	}

	static resetEnigma2Data(property) {
		dispatcher.dispatch('RESET-ENIGMA2-DATA', property);
	}
}
