<?php
namespace Tvheadend;
use Http\Client;
use Tvheadend\Modules\Node as NodeModule;
use Tvheadend\Modules\Channel as ChannelModule;
use Tvheadend\Modules\ChannelTag as ChannelTagModule;
use Tvheadend\Modules\Service as ServiceModule;

class Server {
	/**
	 * @var Http\Client
	 */
	private $_client = null;

	/**
	 * @var Tvheadend\Modules\Node
	 */
	private $_nodeModule = null;

	/**
	 * @var Tvheadend\Modules\Channel
	 */
	private $_channelModule = null;

	/**
	 * @var Tvheadend\Modules\ChannelTag
	 */
	private $_channelTagModule = null;

	/**
	 * @var Tvheadend\Modules\Service
	 */
	private $_serviceModule = null;

	/**
	 * constructor
	 */
	public function __construct($hostname, $port = 9981, $username = null, $password = null) {
		$this->_client = new Client($hostname, $port);

		// set credentials
		if ($username !== null && $password !== null) $this->setCredentials($username, $password);

		// set headers
		$this->setHeaders(array(
			'Content-Type: application/x-www-form-urlencoded; charset=UTF-8',
			'Accept-Encoding: identity'
		));

		$this->attemptConnection();
	}

	/**
	 * @return	Tvheadend\Modules\Node
	 */
	public function getNodeModule() {
		if ($this->_nodeModule == null) {
			$this->_nodeModule = new NodeModule($this->getClient());
		}

		return $this->_nodeModule;
	}

	/**
	 * @return	Tvheadend\Modules\Channel
	 */
	public function getChannelModule() {
		if ($this->_channelModule == null) {
			$this->_channelModule = new ChannelModule($this->getClient());
		}

		return $this->_channelModule;
	}

	/**
	 * @return	Tvheadend\Modules\ChannelTag
	 */
	public function getChannelTagModule() {
		if ($this->_channelTagModule == null) {
			$this->_channelTagModule = new ChannelTagModule($this->getClient());
		}

		return $this->_channelTagModule;
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
	 * set header informations for the client
	 * @param	string			$username
	 * @param	string			$password
	 */
	protected function setHeaders($headers) {
		$this->getClient()->setHeaders($headers);
	}

	/**
	 * try connection
	 */
	protected function attemptConnection() {
		$this->getClient()->doGet('/');
	}
}
