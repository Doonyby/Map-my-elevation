$(document).ready(function () {
	$('input[name="button"]').click(function(e) {
		e.preventDefault();		
		$('#distance').text('');
		$('#startElev').text('');
		$('#endElev').text('');
		$('#chart').html('');
		var start = $('input[name="start"]').val()
		var finish = $('input[name="finish"]').val()
		if (start == '') {
			alert('You must enter a starting value');
		}
		else if (finish == '') {
			alert('You must enter a finish value');
		} else {
			// $('#modal').css('display', 'block');
			// startAnimation();
			getGeocodeInfo(start, finish);
		}
	});

	var getGeocodeInfo = function(start, finish) {
		console.log(typeof start);
		var code = new google.maps.Geocoder;
		console.log(code.geocode({address: start}));
	}

 //    function startAnimation() {
 //      $('#loader').animate({letterSpacing: "+10px"}, 1000);
 //      $('#loader').animate({letterSpacing: "0px"}, 1000, startAnimation);
 //      setTimeout(stopAnimation, 5000);
 //    } 

 //    function stopAnimation() {
 //    	$('#loader').stop(true);
 //    	$('#modal').css('display', 'none');
 //    	$('#loadingMessage').text("Don't see any info?  Try submitting again, or try using different " +
 //    		"locations close to the originals, so you can still get an accurate route.");
 //    	$('#loadingMessage').velocity('scroll', 800);
 //    }

	// var getGeocodeInfo = function(start, finish) {
	// 	var params = {
	// 		key: 'DkTAlgpIf3NGiuI1P7ZmHIC280KSgwVf',
	// 		unit: 'm',
	// 		from: start,
	// 		to: finish
	// 	}
	// 	var session;
	// 	var url = 'http://www.mapquestapi.com/directions/v2/route';
	// 	$.when(
	// 		$.getJSON(url, params, function(data) {
	// 			session = data;
	// 		})
	// 	).then(function() {
	// 	    if (session) {
	// 	    	$('#distance').text("Distance: " + session.route.distance + " miles.");
	// 	        // Worked, put graphicData in #view-graphic
	// 			getElevationChartInfo(session.route.sessionId);
	// 			getElevationTableInfo(session.route.sessionId);
	// 	    }
	// 	    else {
	// 	        $('#loadingMessage').text('Something went wrong with your input. Check to see if inputs are correct, then try again. Maybe try being more specific.');
	// 	    }
	// 	});
	// }
	
	// function getElevationChartInfo(sessionId) {
	// 	$('#chart').html('<h2 class="chartTitle">Elevation Chart of Route</h2><img style="-webkit-user-select: none; cursor: zoom-in;" src="http://open.mapquestapi.com/elevation/v1/chart?key=DkTAlgpIf3NGiuI1P7ZmHIC280KSgwVf&amp;inFormat=kvp&amp;shapeFormat=raw&amp;unit=f&amp;width=425&amp;height=350&amp;sessionId=' + sessionId + '" width="600" height="400">');
	// }

	// function getElevationTableInfo(sessionId) {
	// 	var params = {
	// 		key: 'DkTAlgpIf3NGiuI1P7ZmHIC280KSgwVf',
	// 		inFormat: 'kvp',
	// 		shapeFormat: 'raw',
	// 		unit: "f",
	// 		width: 425,
	// 		height: 350,
	// 		sessionId: sessionId
	// 	};
	// 	url = 'http://open.mapquestapi.com/elevation/v1/profile';

	// 	$.getJSON(url, params, function(data) {
	// 		$('#startElev').text('Starting Elevation: ' + data.elevationProfile[0].height + ' ft. above sea level.');
	// 		$('#endElev').text('Ending Elevation: ' + data.elevationProfile.pop().height + ' ft. above sea level.');
	// 	});
	// }

});

