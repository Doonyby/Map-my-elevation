$(document).ready(function () {
	$('input[name="button"]').click(function(e) {
		e.preventDefault();
		var start = $('input[name="start"]').val()
		var finish = $('input[name="finish"]').val()
			
		getGeocodeInfo(start, finish);
		
	});
	var startLatLng = "";
	var finishLatLng = "";
	
	function getElevationChartInfo() {
		var coordinates = startLatLng + "," + finishLatLng;
		$('#chart').html('<img style="-webkit-user-select: none; cursor: zoom-in;" src="http://open.mapquestapi.com/elevation/v1/chart?key=DkTAlgpIf3NGiuI1P7ZmHIC280KSgwVf&amp;inFormat=kvp&amp;shapeFormat=raw&amp;unit=f&amp;width=425&amp;height=350&amp;latLngCollection=' + coordinates + '" width="398" height="328">');
	}

	function getElevationTableInfo() {
		var coordinates = startLatLng + "," + finishLatLng;
		var params = {
			key: 'DkTAlgpIf3NGiuI1P7ZmHIC280KSgwVf',
			inFormat: 'kvp',
			shapeFormat: 'raw',
			unit: "f",
			width: 425,
			height: 350,
			latLngCollection: coordinates
		};
		url = 'http://open.mapquestapi.com/elevation/v1/profile';

		$.getJSON(url, params, function(data) {
			$('#startElev').text('Starting Elevation: ' + data.elevationProfile[0].height + ' ft. above sea level.');
			$('#endElev').text('Ending Elevation: ' + data.elevationProfile[1].height + ' ft. above sea level.');
		});
	}

	function getRouteMap() {
		var coordinates = startLatLng + "," + finishLatLng;
		var params = {
			key: 'DkTAlgpIf3NGiuI1P7ZmHIC280KSgwVf',
			from: startLatLng,
			to: finishLatLng,
			inFormat: 'kvp',
			shapeFormat: 'raw',
			unit: "m",
			routeType: "fastest",
			narrativeType: 'none',
			mapwidth: 425,
			mapheight: 350,
		};
		url = 'http://open.mapquestapi.com/directions/v2/route';

		$.getJSON(url, params, function(data) {
			$('#distance').text('Total Distance: ' + data.route.distance + ' miles');
			var session = data.route.sessionId;
			console.log(data);
			//$('#map').html('<img src="http://open.mapquestapi.com/directions/v2/routeshape?key="DkTAlgpIf3NGiuI1P7ZmHIC280KSgwVf"&callback=renderShapeResults&json={sessionId:' + session + ', mapState:{width: 320, height:240, scale:866685, center:{lat:40.5312875, lng:-111.792457}}}">')
			//$('#chart').html('<img style="-webkit-user-select: none; cursor: zoom-in;" src="http://open.mapquestapi.com/elevation/v1/chart?key=DkTAlgpIf3NGiuI1P7ZmHIC280KSgwVf&amp;inFormat=kvp&amp;shapeFormat=raw&amp;unit=f&amp;width=425&amp;height=350&amp;sessionId=' + session + '" width="398" height="328">');

		});
	}

	var getGeocodeInfo = function(start, finish) {
		var startParams = {
			key: 'DkTAlgpIf3NGiuI1P7ZmHIC280KSgwVf',
			inFormat: 'kvp',
			outFormat: 'json',
			maxResults: 1,
			location: start
		};
		var finishParams = {
			key: 'DkTAlgpIf3NGiuI1P7ZmHIC280KSgwVf',
			inFormat: 'kvp',
			outFormat: 'json',
			maxResults: 1,
			location: finish
		};
		url = 'http://www.mapquestapi.com/geocoding/v1/address';
		var startData, finishData;
		$.when(
			$.getJSON(url, startParams, function(data) {
				startData = data;
			}),
			$.getJSON(url, finishParams, function(data) {
				finishData = data;
			})
		).then(function() {
		    if (startData) {
		        // Worked, put graphicData in #view-graphic
		        var lattitude = startData.results[0].locations[0].latLng.lat;
				var longitude = startData.results[0].locations[0].latLng.lng;
				startLatLng += lattitude + "," + longitude;
		    }
		    else {
		        // Request for graphic data didn't work, handle it
		        alert("No start data!");
		    }
		    if (finishData) {
		        // Worked, put webData in #view-web
		        var lattitude = finishData.results[0].locations[0].latLng.lat;
				var longitude = finishData.results[0].locations[0].latLng.lng;
				finishLatLng += lattitude + "," + longitude;
				//console.log(startLatLng + "," + finishLatLng);
				getElevationChartInfo();
				getElevationTableInfo();
				getRouteMap();
		    }
		    else {
		        // Request for web data didn't work, handle it
		        alert("No finish data!");
		    }
		});

		
	}

});

