<?php
namespace Services;

abstract class Base {
	/**
	 * @var Http\Client
	 */
	protected $_client = null;

	/**
	 * constructor
	 */
	public function __construct($client) {
		$this->_client = $client;
	}

	/**
	 * @return Http\Client
	 */
	protected function getClient() {
		return $this->_client;
	}
}