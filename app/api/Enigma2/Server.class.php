<?php
namespace Enigma2;
use Enigma2\Models\Service;
use Http\Client;

class Server {
	const SERVICES_TV = 'TV';
	const SERVICES_RADIO = 'RADIO';

	/**
	 * @var Http\Client
	 */
	private $_client;

	/**
	 * @var string
	 */
	protected $filterTypeTV = '1:7:1:0:0:0:0:0:0:0:(type == 1) || (type == 17) || (type == 195) || (type == 25)';

	/**
	 * @var string
	 */
	protected $filterTypeRadio = '1:7:2:0:0:0:0:0:0:0:(type == 2)';

	/**
	 * constructor
	 */
	public function __construct($hostname, $port = 80, $username = null, $password = null) {
		$this->_client = new Client($hostname, $port);

		// set credentials
		if ($username !== null && $password !== null) $this->setCredentials($username, $password);

		$this->attemptConnection();
	}

	/**
	 * returns the list of all services
	 * @param	const			$type
	 * @return	array<\Enigma2\Models\Service>
	 */
	public function getAllServices($type) {
		switch ($type) {
			case self::SERVICES_TV:
				return $this->getServicesByReference($this->filterTypeTV . ' ORDER BY name');
			break;
			case self::SERVICES_RADIO:
				return $this->getServicesByReference($this->filterTypeRadio . ' ORDER BY name');
			break;
		}
		return false;
	}

	/**
	 * returns the list of providers
	 * @param	const			$type
	 * @return	array<\Enigma2\Models\Service>
	 */
	public function getProviderServices($type) {
		switch ($type) {
			case self::SERVICES_TV:
				return $this->getServicesByReference($this->filterTypeTV . ' FROM PROVIDERS ORDER BY name');
			break;
			case self::SERVICES_RADIO:
				return $this->getServicesByReference($this->filterTypeRadio . ' FROM PROVIDERS ORDER BY name');
			break;
		}
		return false;
	}

	/**
	 * returns the list of bouquets
	 * @param	const			$type
	 * @return	array<\Enigma2\Models\Service>
	 */
	public function getBouquetsServices($type) {
		switch ($type) {
			case self::SERVICES_TV:
				return $this->getServicesByReference($this->filterTypeTV . ' FROM BOUQUET "bouquets.tv" ORDER BY bouquet');
			break;
			case self::SERVICES_RADIO:
				return $this->getServicesByReference($this->filterTypeRadio . ' FROM BOUQUET "bouquets.radio" ORDER BY bouquet');
			break;
		}
		return false;
	}

	/**
	 * returns the list of services by reference
	 * @param	string			$sref
	 * @return	array<\Enigma2\Models\Service>
	 */
	public function getServicesByReference($sref = '') {
		$services = array();
		$parameters = array();
		if (!empty($sref)) {
			$parameters['sRef'] = $sref;
		}

		$response = $this->_client->doPost('/web/getservices', $parameters);

		$content = $this->xml2json($response->getContent(), 'e2service');
		foreach ($content as $entry) {
			$services[] = new Service($entry);
		}
		return $services;
	}

	/**
	 * set auth informations for the client
	 * @param	string			$username
	 * @param	string			$password
	 */
	protected function setCredentials($username, $password) {
		$this->_client->setCredentials($username, $password);
	}

	/**
	 * try connection
	 */
	protected function attemptConnection() {
		$this->_client->doGet('/');
	}

	/**
	 * converts an xml string to json
	 * @param	string			$xmlString
	 * @param	string			$search
	 */
	protected function xml2json($xmlString, $search) {
		$xml = new \SimpleXMLElement($xmlString);
		$items = $xml->xpath($search);
		$jsonString = json_encode($items);
		$json = json_decode($jsonString);
		return $json;
	}
}