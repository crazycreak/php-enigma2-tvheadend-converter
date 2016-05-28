<?php
// handle request
include('request.php');
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>enigma2-tvheadend-converter</title>
	<!-- Stylesheet's -->
	<link rel="stylesheet" href="/ui/css/bootstrap.min.css" />
	<link rel="stylesheet" href="/ui/css/bootstrap-theme.min.css" />
	<link rel="stylesheet" href="/ui/css/app.css" />
	<!-- Javascript's -->
	<script>var app = "<?= $active_entry ?>";</script>
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
					<? foreach ($entrys as $entry => $name): ?>
						<? $class = ($entry == $active_entry) ? ' class="active"' : ''; ?>
						<li<?= $class ?>><a href="<?= $entry ?>"><?= $name ?></a></li>
					<? endforeach; ?>
				</ul>
			</div>
		</div>
	</nav>
	<!-- App -->
	<div id="appContainer" class="container"></div>
	<script src="/ui/js/build/app.js"></script>
</body>
</html>