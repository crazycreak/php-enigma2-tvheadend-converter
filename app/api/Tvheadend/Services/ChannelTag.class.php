<?php
namespace Tvheadend\Services;
use Tvheadend\Models;

class ChannelTag {
	/**
	 * @var Http\Client
	 */
	private $_client = null;

	/**
	 * constructor
	 */
	public function __construct($client) {
		$this->_client = $client;
	}

	/**
	 * returns a list of channel tags by filters
	 * @param	array			$filters
	 * @return	array<\Tvheadend\Models\ChannelTag>
	 */
	public function get(array $filters = array()) {
		if (empty($filters)) return false;

		// get all tags
		$allTags = $this->getAll();

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
	 * returns an array with all channel tags
	 * @return	array<\Tvheadend\Models\ChannelTag>
	 */
	public function getAll() {
		$tags = array();
		$response = $this->_client->doGet('/api/channeltag/grid', array(
			'all' => 1,
			'dir'=>'ASC',
			'sort' => 'name'
		));

		$content = json_decode($response->getContent());
		foreach ($content->entries as $entry) {
			$tags[] = new Models\ChannelTag($entry);
		}

		return $tags;
	}

	/**
	 * create a tag by the given config
	 * @param	array			$config
	 * @return	boolean
	 */
	public function create($config = array()) {
		if (empty($config) || !isset($config['name']) || empty($config['name'])) return false;

		// create a channel tag with default properties
		$channelTag = Models\ChannelTag::create();
		// set/override properties by config
		foreach ($config as $key => $value) {
			$channelTag->$key = $value;
		}

		$response = $this->_client->doGet('/api/channeltag/create', array('conf' => json_encode($channelTag)));
		$status = $response->getStatus();
		// failed
		if ($status != 200) return false;
		// success
		return true;
	}
}
