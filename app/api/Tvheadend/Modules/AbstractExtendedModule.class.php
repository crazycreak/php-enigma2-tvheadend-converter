<?php
namespace Tvheadend\Modules;
use Modules\AbstractModule;
use Tvheadend\Modules\Message as MessageModule;

abstract class AbstractExtendedModule extends AbstractModule {
	/**
	 * @var Tvheadend\Services\Message
	 */
	private $_messageModule = null;

	/**
	 * @var string
	 */
	protected $notificationClass = '';

	/**
	 * constructor
	 */
	public function __construct($client) {
		parent::__construct($client);

		$this->_messageModule = new MessageModule($client);
	}

	/**
	 * @see Services\Base
	 */
	protected function getClient() {
		$client = parent::getClient();
		// update before return the client
		$this->getMessageModule()->update();
		return $client;
	}

	/**
	 * @return Tvheadend\Services\Message
	 */
	protected function getMessageModule() {
		return $this->_messageModule;
	}

	/**
	 * @return string
	 */
	protected function getResult($key) {
		$result = false;
		$messages = $this->getNotifications();
		foreach ($messages as $message) {
			if (!property_exists($message, $key)) continue;

			$result = $message->$key[0];
			break;
		}
		return $result;
	}

	/**
	 * @return array
	 */
	protected function getNotifications() {
		$all = $this->getMessageModule()->get();
		$messages = array_filter(
			$all,
			function ($message) {
				if (property_exists($message, 'notificationClass') && $message->notificationClass == $this->notificationClass) return true;
				else return false;
			}
		);
		return $messages;
	}
}
