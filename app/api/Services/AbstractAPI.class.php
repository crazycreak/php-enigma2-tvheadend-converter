<?php
namespace Services;
use Exception\UnknownException;

abstract class AbstractAPI {
	const METHOD_GET = 'GET';
	const METHOD_POST = 'POST';
	const METHOD_PUT = 'PUT';
	const METHOD_DELETE = 'DELETE';

	/**
	 * HTTP methods - allowed
	 */
	protected $allowedMethods = array(
		'GET', 'POST', 'PUT', 'DELETE'
	);

	/**
	 * HTTP method - called
	 */
	protected $method = '';

	/**
	 * API Key
	 */
	protected $apiKey = '';

	/**
	 * API Key Parameter
	 */
	protected $apiKeyParameter = 'k';

	/**
	 * API Version
	 */
	protected $apiVersion = '';

	/**
	 * API Version Parameter
	 */
	protected $apiVersionParameter = 'v';

	/**
	 * Request
	 */
	protected $request = '';

	/**
	 * Request Parameter
	 */
	protected $requestParameter = 'r';

	/**
	 * Request Data
	 */
	protected $requestData = '';

	/**
	 * Result Data
	 */
	protected $resultData = array();

	/**
	 * constructor
	 */
	public function __construct() {
		// init defaults
		$this->initApi();
		$this->initMethod();
		$this->initRequest();
	}

	protected function initApi() {
		// check api key
		$this->verifyApiKey();
		// check api version
		if (!isset($_REQUEST[$this->apiVersionParameter])) {
			throw new UnknownException();
		}
		// set version
		$this->apiVersion = $_REQUEST[$this->apiVersionParameter];
	}

	protected function verifyApiKey() {
		// ne key to verify
		if (empty($this->apiKey)) {
			return true;
		}
		// no key exists
		if (!isset($_REQUEST[$this->apiKeyParameter])) {
			throw new UnknownException();
		}
		// key not valid
		if ($this->apiKey != $_REQUEST[$this->apiKeyParameter]) {
			throw new UnknownException();
		}
		return true;
	}

	protected function initMethod() {
		 $method = $_SERVER['REQUEST_METHOD'];
		 if ($this->method == self::METHOD_POST && array_key_exists('HTTP_X_HTTP_METHOD', $_SERVER)) {
			 switch ($_SERVER['HTTP_X_HTTP_METHOD']) {
				case self::METHOD_PUT:
					$method = self::METHOD_PUT;
					break;
				case self::METHOD_DELETE:
					$method = self::METHOD_DELETE;
					break;
			 }
		 }
		 // check is allowed method
		 if (!in_array($method, $this->allowedMethods)) {
			 throw new UnknownException();
		 }
		 // set method
		 $this->method = $method;
	}

	protected function initRequest() {
		// check request
		if (!isset($_REQUEST[$this->requestParameter])) {
			throw new UnknownException();
		}
		// set request
		$this->request = explode('/', rtrim($_REQUEST[$this->requestParameter], '/'));
		// set request data
		switch ($this->method) {
			case self::METHOD_DELETE:
			case self::METHOD_POST:
				$this->requestData = $this->cleanInputs($_POST);
				break;
			case self::METHOD_GET:
				$this->requestData = $this->cleanInputs($_GET);
				break;
			default:
				throw new UnknownException();
				break;
		}
		// unset init parameters
		unset($this->requestData[$this->apiKeyParameter]);
		unset($this->requestData[$this->apiVersionParameter]);
		unset($this->requestData[$this->requestParameter]);
	}

	protected function cleanInputs($data) {
		$result = Array();
		if (is_array($data)) {
			foreach ($data as $key => $value) {
				$result[$key] = $this->cleanInputs($value);
			}
		} else {
			$result = trim(strip_tags($data));
		}
		return $result;
	}

	public function process() {
		$this->response();
	}

	protected function response($statusCode = 200) {
		$statusMessage = $this->getStatusMessage($statusCode);
		// http status
		header("HTTP/1.1 " . $statusCode . " " . $statusMessage);
		// build result
		$result = array(
			'code' => $statusCode,
			'message' => $statusMessage,
			'data' => $this->resultData
		);
		// allow for CORS
		header("Access-Control-Allow-Orgin: *");
		header("Access-Control-Allow-Methods: *");
		// content type
		header("Content-Type: application/json");
		// output
		echo json_encode($result);
	}

	protected function getStatusMessage($statusCode) {
		$status = array(
			200 => 'OK',
			404 => 'Not Found',
			405 => 'Method Not Allowed',
			500 => 'Internal Server Error'
		);
		return $status[$statusCode] ? $status[$statusCode] : $status[500];
	}
}
