<?php
namespace Tvheadend;
use Tvheadend\Services\ChannelTag as ChannelTagService;
use Tvheadend\Models\Channel;
use Tvheadend\Models\Service;
use Http\Client;

class Server {
	/**
	 * @var Http\Client
	 */
	private $_client = null;

	/**
	 * @var Tvheadend\Services\ChannelTag
	 */
	private $_channelTagService = null;

	private $_boxid = null;

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
	 * returns the list of channels
	 * @param	TBD			$filter
	 * @return	array<\Tvheadend\Models\Channel>
	 */
	public function getChannels($filter = null) {
		$channels = array();
		$response = $this->_client->doGet('/api/channel/grid', array('all' => 1, 'dir'=>'ASC', 'limit' => 9999, 'start' => 0));

		$content = json_decode($response->getContent());
		foreach ($content->entries as $entry) {
			$channels[] = new Channel($entry);
		}
		return $channels;
	}

	/**
	 * @return	Tvheadend\Services\ChannelTag
	 */
	public function getChannelTagService() {
		if ($this->_channelTagService == null) {
			$this->_channelTagService = new ChannelTagService($this->_client);
		}

		return $this->_channelTagService;
	}

	/**
	 * returns the list of services
	 * @param	TBD			$filter
	 * @return	array<\Tvheadend\Models\Service>
	 */
	public function getServices($filter = null) {
		$services = array();
		$response = $this->_client->doGet('/api/mpegts/service/grid', array('all' => 1, 'dir'=>'ASC', 'limit' => 9999, 'start' => 0));

		$content = json_decode($response->getContent());
		foreach ($content->entries as $entry) {
			$services[] = new Service($entry);
		}
		return $services;
	}

	/**
	 * maps the given services as channels
	 * @param	array<\Tvheadend\Models\Service>	$services
	 * @return	boolean
	 */
	public function mapServices($services = null) {
		if ($services == null) return false;

		// set uuids for request
		$uuids = array();
		foreach ($services as $service) {
			if ($service instanceof Service) {
				array_push($uuids, $service->uuid);
			}
		}
		// no valid services
		if (empty($uuids)) return false;

		$response = $this->_client->doGet('/api/service/mapper/start', array('uuids' => json_encode($uuids)));
		$status = $response->getStatus();
		if ($status != 200) {
			return false;
		}
		// success
		return true;
	}

	/**
	 * returns data about a node by the given uuid
	 * @param	string		$uuid
	 * @return	\stdClass
	 */
	public function getNode($uuid = '') {
		if (empty($uuid)) return false;

		$response = $this->_client->doGet('/api/idnode/load', array('uuid' => $uuid));
		$content = json_decode($response->getContent());

		if (count($content->entries) > 0) {
			return $content->entries[0];
		} else {
			return null;
		}
	}

	/**
	 * set data by given uuid
	 * @param	string		$uuid
	 * @param	array		$parameters
	 * @return	boolean
	 */
	public function saveNode($uuid = '', $parameters = array()) {
		if (empty($uuid) || empty($parameters)) return false;

		$response = $this->_client->doGet('/api/idnode/save', array(
			'node' => json_encode(array_merge($parameters, array(
				'uuid' => $uuid
			)))
		));
		$status = $response->getStatus();
		if ($status != 200) {
			return false;
		}
		// success
		return true;
	}

	/**
	 * delete a node by the given uuid
	 * @param	string		$uuid
	 * @return	boolean
	 */
	public function deleteNode($uuid = '') {
		if (empty($uuid)) return false;

		$response = $this->_client->doGet('/api/idnode/delete', array('uuid' => $uuid));
		$status = $response->getStatus();

		if ($status != 200) {
			return false;
		}
		// success
		return true;
	}

	public function getLogMessages() {
		$response = $this->_client->doGet('/comet/poll', array(
			'boxid' => $this->getBoxId()
		));

		$content = json_decode($response->getContent());
		print_r($content);
	}

	private function getBoxId() {
		if ($this->_boxid != null) return $this->_boxid;

		$response = $this->_client->doGet('/comet/poll');

		$content = json_decode($response->getContent());
		$this->_boxid = $content->boxid;
		return $this->_boxid;
	}

	/**
	 * set auth informations for the client
	 * @param	string			$username
	 * @param	string			$password
	 */
	protected function setCredentials($username, $password) {
		$this->_client->setCredentials($username, $password);
	}

	/**
	 * set header informations for the client
	 * @param	string			$username
	 * @param	string			$password
	 */
	protected function setHeaders($headers) {
		$this->_client->setHeaders($headers);
	}

	/**
	 * try connection
	 */
	protected function attemptConnection() {
		$this->_client->doGet('/');
	}
}
