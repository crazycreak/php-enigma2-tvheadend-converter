<?php
require_once('global.php');
require_once('config.inc.php');

use Enigma2\Server as Enigma2Server;
use Tvheadend\Server as TvheadendServer;

// new Enigma2Server instance
$e2server = new Enigma2Server(ENIGMA2_HOST);
// new TvheadendServer instance
$tvhserver = new TvheadendServer(TVHEADEND_HOST);

// tvh services
$tvhServices = $tvhserver->getServices();
if (!$tvhServices) {
	exit;
}

// enigma2 services
$e2Services = $e2server->getBouquetsServices(Enigma2Server::SERVICES_TV);
if (!$e2Services) {
	exit;
}

// first bouquet
$myBouquet = $e2Services[0];

echo "Bouquet: {$myBouquet->e2servicename}" . PHP_EOL;

$myChannels = $e2server->getServicesByReference($myBouquet->e2servicereference);
if (!$myChannels) {
	exit;
}

$cntAll = 0;
$cntNotFound = 0;
$channelsToMap = array();
foreach ($myChannels as $channel) {
	echo ' - ' . $channel->e2servicename;

	// skipp marker
	if ($channel->isMarker()) {
		echo " (is marker)" . PHP_EOL;
		continue;
	}
	// search for entries by name
	$entries = array_filter(
		$tvhServices,
		function ($service) use ($channel) {
			return $service->svcname == $channel->e2servicename;
		}
	);
	$cntAll++;
	$cnt = count($entries);
	if (!$cnt) {
		echo " (not found)" . PHP_EOL;
		continue;
	}
	// valid channel
	if ($cnt > 1) {
		$cntNotFound++;
		// not unique
		echo "(found {$cnt}, skipp ... not unique)" . PHP_EOL;
		continue;
	}
	// channel to map
	echo " (found {$cnt})" . PHP_EOL;
	// reset order
	sort($entries);

	array_push($channelsToMap, $entries[0]);
}
echo PHP_EOL;

// statistics
$cntMap = count($channelsToMap);
$cntSkipp = $cntAll - $cntMap;
echo "found {$cntAll} Channels in Bouquet, {$cntNotFound} not Found, {$cntSkipp} skipped because not unique" . PHP_EOL;

// mapp all
$status = $tvhserver->mapServices($channelsToMap);
if ($status) {
	echo 'sucess: channels mapped!';
} else {
	echo 'error: something went wrong ...';
}
?>
