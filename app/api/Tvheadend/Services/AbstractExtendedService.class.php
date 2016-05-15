<?php
namespace Tvheadend\Services;
use Services\AbstractService;
use Tvheadend\Services\Message as MessageService;

abstract class AbstractExtendedService extends AbstractService {
	/**
	 * @var Tvheadend\Services\Message
	 */
	private $_messageService = null;

	/**
	 * @var string
	 */
	protected $notificationClass = '';

	/**
	 * constructor
	 */
	public function __construct($client) {
		parent::__construct($client);

		$this->_messageService = new MessageService($client);
	}

	/**
	 * @see Services\Base
	 */
	protected function getClient() {
		$client = parent::getClient();
		// update before return the client
		$this->getMessageService()->update();
		return $client;
	}

	/**
	 * @return Tvheadend\Services\Message
	 */
	protected function getMessageService() {
		return $this->_messageService;
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
		$all = $this->getMessageService()->get();
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
