<?php
namespace Tvheadend\Services;

class Node extends AbstractExtendedService {
	/**
	 * returns data about a node by the given uuid
	 * @param	string		$uuid
	 * @return	\stdClass
	 */
	public function get($uuid = '') {
		if (empty($uuid)) return false;

		$response = $this->getClient()->doGet('/api/idnode/load', array(
			'uuid' => $uuid
		));

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
	public function save($uuid = '', $parameters = array()) {
		if (empty($uuid) || empty($parameters)) return false;

		$response = $this->getClient()->doGet('/api/idnode/save', array(
			'node' => json_encode(array_merge($parameters, array(
				'uuid' => $uuid
			)))
		));

		$status = $response->getStatus();
		// failed
		if ($status != 200) return false;
		// success
		return true;
	}

	/**
	 * delete a node by the given uuid
	 * @param	string		$uuid
	 * @return	boolean
	 */
	public function delete($uuid = '') {
		if (empty($uuid)) return false;

		$response = $this->getClient()->doGet('/api/idnode/delete', array(
			'uuid' => $uuid
		));

		$status = $response->getStatus();
		// failed
		if ($status != 200) return false;
		// success
		return true;
	}
}
