$(document).ready(function() {
    var locations = [['Cambrai', 4, 50.1735380,3.2366330],['Morges', 4, 46.5152627,6.4929214],['London', 4, 51.5085150,-0.1254872],['New-York', 4, 40.7143528,-74.0059731]];
    iw = new google.maps.InfoWindow();
	var geneve = new google.maps.LatLng(46.201221,6.142187);

    var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 3,
		center: new google.maps.LatLng(0.0, 0.0),
		mapTypeId : google.maps.MapTypeId.ROADMAP, // Type de carte, diff�rentes valeurs possible HYBRID, ROADMAP, SATELLITE, TERRAIN
		streetViewControl: false,
		center: geneve,
		panControl: false,
		zoomControl: false,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
		},
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL
		}
    });
	var inputLocation = /** @type {HTMLInputElement} */(document.getElementById('pac-input'));
	// Link it to the UI element.
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputLocation);
	var autocompleteLocation = new google.maps.places.Autocomplete(inputLocation);
	autocompleteLocation.bindTo('bounds', map);
	 /******************** LISTENER ************************/
	google.maps.event.addListener(autocompleteLocation, 'place_changed', function() {
	inputLocation.className = '';
	var placeStart = autocompleteLocation.getPlace();
	if (!placeStart.geometry) {
	  // Inform the user that the place was not found and return.
	  inputLocation.className = 'notfound';
	  return;
	}

	// If the place has a geometry, then present it on a map.
	if (placeStart.geometry.viewport) {
	  map.fitBounds(placeStart.geometry.viewport);
	} else {
	  map.setCenter(placeStart.geometry.location);
	  map.setZoom(13);  // Why 13? Because it looks good.
	}
	var address = '';
	if (placeStart.address_components) {
	  address = [
		(placeStart.address_components[0] && placeStart.address_components[0].short_name || ''),
		(placeStart.address_components[1] && placeStart.address_components[1].short_name || ''),
		(placeStart.address_components[2] && placeStart.address_components[2].short_name || '')
	  ].join(' ');
	}
  });
  /******************** END LISTENER ************************/
    var marker, i;
	var contentDiv = '<div id="container" style="height:350px; width:350px"></div>';

    for (i = 0; i < locations.length; i++) {  
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][2], locations[i][3]),
			map: map,
			title: locations[i][0]+ " (" + locations[i][1] + " stars)"
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
			var selectedname = locations[i][0];
			marker.setAnimation(google.maps.Animation.BOUNCE);
			stopAnimation(marker);
			$.ajax({
					success: function(data) {
						iw.open(map, marker);					
						iw.setContent(contentDiv);
						dataChart = {	
							chart: {
								borderWidth: 2,
								renderTo: document.getElementById('container'),
								zoomType: 'x',
								type:"spline",
								height:350,
								width:350,
								marginRight:40
							},
							title: {
								text: 'Monthly Average Temperature',
								x: -20 //center
							},
							subtitle: {
								text: 'Source: WorldClimate.com',
								x: -20
							},
							xAxis: {
								categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
									'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
							},
							yAxis: {
								title: {
									text: 'Temperature (°C)'
								},
								plotLines: [{
									value: 0,
									width: 1,
									color: '#808080'
								}]
							},
							tooltip: {
								valueSuffix: '°C'
							},
							legend: {
								layout: 'vertical',
								align: 'right',
								verticalAlign: 'middle',
								borderWidth: 0
							},
							series: [{
								name: 'Tokyo',
								data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
							}, {
								name: 'New York',
								data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
							}, {
								name: 'Berlin',
								data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
							}, {
								name: 'London',
								data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
							}]
						}
						chart = new Highcharts.Chart(dataChart);
					}
				
			});
				return false
			}
        })
	    (marker, i));
    }
	
	google.maps.event.addListener(iw, 'closeclick', function() {  
		
	}); 
	
	function stopAnimation(marker) {
		setTimeout(function () {
			marker.setAnimation(null);
		}, 3000);
	}
});