<?php
namespace Models;

abstract class AbstractModel implements \JsonSerializable {
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
	 * @var array
	 */
	protected static $_defaultProperties = array();

	/**
	 * constructor
	 */
	public function __construct($raw = null) {
		$this->_raw = $raw;

		if ($this->_raw !== null) {
			$this->parseRaw();
		}
	}

	/**
	 * static constructor
	 */
	 public static function create() {
		 $className = get_called_class();
		 return new $className((object) static::$_defaultProperties);
	 }

	/**
	 * json serialize
	 */
	public function jsonSerialize() {
		return $this->_properties;
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
	 * @param	string		$name
	 * @return	bool
	 */
	public function hasProperty($name) {
		return array_key_exists($name, $this->_properties);
	}

	/**
	 * parse valid properties
	 */
	protected function parseRaw() {
		foreach ($this->_validProperties as $property) {
			if (isset($this->_raw->$property)) $this->$property = $this->_raw->$property;
		}
	}
}
