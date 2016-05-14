<?php
namespace Tvheadend\Services;
use Tvheadend\Models;

class ChannelTag extends ExtendedServiceBase {
	/**
	 * @see Tvheadend\Services\ExtendedBase
	 */
	protected $notificationClass = 'channeltag';

	/**
	 * returns a filterd list of channel tags
	 * @param	array			$filters
	 * @return	array<\Tvheadend\Models\ChannelTag>
	 */
	public function get(array $filters = array()) {
		if (empty($filters)) return false;

		// get all tags
		$all = $this->getAll();

		// search for tags by filters
		$tags = array_filter(
			$all,
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
		sort($tags);
		return $tags;
	}

	/**
	 * returns an array with all channel tags
	 * @return	array<\Tvheadend\Models\ChannelTag>
	 */
	public function getAll() {
		$tags = array();
		$response = $this->getClient()->doGet('/api/channeltag/grid', array(
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
	 * @return	mixed
	 */
	public function create(array $config = array()) {
		if (empty($config) || !isset($config['name']) || empty($config['name'])) return false;

		// create a channel tag with default properties
		$channelTag = Models\ChannelTag::create();
		// set/override properties by config
		foreach ($config as $key => $value) {
			$channelTag->$key = $value;
		}

		$response = $this->getClient()->doGet('/api/channeltag/create', array(
			'conf' => json_encode($channelTag)
		));

		$status = $response->getStatus();
		// failed
		if ($status != 200) return false;
		// check result
		return $this->getResult('change');
	}
}
