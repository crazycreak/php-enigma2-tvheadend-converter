<?php
require_once('global.php');
require_once('config.inc.php');

use Services\AppAPI;

$app = new AppAPI();
$app->process();

?>
