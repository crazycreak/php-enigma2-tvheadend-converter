<?php
namespace Services;

abstract class AbstractJsonAPI extends AbstractAPI {
	/**
	 * @see Services\AbstractAPI
	 */
	protected function init() {
		try {
			parent::init();
		} catch (\Exception $e) {
			//echo $e->getMessage(); catch me !!
		 }
	}

	/**
	 * @see Services\AbstractAPI
	 */
	public function process() {
		try {
			parent::process();
		} catch (\Exception $e) {
			//echo $e->getMessage(); catch me !!
		}
		$this->responseJson();
	}

	/**
	 * @see Services\AbstractAPI
	 */
	protected function response() {
		$response = parent::response();
		$this->responseJson($response);
	}

	protected function responseJson($response) {
		// set http status
		header("HTTP/1.1 " . $response['code'] . " " . $response['message']);
		// set allow for CORS
		header("Access-Control-Allow-Orgin: *");
		header("Access-Control-Allow-Methods: *");
		// set content type
		header("Content-Type: application/json");
		// output
		echo json_encode($response);
		exit;
	}
}
