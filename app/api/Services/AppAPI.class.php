<?php
namespace Services;
use Exception\UnknownException;
use Enigma2\Server as Enigma2Server;
use Enigma2\Services\Service as Enigma2ServiceService;
use Tvheadend\Server as TvheadendServer;

class AppAPI extends AbstractJsonAPI {
	/**
	 * Enigma2 Server Instance
	 */
	protected $enigma2Server = null;

	/**
	 * Enigma2 Services
	 */
	protected $enigma2Services = array(
		'service'
	);

	/**
	 * Enigma2 Parameters
	 */
	protected $enigma2Parameters = array(
		'bouquets' => array(
			'tv' => Enigma2ServiceService::SERVICES_TV,
			'radio' => Enigma2ServiceService::SERVICES_RADIO
		)
	);

	/**
	 * request construction: /<endpoint>/<service>/<method>/<parameter>
	 */
	protected function enigma2() {
		// init server instance
		$this->enigma2Server = new Enigma2Server(ENIGMA2_HOST);
		// [0] service - required
		if (!isset($this->request[0]) || empty($this->request[0])) {
			throw new UnknownException();
		}
		$serviceKey = $this->request[0];
		$service = 'get' . ucfirst($serviceKey) . 'Service';
		if (!in_array($serviceKey, $this->enigma2Services)) {
			throw new UnknownException();
		}
		// [1] method - required
		if (!isset($this->request[1]) || empty($this->request[1])) {
			throw new UnknownException();
		}
		$methodKey = $this->request[1];
		$method = 'get' . ucfirst($methodKey);
		// [2] parameter - optional
		$parameter = '';
		if (isset($this->request[2]) && !empty($this->request[2])) {
			$parameterKey = $this->request[2];
			// check is valid
			if (isset($this->enigma2Parameters[$methodKey]) && isset($this->enigma2Parameters[$methodKey][$parameterKey])) {
				$parameter = $this->enigma2Parameters[$methodKey][$parameterKey];
			}
		}
		// call server
		$result = false;
		if (empty($parameter)) {
			$result = $this->enigma2Server->{$service}()->{$method}();
		} else {
			$result = $this->enigma2Server->{$service}()->{$method}($parameter);
		}
		if (!$result) {
			throw new UnknownException();
		}
		// set result data
		$this->resultData = $result;
	}
}
