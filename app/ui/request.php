<?php
$default_entry = 'enigma2';
$entrys = array(
	'enigma2' => 'Enigma2',
	'tvheadend' => 'TVHeadend'
);
// request entry exists
if (empty($_REQUEST['entry'])) {
	header('Location: /ui/' . $default_entry);
	exit;
}
// request entry valid
$active_entry = $_REQUEST['entry'];
if (!array_key_exists($active_entry, $entrys)) {
	echo 'url not allowed!';
	exit;
}
?>