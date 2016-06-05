<?php
namespace Modules;

abstract class AbstractRequest {
	const REQUEST_METHOD_KEY = 'method';
	const REQUEST_METHOD_GET = 'GET';
	const REQUEST_METHOD_POST = 'POST';
	const REQUEST_METHOD_PUT = 'PUT';
	const REQUEST_METHOD_DELETE = 'DELETE';
	const REQUEST_PARAMETER_ARRAY = 'array';

	/**
	 * Server Instance
	 */
	protected $server= null;

	/**
	 * Request
	 */
	protected $request = '';

	/**
	 * Request Data
	 */
	protected $requestData = array();

	/**
	 * Request Method
	 */
	protected $requestMethod = '';

	/**
	 * available Modules
	 */
	protected $validModules = array();

	/**
	 * available Parameters
	 */
	protected $validParameters = array();

	/**
	 * module key
	 */
	protected $moduleKey = '';

	/**
	 * method key
	 */
	protected $methodKey = '';

	/**
	 * parameter
	 */
	protected $parameter = '';

	/**
	 * result
	 */
	protected $result = false;

	/**
	 * constructor
	 */
	public function __construct($request, $requestData) {
		$this->request = $request;
		$this->requestData = $requestData;
		$this->requestMethod = $this->requestData[self::REQUEST_METHOD_KEY];
		// remove from request data
		unset($this->requestData[self::REQUEST_METHOD_KEY]);

		$this->setServer();
	}

	/**
	 * initialise server
	 */
	protected abstract function setServer();

	/**
	 * execute request
	 */
	public function process() {
		$this->validate();
		$this->execute();
		return $this->getResult();
	}

	/**
	 * validate request
	 */
	protected function validate() {
		$this->validateModule();
		$this->validateMethod();
		$this->validateParameter();
	}

	/**
	 * execute
	 */
	protected function execute() {
		if (!$this->getServer()) {
			throw new UnknownException();
		}
		if ($this->getModuleParameter() === false) {
			$this->result = $this->getServer()->{$this->getModule()}()->{$this->getModuleMethod()}();
		} else {
			$this->result = $this->getServer()->{$this->getModule()}()->{$this->getModuleMethod()}($this->getModuleParameter());
		}
	}

	/**
	 * is valid module
	 */
	protected function validateModule() {
		// request [0] = module -> required
		if (!isset($this->request[0]) || empty($this->request[0])) {
			throw new UnknownException();
		}
		$_moduleKey = $this->request[0];
		if (!in_array($_moduleKey, $this->validModules)) {
			throw new UnknownException();
		}
		$this->moduleKey = $_moduleKey;
	}

	/**
	 * is valid method
	 */
	protected function validateMethod() {
		// request [1] = method -> required
		if (!isset($this->request[1]) || empty($this->request[1])) {
			throw new UnknownException();
		}
		$this->methodKey = $this->request[1];
	}

	/**
	 * is valid parameter
	 */
	protected function validateParameter() {
		// request [2] = parameter -> optional
		if (!isset($this->request[2]) || empty($this->request[2])) {
			return;
		}
		$_methodKey = $this->methodKey;
		// check is valid
		if (isset($this->validParameters[$_methodKey])) {
			// check mapping exists
			$value = $this->request[2];
			if ($this->validParameters[$_methodKey] === true) {
				if ($value == self::REQUEST_PARAMETER_ARRAY) {
					// request data as parameter
					foreach ($this->requestData as $key => $value) {
						$this->parameter[$key] = $value;
					}
				} else {
					// value as parameter
					$this->parameter = $value;
				}
			} else if (isset($this->validParameters[$_methodKey][$value])) {
				// mapping per array
				$this->parameter = $this->validParameters[$_methodKey][$value];
			}
		}
	}

	/**
	 * @return result
	 */
	protected function getResult() {
		if (!$this->result) {
			throw new UnknownException();
		}
		return $this->result;
	}

	/**
	 * @return module
	 */
	protected function getModule() {
		if (empty($this->moduleKey)) return false;
		return 'get' . ucfirst($this->moduleKey) . 'Module';
	}

	/**
	 * @return method
	 */
	protected function getModuleMethod() {
		if (empty($this->methodKey)) return false;
		$prefix = '';
		switch($this->requestMethod) {
			case self::REQUEST_METHOD_GET:
				$prefix = 'get';
				break;
			case self::REQUEST_METHOD_POST:
				$prefix = 'set';
				break;
			case self::REQUEST_METHOD_DELETE:
				$prefix = 'del';
				break;
			default:
				throw new UnknownException();
		}
		return $prefix . ucfirst($this->methodKey);
	}

	/**
	 * @return parameter
	 */
	protected function getModuleParameter() {
		if (empty($this->parameter)) return false;
		return $this->parameter;
	}

	/**
	 * @return server instance
	 */
	protected function getServer() {
		if ($this->server === null) return false;
		return $this->server;
	}
}
