<?php
namespace Enigma2;
use Enigma2\Modules\Service as ServiceModule;
use Enigma2\Server;
use Exception\UnknownException;
use Modules\AbstractRequest;

class Request extends AbstractRequest {
	/**
	 * available Modules
	 */
	protected $validModules = array(
		'service'
	);

	/**
	 * available Parameters
	 */
	protected $validParameters = array(
		'bouquets' => array(
			'tv' => ServiceModule::SERVICES_TV,
			'radio' => ServiceModule::SERVICES_RADIO
		),
		'provider' => array(
			'tv' => ServiceModule::SERVICES_TV,
			'radio' => ServiceModule::SERVICES_RADIO
		),
		'channels' => true
	);

	/**
	 * see Modules\AbstractRequest
	 */
	protected function init() {
		parent::init();
		$this->server = new Server(ENIGMA2_HOST);
	}
}
