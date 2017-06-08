google.load('visualization', '1', {packages: ['columnchart']});

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
			$('#errorMessage').text('You must enter a starting value');
		}
		else if (finish == '') {
			$('#errorMessage').text('You must enter a finish value');
		} else {
			$('#errorMessage').text('');
			$('#modal').css('display', 'block');
			startAnimation();
			getPoints(start, finish);
		}
	});


	function getPoints(start, finish) {
	  	var directionsService = new google.maps.DirectionsService;
	    directionsService.route({
	        origin: start,
	        destination: finish,
	        travelMode: 'DRIVING'
	    }, function(response, status) {
	        if (status === 'OK') {
	      	  path = response.routes[0].overview_path;
			  var points = $.map(path, function(a){return [{lat: a.lat(), lng: a.lng()}]});
			  getElevChart(points);
	        } else {
	          console.log('routestatus', status);
	          console.log('routeresponse', response);
	        }
	    });
	}

	function getElevChart(points) {
		var elevator = new google.maps.ElevationService;
		var path = points;
		elevator.getElevationAlongPath({
            'path': path,
            'samples': path.length
        }, function(elevations, status) {
        	var chartDiv = document.getElementById('chart');
	        if (status !== 'OK') {
	          chartDiv.html('<p>Cannot show elevation: request failed because ' + status + '</p>');
	          return;
	        }
	        var chart = new google.visualization.ColumnChart(chartDiv);

	        var data = new google.visualization.DataTable();
	        data.addColumn('string', 'Sample');
	        data.addColumn('number', 'Elevation');
	        for (var i = 0; i < elevations.length; i++) {
	          data.addRow(['', elevations[i].elevation]);
	        }

	        chart.draw(data, {
	          height: 300,
	          legend: 'none',
	          titleY: 'Elevation (m)'
	        });
	    });
	}

    function startAnimation() {
      $('#loader').animate({letterSpacing: "+10px"}, 1000);
      $('#loader').animate({letterSpacing: "0px"}, 1000, startAnimation);
      setTimeout(stopAnimation, 2000);
    } 

    function stopAnimation() {
    	$('#loader').stop(true);
    	$('#modal').css('display', 'none');
    	$('#loadingMessage').text("Don't see any info?  Try submitting again, or try using different " +
    		"locations close to the originals, so you can still get an accurate route.");
    	$('#loadingMessage').velocity('scroll', 500);
    }

});

