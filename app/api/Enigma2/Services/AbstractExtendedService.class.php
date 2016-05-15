<?php
namespace Enigma2\Services;
use Services\AbstractService;

abstract class AbstractExtendedService extends AbstractService {
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
