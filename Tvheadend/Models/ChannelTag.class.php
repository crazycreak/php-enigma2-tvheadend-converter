<?php
namespace Tvheadend\Models;
use Models\Node;

class ChannelTag extends Node {
	/**
	 * @var array
	 */
	protected $_validProperties = array(
		'uuid',
		'enabled',
		'index',
		'name',
		'internal',
		'private',
		'icon',
		'icon_public_url',
		'titled_icon',
		'comment'
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
}
