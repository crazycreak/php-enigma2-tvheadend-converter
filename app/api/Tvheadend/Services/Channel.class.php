<?php
namespace Tvheadend\Services;
use Tvheadend\Models;

class Channel {
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
	 * returns a filterd list of channels
	 * @param	array			$filters
	 * @return	array<\Tvheadend\Models\Channel>
	 */
	public function get(array $filters = array()) {
		if (empty($filters)) return false;

		// get all tags
		$all = $this->getAll();

		// search for tags by filters
		$channels = array_filter(
			$all,
			function ($channel) use ($filters) {
				$valid = true;
				foreach ($filters as $key => $value) {
					// invalid filter
					if (!$channel->hasProperty($key)) continue;
					// filter ok
					else if ($channel->$key === $value) continue;
					// not valid
					$valid = false;
					break;
				}
				return $valid;
			}
		);
		// reset order
		sort($channels);

		return $channels;
	}

	/**
	 * returns an array with all channels
	 * @return	array<\Tvheadend\Models\Channel>
	 */
	public function getAll() {
		$channels = array();
		$response = $this->_client->doGet('/api/channel/grid', array(
			'all' => 1,
			'dir'=>'ASC',
			'sort' => 'name',
			'limit' => 9999
		));

		$content = json_decode($response->getContent());
		foreach ($content->entries as $entry) {
			$channels[] = new Models\Channel($entry);
		}

		return $channels;
	}
}
