import Store from 'core-store';
import dispatcher from '../dispatcher';
import Actions from '../actions';
import $ from 'jquery';

class TVHeadendStore extends Store {
	constructor() {
        	super('TVHeadendStore');
        	this.logger.debug('Initializing AppStore');

		this.initialize('appHeaderText', 'TVHeadend');
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

var tvheadendStore = new TVHeadendStore();
dispatcher.registerStore(tvheadendStore);

export default tvheadendStore;
