<?php
namespace Services;
use Exception\UnknownException;
use Enigma2\Server as Enigma2Server;
use Tvheadend\Server as TvheadendServer;

class AppAPI extends AbstractJsonAPI {
	/**
	 * Enigma2 Server Instance
	 */
	protected $enigma2Server = null;

	/**
	 * Enigma2 Methods
	 */
	protected $enigma2Methods = array(
		'bouquets' => 'getBouquetsServices'
	);

	/**
	 * Enigma2 Parameters
	 */
	protected $enigma2Parameters = array(
		'bouquets' => array(
			'tv' => Enigma2Server::SERVICES_TV,
			'radio' => Enigma2Server::SERVICES_RADIO
		)
	);

	/**
	 * request construction: /<endpoint>/<method>/<parameter>
	 */
	protected function enigma2() {
		$this->enigma2Server = new Enigma2Server(ENIGMA2_HOST);
		// method key for mapping
		if (!isset($this->request[0]) || empty($this->request[0])) {
			throw new UnknownException();
		}
		$methodKey = $this->request[0];
		// method - required
		if (!isset($this->enigma2Methods[$methodKey])) {
			throw new UnknownException();
		}
		$method = $this->enigma2Methods[$methodKey];
		// parameter - optional
		$parameter = '';
		if (isset($this->request[1]) && !empty($this->request[1])) {
			$parameterKey = $this->request[1];
			// check is valid
			if (isset($this->enigma2Parameters[$methodKey]) && isset($this->enigma2Parameters[$methodKey][$parameterKey])) {
				$parameter = $this->enigma2Parameters[$methodKey][$parameterKey];
			}
		}
		// call server
		$result = false;
		if (empty($parameter)) {
			$result = $this->enigma2Server->{$method}();
		} else {
			$result = $this->enigma2Server->{$method}($parameter);
		}
		if (!$result) {
			throw new UnknownException();
		}
		// set result data
		$this->resultData = $result;
	}
}
