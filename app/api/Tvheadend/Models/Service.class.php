<?php
namespace Tvheadend\Models;
use Models\Base;

class Service extends Base {
	/**
	 * @var array
	 */
	protected $_validProperties = array(
		'uuid',
		'network',
		'multiplex',
		'multiplex_uuid',
		'sid',
		'lcn',
		'lcn_minor',
		'lcn2',
		'svcname',
		'provider',
		'dvb_servicetype',
		'dvb_ignore_eit',
		'prefcapid',
		'prefcapid_lock',
		'force_caid',
		'created',
		'last_seen',
		'enabled',
		'auto',
		'channel',
		'priority',
		'encrypted',
		'caid'
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