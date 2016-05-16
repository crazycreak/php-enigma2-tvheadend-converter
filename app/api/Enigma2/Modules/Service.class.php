<?php
namespace Enigma2\Modules;
use Enigma2\Models;

class Service extends AbstractExtendedModule {
	const SERVICES_TV = 'TV';
	const SERVICES_RADIO = 'RADIO';

	/**
	 * @var string
	 */
	protected $filterXMLTag = 'e2service';

	/**
	 * @var string
	 */
	protected $filterTypeTV = '1:7:1:0:0:0:0:0:0:0:(type == 1) || (type == 17) || (type == 195) || (type == 25)';

	/**
	 * @var string
	 */
	protected $filterTypeRadio = '1:7:2:0:0:0:0:0:0:0:(type == 2)';

	/**
	 * returns the list of services by reference
	 * @param	string			$sref
	 * @return	array<\Enigma2\Models\Service>
	 */
	public function get($sref = '') {
		$services = array();
		$parameters = array();
		if (!empty($sref)) {
			$parameters['sRef'] = $sref;
		}

		$response = $this->_client->doPost('/web/getservices', $parameters);

		$content = $this->getResult($response->getContent(), $this->filterXMLTag);
		foreach ($content as $entry) {
			$services[] = new Models\Service($entry);
		}
		return $services;
	}

	/**
	 * returns the list of all services
	 * @param	const			$type
	 * @return	array<\Enigma2\Models\Service>
	 */
	public function getAll($type) {
		$orderBy = 'name';
		switch ($type) {
			case self::SERVICES_TV:
				return $this->get($this->filterTypeTV . ' ORDER BY ' . $orderBy);
			break;
			case self::SERVICES_RADIO:
				return $this->get($this->filterTypeRadio . ' ORDER BY ' . $orderBy);
			break;
		}
		return false;
	}

	/**
	 * returns the list of providers
	 * @param	const			$type
	 * @return	array<\Enigma2\Models\Service>
	 */
	public function getProvider($type) {
		$from = 'PROVIDERS';
		$orderBy = 'name';
		switch ($type) {
			case self::SERVICES_TV:
				return $this->get($this->filterTypeTV . ' FROM ' . $from . ' ORDER BY ' . $orderBy);
			break;
			case self::SERVICES_RADIO:
				return $this->get($this->filterTypeRadio . ' FROM ' . $from . ' ORDER BY ' . $orderBy);
			break;
		}
		return false;
	}

	/**
	 * returns the list of bouquets
	 * @param	const			$type
	 * @return	array<\Enigma2\Models\Service>
	 */
	public function getBouquets($type) {
		$orderBy = 'bouquet';
		switch ($type) {
			case self::SERVICES_TV:
				$from = 'BOUQUET "bouquets.tv"';
				return $this->get($this->filterTypeTV . ' FROM ' . $from . ' ORDER BY ' . $orderBy);
			break;
			case self::SERVICES_RADIO:
				$from = 'BOUQUET "bouquets.radio"';
				return $this->get($this->filterTypeRadio . ' FROM ' . $from . ' ORDER BY ' . $orderBy);
			break;
		}
		return false;
	}
}
