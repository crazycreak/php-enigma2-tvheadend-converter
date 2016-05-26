<?php
namespace Services;

abstract class AbstractRequest {
	/**
	 * Server Instance
	 */
	protected $_serverInstance = null;

	/**
	 * Request
	 */
	protected $request = '';

	/**
	 * Request Data
	 */
	protected $requestData = '';

	/**
	 * constructor
	 */
	public function __construct($request, $requestData) {
		$this->request = $request;
		$this->requestData = $requestData;
	}

	/**
	 * @return Http\Client
	 */
	protected function getServer() {
		return $this->_serverInstance;
	}
}
