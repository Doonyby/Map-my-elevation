$(document).ready(function () {
	$('input[name="button"]').click(function(e) {
		e.preventDefault();
		var start = $('input[name="start"]').val()
		var finish = $('input[name="finish"]').val()
			
		geocodeInfo(start);
		geocodeInfo(finish);
		
	});

	var geocodeInfo = function(start, finish) {
		var params = {
			key: 'DkTAlgpIf3NGiuI1P7ZmHIC280KSgwVf',
			inFormat: 'kvp',
			outFormat: 'json',
			maxResults: 1,
			location: start,
		};
		url = 'http://www.mapquestapi.com/geocoding/v1/address';

		$.getJSON(url, params, function(data) {
			getLatLng(data.results)
		});
	}
	
	function getLatLng(result) {
		lattitude = result[0].locations[0].latLng.lat;
		longitude = result[0].locations[0].latLng.lng;
		return lattitude + " " + longitude;
	}

});

