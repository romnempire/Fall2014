// create a mask over the header with the splash.css style
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	// mobile
	setLogoSize();
	$('.background').css('background-image', 'url(' + getBackgroundString(selectRandomBackground()) + ')');
	$('.splash > .container').css('display', 'table-cell');
	$('.splash').delay(1000).fadeOut(500);
} else {
	// everything else
	setLogoSize();
	window.addEventListener('resize', function(event) {
		setLogoSize();
	});
	$('.splash > .container').css('display', 'table-cell');
	$('.splash > .container').addClass('zoomInEntrance').queue(function(next) {
		var image = getBackgroundString(selectRandomBackground()), img = $('<img />');
		img.bind('load', function() {
			setTimeout(function() {
				// show the page after the background has loaded
				if ($('.splash > .container').hasClass('zoomInEntrance')) {
					$('.splash > .container').removeClass('zoomInEntrance');
					$('.splash > .container').delay(666).addClass('zoomInExit').delay(666).parent().fadeOut();
				
				}
				$('.background').fadeIn();
			}, 966);
		});
		img.attr('src', image);
		$('.background').css('background-image', 'url(' + image + ')');
		$('.background').css('display', 'none');
		// if the background takes longer than four seconds to load, show the page anyways.
		setTimeout(function() {
			if ($('.splash > .container').hasClass('zoomInEntrance')) {
				$('.splash > .container').removeClass('zoomInEntrance');
				$('.splash > .container').delay(666).addClass('zoomInExit').delay(666).parent().fadeOut();
			}
		}, 3666);
	});
}

// loading sequence
function setLogoSize() {
	var height = $(window).height();
	$('.splash .container').css('height', height);
	$('.splash .container').css('max-height', height);
}

function getBackgroundString(image) {
	var size = '320';
	var width = $(window).width();
	if (width <= 640) {
		size = '640';
	} else if (width <= 800) {
		size = '800';
	} else if (width <= 1024) {
		size = '1024';
	} else if (width <= 1600) {
		size = '1600';
	} else {
		size = '2048';
	}
	return './images/backgrounds/' + image + '_' + size + '.jpg';
}

function selectRandomBackground() {
	var numImages = 11;
	return Math.floor(Math.random() * (numImages + 1));
}