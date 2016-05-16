<?php
namespace Enigma2\Modules;
use Modules\AbstractModule;

abstract class AbstractExtendedModule extends AbstractModule {
	/**
	 * @return string
	 */
	protected function getResult($xmlString, $xmlTag) {
		return $this->xml2json($xmlString, $xmlTag);
	}

	/**
	 * converts an xml string to json
	 * @param	string			$xmlString
	 * @param	string			$search
	 * @return string
	 */
	protected function xml2json($xmlString, $search) {
		$xml = new \SimpleXMLElement($xmlString);
		$items = $xml->xpath($search);
		$jsonString = json_encode($items);
		$json = json_decode($jsonString);
		return $json;
	}
}
