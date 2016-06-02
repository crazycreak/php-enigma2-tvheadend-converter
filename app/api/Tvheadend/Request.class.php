<?php
namespace Tvheadend;
use Modules\AbstractRequest;

class Request extends AbstractRequest {
        /**
	 * available Modules
	 */
	protected $validModules = array(
		'channel'
	);

        /**
	 * constructor
	 */
	public function __construct($request, $requestData) {
		parent::__construct($request, $requestData);

		$this->server = new Server(TVHEADEND_HOST);
	}
}
