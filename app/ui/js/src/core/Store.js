import EventEmitter from 'events';
import Logger from './Logger';

export default class Store {
	/**
	 * A Flux-like Store Interface
	 *
	 * @constructor
	 * @this {Store}
	 * @param {string} name The name of the store
	 */
	constructor(name) {
		this.storeName = name;
		this.registeredViews = {};
		this.storeData = {};
		this.eventbus = new EventEmitter();
		this.logger = new Logger(this.storeName);

		this.logger.debug('Registering local event bus listener for STORE_CHANGED event');
		this.eventbus.on('STORE_CHANGED', this.onStoreChange.bind(this));
	}

	/**
	 * Read-only Property for the name of the store
	 */
	get name() {
		return this.storeName;
	}

	/**
	 * Dummy onAction() method to catch failures in sub-classing the
	 * Store appropriately.
	 */
	onAction() {
		this.logger.error('Invalid Store - Must define onAction method');
	}

	/**
	 * A view needs to be able to register itself with the store to receive
	 * notifications of updates to the store
	 *
	 * @param {function} callback the method to call back
	 * @returns {string} an ID to be used when un-registering
	 */
	registerView(callback) {
		let id = `${this.storeName}-${this.guid}`;
		this.logger.debug(`Registering new View Callback and returning ID ${id}`);
		this.registeredViews[id] = callback;
		return id;
	}

	/**
	 * A view also needs to be able to de-register itself with the store to
	 * stop receiving notifications of updates to the store.
	 *
	 * @param {string} id the ID from the call to registerView()
	 * @param {boolean} force don't throw an error if it doesn't exist
	 */
	deregisterView(id, force = false) {
		this.logger.debug(`deregisterView(${id}, ${force})`);
		if (id in this.registeredViews) {
			this.logger.debug(`Deregistering View Callback with ID ${id}`);
			delete this.registeredViews[id];
		} else {
			if (!force) {
				throw 'Invalid View Registration ID';
			}
		}
	}

	/**
	 * Emit a change store event on the private Event Bus
	 */
	changeStore() {
		this.logger.debug('Emitting Store Change Event');
		this.eventbus.emit('STORE_CHANGED');
	}

	/**
	 * Pass on change store events to the registered views
	 */
	onStoreChange() {
		for (let viewID in this.registeredViews) {
			this.logger.debug(`Sending Store Change Event to View Registration ${viewID}`);
			this.registeredViews[viewID]();
		}
	}

	/**
	 * Initialize the store with a key-value pair
	 *
	 * @param {string} key the key name
	 * @param {object} value the key value
	 */
	initialize(key, value) {
		this.storeData[key] = value;
	}

	/**
	 * Set a key in the store to a new value
	 *
	 * @param {string} key the key name
	 * @param {object} value the key value
	 * @throws exception if the key does not exist
	 */
	set(key, value, squashEvent = false) {
		this.logger.debug(`Setting ${key}=${value}`);
		if (key in this.storeData) {
			this.storeData[key] = value;
			if (!squashEvent) {
				this.changeStore();
			}
		} else {
			throw `Unknown key ${key} in store`;
		}
	}

	/**
	 * Retrieve a key in the store
	 *
	 * @param {string} key the key name
	 * @returns {object} the key value
	 * @throws exception if the key does not exist
	 */
	get(key) {
		if (key in this.storeData) {
			return this.storeData[key];
		}
		throw `Unknown key ${key} in store`;
	}

	/**
	 * Generate an RFC-4122 Version 4 compliant Unique ID. We only need
	 * pseudo IDs since we are salting with the name of the store.
	 *
	 * @return {string}
	 */
	get guid() {
		let u = '', i = 0;
		while (i++ < 36) {
			let c = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'[i - 1],
			r = Math.random() * 16 | 0;
			v = (c === 'x' ? r : ( r & 0x3 | 0x8));
			u += (c === '-' || c === '4') ? c : v.toString(16);
		}
		return u;
	}
}
