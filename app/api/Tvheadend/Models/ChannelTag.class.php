<?php
namespace Tvheadend\Models;
use Models\Base;

class ChannelTag extends Base {
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
	 * @var array
	 */
	protected static $_defaultProperties = array(
		"enabled" => true,
		"index" => 0,
		"internal" => false,
		"private" => false,
		"icon" => "",
		"titled_icon" => false,
		"comment" => ""
	);
}
