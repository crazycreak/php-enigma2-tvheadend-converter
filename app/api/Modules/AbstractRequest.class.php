<?php
namespace Modules;

abstract class AbstractRequest {
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
	protected $requestData = '';

	/**
	 * available Modules
	 */
	protected $validModules = array();

	/**
	 * available Parameters
	 */
	protected $validParameters = array();

	/**
	 * module
	 */
	protected $moduleKey = '';

	/**
	 * method
	 */
	protected $methodKey = '';

	/**
	 * method
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
	}

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
		if ($this->getParameter() === false) {
			$this->result = $this->getServer()->{$this->getModule()}()->{$this->getMethod()}();
		} else {
			$this->result = $this->getServer()->{$this->getModule()}()->{$this->getMethod()}($this->getParameter());
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
				// value as parameter
				$this->parameter = $value;
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
	protected function getMethod() {
		if (empty($this->methodKey)) return false;
		return 'get' . ucfirst($this->methodKey);
	}

	/**
	 * @return parameter
	 */
	protected function getParameter() {
		if (empty($this->parameter)) return false;
		return $this->parameter;
	}

	/**
	 * @return Server Instance
	 */
	protected function getServer() {
		if ($this->server === null) return false;
		return $this->server;
	}
}
