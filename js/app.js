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
		var params = {
			key: 'DkTAlgpIf3NGiuI1P7ZmHIC280KSgwVf',
			inFormat: 'kvp',
			shapeFormat: 'raw',
			unit: "f",
			width: 425,
			height: 350,
			latLngCollection: coordinates
		};
		url = 'http://open.mapquestapi.com/elevation/v1/chart';

		$.getJSON(url, params, function(data) {
			console.log(data);
		});
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
			console.log(data);
			$('#distance').text('Total Distance: ' + data.elevationProfile[1].distance + ' miles');
			$('#startElev').text('Starting Elevation: ' + data.elevationProfile[0].height + ' ft. above sea level.');
			$('#endElev').text('Ending Elevation: ' + data.elevationProfile[1].height + ' ft. above sea level.');
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
		    }
		    else {
		        // Request for web data didn't work, handle it
		        alert("No finish data!");
		    }
		});

		
	}

	// var getFinishGeocode = function(finish) {
	// 	var params = {
	// 		key: 'DkTAlgpIf3NGiuI1P7ZmHIC280KSgwVf',
	// 		inFormat: 'kvp',
	// 		outFormat: 'json',
	// 		maxResults: 1,
	// 		location: finish
	// 	};
	// 	url = 'http://www.mapquestapi.com/geocoding/v1/address';
	// 	$.getJSON(url, params, function(data) {
	// 		var lattitude = data.results[0].locations[0].latLng.lat;
	// 		var longitude = data.results[0].locations[0].latLng.lng;
	// 		finishLatLng += lattitude + "," + longitude;
	// 		getElevationInfo();
	// 	});
	// }

});

