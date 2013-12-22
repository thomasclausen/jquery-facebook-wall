(function($) {
	$(document).ready(function(){
		$('html').removeClass('no-js');

		$('.facebook-wall').facebook_wall({
			id: '140239969347795',
			access_token: '108285195955733|nBxyzkey6X69Aors5psTwDTOPPY',
			limit: 10
		});
	});
})(jQuery);