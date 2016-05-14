<?php
namespace Services;

class AppAPI extends AbstractAPI {
	/**
	 * constructor
	 */
	public function __construct() {
                parent::__construct();
        }

	public function process() {
		$this->response();
	}
}
