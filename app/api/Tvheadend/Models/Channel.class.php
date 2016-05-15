<?php
namespace Tvheadend\Models;
use Models\AbstractModel;

class Channel extends AbstractModel {
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