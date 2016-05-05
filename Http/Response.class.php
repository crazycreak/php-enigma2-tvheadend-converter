<?php
namespace Http;

class Response {
	/**
	 * @var string
	 */
	private $_status;

	/**
	 * @var string
	 */
	private $_content;

	/**
	 * constructor
	 */
	public function __construct($status, $content) {
		$this->_status = $status;
		$this->_content = $content;
	}

	/**
	 * @return string
	 */
	public function getStatus() {
		return $this->_status;
	}

	/**
	 * @return string
	 */
	public function getContent() {
		return $this->_content;
	}
}