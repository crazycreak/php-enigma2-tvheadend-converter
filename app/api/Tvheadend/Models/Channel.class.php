<?php
namespace Tvheadend\Models;
use Models\Base;

class Channel extends Base {
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
}