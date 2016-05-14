<?php
namespace Services;

abstract class AbstractJsonAPI extends AbstractAPI {
	/**
	 * @see Services\AbstractAPI
	 */
	public function process() {
		$result = parent::process();
		$this->responseJson($result);
	}

	protected function responseJson($result) {
		// set http status
		header("HTTP/1.1 " . $result['code'] . " " . $result['message']);
		// set allow for CORS
		header("Access-Control-Allow-Orgin: *");
		header("Access-Control-Allow-Methods: *");
		// set content type
		header("Content-Type: application/json");
		// output
		echo json_encode($result);
		exit;
	}
}
