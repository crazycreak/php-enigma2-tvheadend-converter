<?php
namespace Tvheadend\Models;
use Models\Node;

class Channel extends Node {
	/**
	 * @var array
	 */
	protected $_validProperties = array(
		'uuid',
		'enabled',
		'name',
		'number',
		'icon',
		'icon_public_url',
		'epgauto',
		'epggrab',
		'dvr_pre_time',
		'dvr_pst_time',
		'services',
		'tags',
		'bouquet'
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