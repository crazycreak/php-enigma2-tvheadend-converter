<?php
namespace Enigma2;
use Enigma2\Modules\Service as ServiceModule;
use Http\Client;

class Server {
	/**
	 * @var Http\Client
	 */
	private $_client;

	/**
	 * @var Enigma2\Modules\Service
	 */
	private $_serviceModule = null;

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
	 * @return	Tvheadend\Modules\Service
	 */
	public function getServiceModule() {
		if ($this->_serviceModule == null) {
			$this->_serviceModule = new ServiceModule($this->getClient());
		}

		return $this->_serviceModule;
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