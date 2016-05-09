<?php
namespace Http;

class Request {
	/**
	 * @var string
	 */
	private $_path;
	
	/**
	 * @var string
	 */
	private $_method;

	/**
	 * @var array
	 */
	private $_parameters;

	/**
	 * constructor
	 */
	public function __construct($path, $method, $parameters = array()) {
		$this->_path = $path;
		$this->_method = $method;
		$this->_parameters = $parameters;
	}

	/**
	 * @return string
	 */
	public function getPath() {
		return $this->_path;
	}

	/**
	 * @return string
	 */
	public function getMethod() {
		return $this->_method;
	}

	/**
	 * @return array
	 */
	public function getParameters() {
		return $this->_parameters;
	}
}