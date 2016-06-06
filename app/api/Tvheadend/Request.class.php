<?php
namespace Tvheadend;
use Modules\AbstractRequest;

class Request extends AbstractRequest {
        /**
	 * available Modules
	 */
	protected $validModules = array(
		'channel', 'service'
	);

	/**
	 * available Parameters
	 */
	protected $validParameters = array(
		'multiple' => true,
		'channel' => true
	);

	/**
	 * see Modules\AbstractRequest
	 */
	protected function init() {
		parent::init();
		$this->server = new Server(TVHEADEND_HOST);
	}
}
