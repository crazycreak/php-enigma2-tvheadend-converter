<?php
namespace Tvheadend;
use Http\Client;
use Tvheadend\Services\Node as NodeService;
use Tvheadend\Services\Channel as ChannelService;
use Tvheadend\Services\ChannelTag as ChannelTagService;
use Tvheadend\Services\Service as ServiceService;

class Server {
	/**
	 * @var Http\Client
	 */
	private $_client = null;

	/**
	 * @var Tvheadend\Services\Node
	 */
	private $_nodeService = null;

	/**
	 * @var Tvheadend\Services\Channel
	 */
	private $_channelService = null;

	/**
	 * @var Tvheadend\Services\ChannelTag
	 */
	private $_channelTagService = null;

	/**
	 * @var Tvheadend\Services\Service
	 */
	private $_serviceService = null;

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
	 * @return	Tvheadend\Services\Node
	 */
	public function getNodeService() {
		if ($this->_nodeService == null) {
			$this->_nodeService = new NodeService($this->getClient());
		}

		return $this->_nodeService;
	}

	/**
	 * @return	Tvheadend\Services\Channel
	 */
	public function getChannelService() {
		if ($this->_channelService == null) {
			$this->_channelService = new ChannelService($this->getClient());
		}

		return $this->_channelService;
	}

	/**
	 * @return	Tvheadend\Services\ChannelTag
	 */
	public function getChannelTagService() {
		if ($this->_channelTagService == null) {
			$this->_channelTagService = new ChannelTagService($this->getClient());
		}

		return $this->_channelTagService;
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
