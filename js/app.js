$(document).ready(function () {
	$('input[name="button"]').click(function(e) {
		e.preventDefault();
		var start = $('input[name="start"]').val()
		var finish = $('input[name="finish"]').val()
			
		getStartGeocode(start);
		getFinishGeocode(finish);
		
	});
	var startLatLng = "";
	var finishLatLng = "";
	
	function getElevationInfo() {
		var coordinates = startLatLng + "," + finishLatLng;
		console.log(coordinates);
		// var params = {
		// 	key: 'DkTAlgpIf3NGiuI1P7ZmHIC280KSgwVf',
		// 	inFormat: 'kvp',
		// 	shapeFormat: 'raw',
		// 	width: 425,
		// 	height: 350,
		// 	latLngCollection: latLng
		// };
		// url = 'http://open.mapquestapi.com/elevation/v1/chart';

		// $.getJSON(url, params, function(data) {
		// 	console.log(data);
		// });
	}


	var getStartGeocode = function(start) {
		var params = {
			key: 'DkTAlgpIf3NGiuI1P7ZmHIC280KSgwVf',
			inFormat: 'kvp',
			outFormat: 'json',
			maxResults: 1,
			location: start
		};
		url = 'http://www.mapquestapi.com/geocoding/v1/address';
		$.getJSON(url, params, function(data) {
			var lattitude = data.results[0].locations[0].latLng.lat;
			var longitude = data.results[0].locations[0].latLng.lng;
			startLatLng += lattitude + "," + longitude;
		});
	}

	var getFinishGeocode = function(finish) {
		var params = {
			key: 'DkTAlgpIf3NGiuI1P7ZmHIC280KSgwVf',
			inFormat: 'kvp',
			outFormat: 'json',
			maxResults: 1,
			location: finish
		};
		url = 'http://www.mapquestapi.com/geocoding/v1/address';
		$.getJSON(url, params, function(data) {
			var lattitude = data.results[0].locations[0].latLng.lat;
			var longitude = data.results[0].locations[0].latLng.lng;
			finishLatLng += lattitude + "," + longitude;
			getElevationInfo();
		});
	}

});

