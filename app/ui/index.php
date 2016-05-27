<?php
$entry = 'enigma2';
if (!empty($_REQUEST['entry'])) $entry = $_REQUEST['entry'];

$navigation = array(
	'enigma2' => 'Enigma2',
	'tvheadend' => 'TVHeadend'
);

?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>enigma2-tvheadend-converter</title>
	<!-- Stylesheet's -->
	<link rel="stylesheet" href="css/bootstrap.min.css" />
	<link rel="stylesheet" href="css/bootstrap-theme.min.css" />
	<link rel="stylesheet" href="css/app.css" />
	<!-- Javascript's -->
	<script src="js/react.min.js"></script>
	<script src="js/react-dom.min.js"></script>
	<script src="js/babel.min.js"></script>
	<script src="js/jquery.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
</head>
<body>
	<nav class="navbar navbar-default navbar-fixed-top">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">E2-TVH-Converter</a>
			</div>
			<div id="navbar" class="navbar-collapse collapse">
				<ul class="nav navbar-nav">
					<? foreach ($navigation as $href => $name): ?>
						<? $class = ($href == $entry) ? ' class="active"' : ''; ?>
						<li<?= $class ?>><a href="<?= $href ?>"><?= $name ?></a></li>
					<? endforeach; ?>
				</ul>
			</div>
		</div>
	</nav>
	<!-- App -->
	<div id="appContainer" class="container"></div>
	<script type="text/babel" src="js/app.js"></script>
</body>
</html>