<?php
namespace Services;
use Exception\UnknownException;

class AppAPI extends AbstractJsonAPI {
	/**
	 * enigma2 request
	 */
	protected function enigma2() {
		$request = new \Enigma2\Request($this->getRequest(), $this->getRequestData());
		$this->data = $request->process();
	}

	/**
	 * tvheadend request
	 */
	protected function tvheadend() {
		$request = new \Tvheadend\Request($this->getRequest(), $this->getRequestData());
		$this->data = $request->process();
	}
}
