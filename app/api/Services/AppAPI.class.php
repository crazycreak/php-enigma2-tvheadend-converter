<?php
namespace Services;
use Exception\UnknownException;
use Enigma2\Server as Enigma2Server;
use Enigma2\Modules\Service as Enigma2ServiceModule;
use Tvheadend\Server as TvheadendServer;

class AppAPI extends AbstractJsonAPI {
	/**
	 * Enigma2 Server Instance
	 */
	protected $enigma2Server = null;

	/**
	 * Enigma2 Modules
	 */
	protected $enigma2Modules = array(
		'service'
	);

	/**
	 * Enigma2 Parameters
	 */
	protected $enigma2Parameters = array(
		'bouquets' => array(
			'tv' => Enigma2ServiceModule::SERVICES_TV,
			'radio' => Enigma2ServiceModule::SERVICES_RADIO
		)
	);

	/**
	 * request construction: /<endpoint>/<module>/<method>/<parameter>
	 */
	protected function enigma2() {
		// init server instance
		$this->enigma2Server = new Enigma2Server(ENIGMA2_HOST);
		// [0] module - required
		if (!isset($this->request[0]) || empty($this->request[0])) {
			throw new UnknownException();
		}
		$moduleKey = $this->request[0];
		if (!in_array($moduleKey, $this->enigma2Modules)) {
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
			$parameterKey = $this->request[2];
			// check is valid
			if (isset($this->enigma2Parameters[$methodKey]) && isset($this->enigma2Parameters[$methodKey][$parameterKey])) {
				$parameter = $this->enigma2Parameters[$methodKey][$parameterKey];
			}
		}
		// call server
		$result = false;
		if (empty($parameter)) {
			$result = $this->enigma2Server->{$module}()->{$method}();
		} else {
			$result = $this->enigma2Server->{$module}()->{$method}($parameter);
		}
		if (!$result) {
			throw new UnknownException();
		}
		// set result data
		$this->resultData = $result;
	}
}
