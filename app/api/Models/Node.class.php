<?php
namespace Models;

abstract class Node implements \JsonSerializable {
	/**
	 * @var object
	 */
	protected $_raw;

	/**
	 * @var array
	 */
	protected $_properties;

	/**
	 * @var array
	 */
	protected $_validProperties = array();

	/**
	 * constructor
	 */
	public function __construct($raw = null) {
		$this->_raw = $raw;
	}

	/**
	 * Magic setter
	 * @param	string		$name
	 * @param	mixed		$value
	 */
	public function __set($name, $value) {
		$this->_properties[$name] = $value;
	}

	/**
	 * Magic getter
	 * @param	string		$name
	 * @return	mixed
	 */
	public function __get($name) {
		if (isset($this->_properties[$name])) {
			return $this->_properties[$name];
		} else {
			return null;
		}
	}

	/**
	 * json serialize
	 */
	public function jsonSerialize() {
		return $this->_properties;
	}

	/**
	 * @param	string		$name
	 * @return	bool
	 */
	public function hasProperty($name) {
		return array_key_exists($name, $this->_properties);
	}

	protected function parseRaw() {
		foreach ($this->_validProperties as $property) {
			if (isset($this->_raw->$property)) $this->$property = $this->_raw->$property;
		}
	}
}
