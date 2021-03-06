<?php
namespace Tvheadend\Modules;
use Tvheadend\Models;

class Service extends AbstractExtendedModule {
	/**
	 * @see Tvheadend\Services\ExtendedBase
	 */
	protected $notificationClass = 'channel';

	/**
	 * returns a filterd list of services
	 * @param	array			$filters
	 * @return	array<\Tvheadend\Models\Service>
	 */
	public function getMultiple(array $filters = array()) {
		if (empty($filters)) return false;

		// get all tags
		$all = $this->getAll();

		// search for tags by filters
		$services = array_filter(
			$all,
			function ($service) use ($filters) {
				$valid = true;
				foreach ($filters as $key => $value) {
					// filter ok
					if ($service->hasProperty($key) && $service->$key === $value) continue;
					// not valid
					$valid = false;
					break;
				}
				return $valid;
			}
		);
		// reset order
		sort($services);
		return $services;
	}

	/**
	 * returns an array with all services
	 * @return	array<\Tvheadend\Models\Service>
	 */
	public function getAll() {
		$services = array();
		$response = $this->getClient()->doGet('/api/mpegts/service/grid', array(
			'all' => 1,
			'dir'=>'ASC',
			'limit' => 9999,
			'start' => 0
		));

		$content = json_decode($response->getContent());
		foreach ($content->entries as $entry) {
			$services[] = new Models\Service($entry);
		}
		return $services;
	}

	/**
	 * maps the given simple services array as channel
	 * @param	array					$services
	 * @return	boolean
	 */
	public function setChannel($serviceArray = null) {
		$service = new Models\Service((object)$serviceArray);

		return $this->map(array($service));
	}

	/**
	 * maps the given services as channels
	 * @param	array<\Tvheadend\Models\Service>	$services
	 * @return	boolean
	 */
	public function map($services = null) {
		if ($services == null) return false;

		// set uuids for request
		$uuids = array();
		foreach ($services as $service) {
			if ($service instanceof Models\Service) {
				array_push($uuids, $service->uuid);
			}
		}

		// no valid services
		if (empty($uuids)) return false;

		$response = $this->_client->doGet('/api/service/mapper/start', array(
			'encrypted' => 'on',
			'uuids' => json_encode($uuids)
		));

		$status = $response->getStatus();
		// failed
		if ($status != 200) return false;
		// check result
		return $this->getResult('change');;
	}
}
