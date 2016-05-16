<?php
namespace Services;
use Exception\UnknownException;

class AppAPI extends AbstractJsonAPI {
	/**
	 * enigma2 request
	 */
	protected function enigma2() {
		$request = new Enigma2Request($this->getRequest(), $this->getRequestData());
		$this->resultData = $request->process();
	}

	/**
	 * tvheadend request
	 */
	protected function tvheadend() {
		// TODO ...
	}
}
