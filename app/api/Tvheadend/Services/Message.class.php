<?php
namespace Tvheadend\Services;
use Services\AbstractService;

class Message extends AbstractService {
	/**
	 * @var string
	 */
	private $_boxid = null;

	/**
	 * @var integer
	 */
	private $_boxidAge = 0;

	/**
	 * @var integer
	 */
	private $_boxidMaxAge = 5;

	/**
	 * update boxid
	 */
	public function update() {
		$this->getBoxid();
		return true;
	}

	/**
	 * @return array
	 */
	public function get() {
		$response = $this->getClient()->doGet('/comet/poll', array(
			'boxid' => $this->getBoxid()
		));

		$content = json_decode($response->getContent());
		$this->setBoxid($content->boxid);
		return $content->messages;
	}

	/**
	 * @return string
	 */
	private function getBoxid() {
		// check is valid
		if ($this->isBoxidValid()) return $this->_boxid;

		$response = $this->getClient()->doGet('/comet/poll');

		$content = json_decode($response->getContent());
		$this->setBoxid($content->boxid);
		return $this->_boxid;
	}

	/**
	 * @return boolean
	 */
	private function isBoxidValid() {
		// check inital values
		if ($this->_boxid == null || $this->_boxidAge == 0) return false;
		// check max age
		$age = time() - $this->_boxidAge;
		if ($age > $this->_boxidMaxAge) return false;
		// is valid
		return true;
	}

	/**
	 * set boxid and update age
	 */
	private function setBoxid($boxid) {
		$this->_boxidAge = time();
		$this->_boxid = $boxid;
	}
}
