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
