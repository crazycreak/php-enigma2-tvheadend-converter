<?php
require_once('global.php');
require_once('config.inc.php');

use Enigma2\Enigma2Server;
use Tvheadend\TvheadendServer;

// new Enigma2Server instance
$e2server = new Enigma2Server(ENIGMA2_HOST);
// new TvheadendServer instance
$tvhserver = new TvheadendServer(TVHEADEND_HOST);

// enigma2 services
// - getAllServices || getProviderServices || getBouquetsServices
// - Enigma2Server::SERVICES_TV || Enigma2Server::SERVICES_RADIO
$services = $e2server->getBouquetsServices(Enigma2Server::SERVICES_TV);
if (!$services) {
	exit;
}
$count = count($services);

echo "{$count} Enigma2 Services found." . PHP_EOL . PHP_EOL;

/* debug
foreach ($services as $service) {
	echo $service->e2servicename . ': ' . $service->e2servicereference . PHP_EOL;
	$channels = $e2server->getServicesByReference($service->e2servicereference);
	if (!$channels) {
		exit;
	}

	$count = count($channels);

	echo "{$count} Enigma2 Channels found." . PHP_EOL . PHP_EOL;
	foreach ($channels as $channel) {
		echo ' - ' . $channel->e2servicename . ': ' . $channel->e2servicereference . PHP_EOL;
	}
	echo PHP_EOL;
}
*/
echo PHP_EOL;

// tvh services
$services = $tvhserver->getServices();
if (!$services) {
	exit;
}
$count = count($services);

echo "{$count} TVH Services found." . PHP_EOL . PHP_EOL;
/* debug 
foreach ($services as $service) {
	echo $service->svcname . PHP_EOL;
}
*/
echo PHP_EOL;

// tvh channels
$channels = $tvhserver->getChannels();
if (!$channels) {
	exit;
}
$count = count($channels);

echo "{$count} TVH Channels found." . PHP_EOL . PHP_EOL;

/* debug
usort($channels, "sortByID");
foreach ($channels as $channel) {
	echo $channel->number . ': ' . $channel->name . PHP_EOL;
}
*/
echo PHP_EOL;

function sortByID($a, $b) { return ($a->number > $b->number); }

?>