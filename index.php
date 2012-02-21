<!DOCTYPE html>
<!--[if lt IE 7]><html class="no-js ie6"><![endif]-->
<!--[if IE 7]><html class="no-js ie7"><![endif]-->
<!--[if IE 8]><html class="no-js ie8"><![endif]-->
<!--[if IE 9]><html class="no-js ie9"><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html class="no-js"><!--<![endif]-->

<head>
<title>Facebook - jQuery/JSON stuff</title>
<meta charset="UTF-8" />
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, maximum-scale=1"/>
<link rel="stylesheet" type="text/css" href="styles.css" />
<!--[if lt IE 9]><script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
<script src="facebook_wall.plugin.js" type="text/javascript"></script>
<script type="text/javascript">
(function($) {
	$(document).ready(function(){
		$('#facebook_wall').facebook_wall({
			id: 'your_id',
			access_token: 'your_access_token',
			limit: 10
		});
	});
})(jQuery);
</script>
</head>

<body>
<ul id="facebook_wall"></ul>
</body>

</html>