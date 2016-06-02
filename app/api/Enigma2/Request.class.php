<?php
namespace Enigma2;
use Enigma2\Modules\Service as ServiceModule;
use Enigma2\Server;
use Exception\UnknownException;
use Modules\AbstractRequest;

class Request extends AbstractRequest {
	/**
	 * Enigma2 Modules
	 */
	protected $modules = array(
		'service'
	);

	/**
	 * Enigma2 Parameters
	 */
	protected $parameters = array(
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
	 * constructor
	 */
	public function __construct($request, $requestData) {
		parent::__construct($request, $requestData);

		$this->_serverInstance = new Server(ENIGMA2_HOST);
	}

	/**
	 * request construction: /<module>/<method>/<parameter>
	 */
	public function process() {
		// [0] module - required
		if (!isset($this->request[0]) || empty($this->request[0])) {
			throw new UnknownException();
		}
		$moduleKey = $this->request[0];
		if (!in_array($moduleKey, $this->modules)) {
			throw new UnknownException();
		}
		$module = 'get' . ucfirst($moduleKey) . 'Module';
		// [1] method - required
		if (!isset($this->request[1]) || empty($this->request[1])) {
			throw new UnknownException();
		}
		$methodKey = $this->request[1];
		$method = 'get' . ucfirst($methodKey);
		// [2] parameter - optional
		$parameter = '';
		if (isset($this->request[2]) && !empty($this->request[2])) {
			// check is valid
			if (isset($this->parameters[$methodKey])) {
				// check mapping exists
				$parameterValue = $this->request[2];
				if ($this->parameters[$methodKey] === true) {
					// value as parameter
					$parameter = $parameterValue;
				} else if (isset($this->parameters[$methodKey][$parameterValue])) {
					// mapping per array
					$parameter = $this->parameters[$methodKey][$parameterValue];
				}
			}
		}
		// call server
		$result = false;
		if (empty($parameter)) {
			$result = $this->getServer()->{$module}()->{$method}();
		} else {
			$result = $this->getServer()->{$module}()->{$method}($parameter);
		}
		if (!$result) {
			throw new UnknownException();
		}
		// result data
		return $result;
	}
}
