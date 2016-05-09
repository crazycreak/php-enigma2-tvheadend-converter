<?php
namespace Tvheadend;
use Tvheadend\Models\Channel;
use Tvheadend\Models\ChannelTag;
use Tvheadend\Models\Service;
use Http\Client;

class TvheadendServer {
	/**
	 * @var Http\Client
	 */
	private $_client = null;

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
	 * returns the list of channel tags
	 * @param	array			$filters
	 * @return	array<\Tvheadend\Models\ChannelTag>
	 */
	public function getChannelTags($filters = null) {
		$tags = array();
		$response = $this->_client->doGet('/api/channeltag/grid', array('all' => 1, 'dir'=>'ASC', 'sort' => 'name'));

		$content = json_decode($response->getContent());
		foreach ($content->entries as $entry) {
			$tags[] = new ChannelTag($entry);
		}

		if ($filters == null) {
			return $tags;
		}

		// search for tags by filters
		$filteredTags = array_filter(
			$tags,
			function ($tag) use ($filters) {
				$valid = true;
				foreach ($filters as $key => $value) {
					// invalid filter
					if (!$tag->hasProperty($key)) continue;
					// filter ok
					else if ($tag->$key === $value) continue;
					// not valid
					$valid = false;
					break;
				}
				return $valid;
			}
		);
		// reset order
		sort($filteredTags);

		return $filteredTags;
	}

	/**
	 * create a tag tag by the given config
	 * @param	array			$config
	 * @return	boolean
	 */
	public function createChannelTag($config = array()) {
		if (empty($config) || !isset($config['name']) || empty($config['name'])) return false;

		$default_config = array(
			"enabled" => true,
			"index" => 0,
			"internal" => false,
			"private" => false,
			"icon" => "",
			"titled_icon" => false,
			"comment" => ""
		);

		foreach ($default_config as $key => $value) {
			if (isset($config[$key])) continue;

			$config[$key] = $value;
		}

		$response = $this->_client->doGet('/api/channeltag/create', array('conf' => json_encode($config)));
		$status = $response->getStatus();
		if ($status != 200) {
			return false;
		}
		// success
		return true;
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
