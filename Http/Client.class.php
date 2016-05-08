<?php
namespace Http;
use Exception\RequestFailedException;

class Client {
	const METHOD_GET = 'GET';
	const METHOD_POST = 'POST';

	/**
	 * @var string
	 */
	private $_protocol = 'http';

	/**
	 * @var string
	 */
	private $_hostname;

	/**
	 * @var int
	 */
	private $_port;

	/**
	 * @var string
	 */
	private $_username;

	/**
	 * @var string
	 */
	private $_password;

	/**
	 * @var array
	 */
	private $_headers = array();

	/**
	 * constructor
	 * @param	string			$hostname
	 * @param	int			$port
	 */
	public function __construct($hostname, $port) {
		$this->_hostname = $hostname;
		$this->_port = $port;
	}

	/**
	 * set auth informations
	 * @param	string			$username
	 * @param	string			$password
	 */
	public function setCredentials($username, $password) {
		$this->_username = $username;
		$this->_password = $password;
	}

	/**
	 * set curl header
	 * @param	string			$username
	 * @param	string			$password
	 */
	public function setHeaders($headers) {
		$this->_headers = $headers;
	}

	/**
	 * simple get request
	 * @param	string			$path
	 * @param	array			$parameters
	 * @return	\Http\Response
	 */
	public function doGet($path, $parameters = array()) {
		return $this->execute(self::METHOD_GET, $path, $parameters);
	}

	/**
	 * simple post request
	 * @param	string			$path
	 * @param	array			$parameters
	 * @return	\Http\Response
	 */
	public function doPost($path, $parameters = array()) {
		return $this->execute(self::METHOD_POST, $path, $parameters);
	}

	/**
	 * handle request by method
	 * @param	const			$method
	 * @param	string			$path
	 * @param	array			$parameters
	 * @return	\Http\Response
	 */
	protected function execute($method, $path, $parameters) {
		if (!function_exists('curl_exec')) {
			throw new \Exception("curl doesn't exists");
		}
		// create request
		$request = $this->createRequest($method, $path, $parameters);

		$curl = curl_init();
		if ($this->_username !== null && $this->_password !== null) {
			curl_setopt($curl, CURLOPT_USERPWD, $this->_username . ':' . $this->_password);
		}
		if (!empty($this->_headers)) {
			curl_setopt($curl, CURLOPT_HTTPHEADER, $this->_headers);
		}
		switch ($request->getMethod()) {
			case self::METHOD_GET:
				$url = $request->getPath();
				if (!empty($parameters)) {
					$url .= '?' . http_build_query($request->getParameters());
				}
				curl_setopt($curl, CURLOPT_URL, $url);
			break;
			case self::METHOD_POST:
				curl_setopt($curl, CURLOPT_URL, $request->getPath());
				curl_setopt($curl, CURLOPT_POST, true);
				if (!empty($request->getParameters())) {
					curl_setopt($curl, CURLOPT_POSTFIELDS, $request->getParameters());
				}
			break;
		}

		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		$output = curl_exec($curl);
		$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		curl_close($curl);

		if ($status == 0 || $status >= 400 ) {
			throw new RequestFailedException();
		}

		$response = new Response($status, $output);
		return $response;
	}

	/**
	 * creates a basic HTTP request
	 * @param	const			$method
	 * @param	string			$path
	 * @param	array			$parameters
	 * @return	\Http\Request
	 */
	protected function createRequest($method, $path, $parameters) {
		$baseUrl = $this->getBaseUrl();
		$request = new Request($baseUrl.$path, $method, $parameters);

		return $request;
	}

	/**
	 * returns the base url, like 'http://host:port'
	 * @return	string
	 */
	protected function getBaseUrl() {
		return $this->_protocol . '://' . $this->_hostname . ':' . $this->_port;
	}
}
