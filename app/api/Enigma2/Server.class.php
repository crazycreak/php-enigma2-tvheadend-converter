<?php
namespace Enigma2;
use Enigma2\Services\Service as ServiceService;
use Http\Client;

class Server {
	/**
	 * @var Http\Client
	 */
	private $_client;

	/**
	 * @var Enigma2\Services\Service
	 */
	private $_serviceService = null;

	/**
	 * constructor
	 */
	public function __construct($hostname, $port = 80, $username = null, $password = null) {
		$this->_client = new Client($hostname, $port);

		// set credentials
		if ($username !== null && $password !== null) $this->setCredentials($username, $password);

		$this->attemptConnection();
	}

	/**
	 * @return	Tvheadend\Services\Service
	 */
	public function getServiceService() {
		if ($this->_serviceService == null) {
			$this->_serviceService = new ServiceService($this->getClient());
		}

		return $this->_serviceService;
	}

	/**
	 * @return Http\Client
	 */
	protected function getClient() {
		return $this->_client;
	}

	/**
	 * set auth informations for the client
	 * @param	string			$username
	 * @param	string			$password
	 */
	protected function setCredentials($username, $password) {
		$this->getClient()->setCredentials($username, $password);
	}

	/**
	 * try connection
	 */
	protected function attemptConnection() {
		$this->getClient()->doGet('/');
	}
}