jQuery.fn.facebook_wall = function(options) {
	if(!options.id || !options.access_token) {
		break;
	}

	options = jQuery.extend({
		id: '',
		access_token: '',
		limit: 15, // You can also pass a custom limit as a parameter.
		avatar_size: 'square', // square | small | normal | large
		show_comments: true // true | false
	}, options);

	var graphURL = 'https://graph.facebook.com/';
	var graphPOSTS = graphURL + options.id + '/feed/?access_token=' + options.access_token + '&limit=' + options.limit + '&locale=da_DK&date_format=U';
	var e = jQuery(this);

	e.addClass('loading');

	jQuery.getJSON(graphPOSTS, function(posts) {
		jQuery.each(posts.data, function() {
			var output = '';
			if (this.type == 'link') {
				post_class = 'type-link ';
			} else if (this.type == 'photo') {
				post_class = 'type-photo ';
			} else if (this.type == 'status') {
				post_class = 'type-status ';
			} else if (this.type == 'video') {
				post_class = 'type-video ';
			}
			output += '<li class="' + post_class + 'avatar-size-' + options.avatar_size + ' clearfix">';
				output += '<a href="http://www.facebook.com/profile.php?id=' + this.from.id + '" target="_blank" title="' + this.from.name + '"><img src="' + (graphURL + this.from.id + '/picture?type=' + options.avatar_size) + '" class="avatar" alt="' + this.from.name + '" /></a>';

				output += '<div class="message-from"><a href="http://www.facebook.com/profile.php?id=' + this.from.id + '" target="_blank" title="' + this.from.name + '">' + this.from.name + '</a></div>';
				if (this.message != null || this.message != undefined) {
					output += '<div class="message">' + modText(this.message) + '</div>';
				} else if (this.story != null || this.story != undefined) {
					output += '<div class="story">' + modText(this.story) + '</div>';
				}
				
				if (this.type == 'link' || this.type == 'photo' || this.type == 'video') {
					if (this.picture == null || this.picture == undefined) {
						media_class = ' border-left';
					} else {
						media_class = '';
					}
					output += '<div class="media' + media_class + '">';
						if (this.picture != null || this.picture != undefined) {
							output += '<a href="' + this.link + '"><img src="' + this.picture + '" /></a>';
						}
						output += '<div class="meta">';
						if (this.name != null || this.name != undefined) {
							output += '<a href="' + this.link + '">' + this.name + '</a><br />';
						}
						if (this.caption != null || this.caption != undefined) {
							output += '<div class="caption">' + modText(this.caption) + '</div>';
						}
						if (this.description != null || this.description != undefined) {
							output += '<div class="description">' + modText(this.description) + '</div>';
						}
						output += '</div>';
					output += '</div>';
				}

				output += '<div class="post-meta">';
					output += '<span class="date">' + timeToHuman(this.created_time) + '</span>';
					if (this.likes != null || this.likes != undefined) {
						output += '<span class="likes">';
							output += this.likes.count + ' synes godt om';
							if (this.likes.count >= 1 && this.likes.count <= 4) {
									output += '<ul class="like-list">';
									for (var l = 0; l < this.likes.data.length; l++) {
										output += '<li class="like">';
											output += '<div class="like-from"><a href="http://www.facebook.com/profile.php?id=' + this.likes.data[l].id + '" target="_blank" title="' + this.likes.data[l].name + '">' + this.likes.data[l].name + '</a></div>';
										output += '</li>';
									}
								output += '</ul>';
							}
						output += '</span>';
					}
					output += '<span class="comments">';
						output += this.comments.count + ' kommentarer';
						if (this.comments.count >= 1 && options.show_comments == true) {
							output += '<ul class="comment-list">';
								for (var c = 0; c < this.comments.data.length; c++) {
									output += '<li class="comment">';
										output += '<a href="http://www.facebook.com/profile.php?id=' + this.comments.data[c].from.id + '" target="_blank" title="' + this.comments.data[c].from.name + '"><img src="' + (graphURL + this.comments.data[c].from.id + '/picture?type=' + options.avatar_size) + '" class="comment-avatar" alt="' + this.comments.data[c].from.name + '" /></a>';
										output += '<div class="comment-from"><a href="http://www.facebook.com/profile.php?id=' + this.comments.data[c].from.id + '" target="_blank" title="' + this.comments.data[c].from.name + '">' + this.comments.data[c].from.name + '</a></div>';
										output += '<div class="message">' + modText(this.comments.data[c].message) + '</div>';
										output += '<div class="date">' + timeToHuman(this.comments.data[c].created_time) + '</div>';
									output += '</li>';
								}
							output += '</ul>';
						}
					output += '</span>';
				output += '</div>';

			output += '</li>';

			e.append(output);
		});
	}).complete(function() {
		e.removeClass('loading');
	});

	function modText(text) {
		return nl2br(autoLink(escapeTags(text)));
	}
	function nl2br(str) {
		return str.replace(/(\r\n)|(\n\r)|\r|\n/g, '<br>');
	}
	function autoLink(str) {
		return str.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1" target="_blank">$1</a>');
	}
	function escapeTags(str) {
		return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

	function urlHyperlinks(str) {
		return str.replace(/\b((http|https):\/\/\S+)/g, '<a href="$1" target="_blank">$1</a>');
	}

	function timeToHuman(time) {
		var timestamp = new Date(time*1000);
		dateString = timestamp.toGMTString();

		var time_difference = Math.round(new Date().getTime()/1000)-time;
		
		if (time_difference < 10) {
			return 'F&aring; sekunder siden';
		} else if (time_difference < 60) {
			return Math.round(time_difference) + ' sekunder siden';
		} else if (Math.round(time_difference/60) == 1) {
			return Math.round(time_difference/60) + ' minut siden';
		} else if (Math.round(time_difference/60) < 60) {
			return Math.round(time_difference/60) + ' minutter siden';
		} else if (Math.round(time_difference/(60*60)) == 1) {
			return Math.round(time_difference/(60*60)) + ' time siden';
		} else if (Math.round(time_difference/(60*60)) < 24) {
			return Math.round(time_difference/(60*60)) + ' timer siden';
		} else if (Math.round(time_difference/(60*60*24)) == 1) {
			return Math.round(time_difference/(60*60*24)) + ' dag siden';
		} else if (Math.round(time_difference/(60*60*24)) <= 10) {
			return Math.round(time_difference/(60*60*24)) + ' dage siden';
		} else {
			var days = new Array('S&oslash;ndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'L&oslash;rdag');
			var months = new Array('januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december');

			var day = timestamp.getDay();
			var day_no = timestamp.getDate();
			var month = timestamp.getMonth();
			var year = timestamp.getFullYear();
			return days[day] + ' d. ' + day_no + '. ' + months[month] + ' ' + year;
		}
	}
};