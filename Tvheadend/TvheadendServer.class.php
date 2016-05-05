<?php
namespace Tvheadend;
use Tvheadend\Models\Channel;
use Tvheadend\Models\Service;
use Http\Client;

class TvheadendServer {
	/**
	 * @var Http\Client
	 */
	private $_client;

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