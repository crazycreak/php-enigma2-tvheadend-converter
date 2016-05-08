<?php
namespace Enigma2\Models;
use Models\Node;

class Service extends Node {
	/**
	 * @var array
	 */
	protected $_validProperties = array(
		'e2servicereference',
		'e2servicename'
	);

	/**
	 * constructor
	 */
	public function __construct($raw = null) {
		parent::__construct($raw);

		if ($this->_raw !== null) {
			$this->parseRaw();
		}
	}

	/**
	 * check if service is marker
	 * @return	boolean
	 */
	public function isMarker() {
		$delimiter = ':';
		$segments = preg_split('/' . $delimiter . '/', $this->e2servicereference);

		if (!empty($segments) && isset($segments[1]) && $segments[1] == '64') {
			return true;
		}
		return false;
	}
}