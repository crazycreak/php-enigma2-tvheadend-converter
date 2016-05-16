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
			$this->response(500);
		}
	}

	/**
	 * @see Services\AbstractAPI
	 */
	public function process() {
		try {
			parent::process();
		} catch (\Exception $e) {
			$this->response(500);
		}
	}

	/**
	 * @see Services\AbstractAPI
	 */
	protected function response($statusCode = 200) {
		$response = parent::response($statusCode);
		$this->responseJson($response);
	}

	/**
	 * output response as json
	 */
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
