<?php
namespace Tvheadend\Services;
use Services\Base;

class Message extends Base {
	private $_boxid = null;
	private $_boxidAge = 0;
	private $_boxidMaxAge = 5;

	public function update() {
		$this->getBoxid();
		return true;
	}

	public function get() {
		$response = $this->getClient()->doGet('/comet/poll', array(
			'boxid' => $this->getBoxid()
		));

		$content = json_decode($response->getContent());
		$this->setBoxid($content->boxid);
		return $content->messages;
	}

	private function getBoxid() {
		if ($this->isBoxidValid()) return $this->_boxid;

		$response = $this->getClient()->doGet('/comet/poll');

		$content = json_decode($response->getContent());
		$this->setBoxid($content->boxid);

		return $this->_boxid;
	}

	private function isBoxidValid() {
		// check inital values
		if ($this->_boxid == null || $this->_boxidAge == 0) return false;
		// check max age
		$age = time() - $this->_boxidAge;
		if ($age > $this->_boxidMaxAge) return false;
		// is valid
		return true;
	}

	private function setBoxid($boxid) {
		$this->_boxidAge = time();
		$this->_boxid = $boxid;
	}
}
