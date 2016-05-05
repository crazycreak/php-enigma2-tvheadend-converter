<?php
spl_autoload_register(function ($className) {
	$dir = __DIR__;
	// separator
	$ds = DIRECTORY_SEPARATOR;
	$ns = '\\';
	// replace namespace separator with directory separator
	$className = str_replace($ns, $ds, $className);
	// full path
	$file = "{$dir}{$ds}{$className}.class.php";
	// check exists
	if (!file_exists($file)) return false;
	// include
	require_once($file);
	return true;
});
?>