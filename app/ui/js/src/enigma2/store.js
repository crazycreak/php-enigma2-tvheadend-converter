import Store from 'core-store';
import dispatcher from '../dispatcher';

class Enigma2Store extends Store {
	constructor() {
        	super('Enigma2Store');
        	this.logger.debug('Initializing AppStore');

		this.initialize('appHeaderText', 'Enigma2');
	}

	onAction(actionType, data) {
		this.logger.debug(`Received Action ${actionType} with data`, data);
		switch (actionType) {
			default:
                		this.logger.debug('Unknown actionType for this store - ignoring');
                	break;
		}
        }

}

var enigma2Store = new Enigma2Store();
dispatcher.registerStore(enigma2Store);

export default enigma2Store;
