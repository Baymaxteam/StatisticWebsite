var DEBUG_Log = true;

var locations = [
    // ['San Francisco', 4, 37.762100, -122.397100],
    ['San Jose Diron Caltrain Station', 4, 37.329732, -121.901782],
    ['San Jose Civic Center', 4, 37.330698, -121.888979],
    ['San Pedro Square', 4, 37.336721, -121.894074],
    ['MLK Library', 4, 37.335885, -121.88566]
];
var Lat = 37.333259;
var Lng = -121.8926237;
var bikenumber = [];

$(document).ready(function() {
    // var locations = [
    //     ['San Francisco', 4, 37.762100, -122.397100],
    //     ['San Jose', 4, 37.339390, -121.89496],
    // ];

    // var bikenumber = [
    //     [{
    //         name: 'San Jose Diron Caltrain Station',
    //         data: [7.1, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6, 7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    //     }, {
    //         name: 'San Jose',
    //         data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8, 3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    //     }],
    //     [{
    //         name: 'San Jose1',
    //         data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8, 3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    //     }, {
    //         name: 'San Jose2',
    //         data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8, 3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    //     }],
    //     [{
    //         name: 'San Jose Diron Caltrain Station',
    //         data: [7.1, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6, 7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    //     }, {
    //         name: 'San Jose333',
    //         data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8, 3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    //     }],
    //     [{
    //         name: 'San Jose Diron Caltrain Station',
    //         data: [7.1, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6, 7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    //     }, {
    //         name: 'San Jose4444',
    //         data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8, 3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    //     }],
    // ];


    getBikeMapData('Bike_mapDataBakup.csv');


});


function getBikeMapData(csvFileName) {

    $.get('/ajax_selectFilePart2/', {
        'fileName': csvFileName
    }, function(respons) {
        var i, j,
            temp1 = [],
            temp2 = [];

        var tempXtimestamp = [];
        var tmpdata = respons['data'];
        var tmptitle = respons['title'];
        var len = tmpdata.length;
        var mapData = [];
        // console.log("map tmpdata");
        // console.log(tmpdata);
        //  console.log("map tmptitle");
        // console.log(tmptitle);
        // 第一筆不需要在這讀取，第二筆要個別獨取
        // 將資料縮小10倍，避免溢位

        for (i = 0; i < 4 ; i++) {
            for (j = 0; j < (48*60); j = j + 60) {
                temp1.push(tmpdata[j][2*i + 2]);
                temp2.push(tmpdata[j][2*i + 3]);
            }
            // 最後一筆
            // temp1.push([tmpdata[len - 1][1], tmpdata[len - 1][i + 2]]);
            // temp2.push([tmpdata[len - 1][1], tmpdata[len - 1][i + 3]]);
            // console.log("temp1");
            // console.log(temp1);
            mapData.push([{
                'name': tmptitle[2*i + 2],
                'data': temp1
            }, {
                'name': tmptitle[2*i + 3],
                'data': temp2
            }])
            temp1 = [];
            temp2 = [];
        }
        bikenumber = mapData;
        console.log("bikenumber");
        console.log(bikenumber);
        showGoogleMap();


    });

}

function showGoogleMap() {
    iw = new google.maps.InfoWindow();
    // var geneve = new google.maps.LatLng(46.201221, 6.142187);
    var geneve = new google.maps.LatLng(Lat, Lng);

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: new google.maps.LatLng(0.0, 0.0),
        mapTypeId: google.maps.MapTypeId.ROADMAP, // Type de carte, diff�rentes valeurs possible HYBRID, ROADMAP, SATELLITE, TERRAIN
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
    var inputLocation = /** @type {HTMLInputElement} */ (document.getElementById('pac-input'));
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
            map.setZoom(13); // Why 13? Because it looks good.
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
            title: locations[i][0] + " (" + locations[i][1] + " stars)"
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    var selectedname = locations[i][0];
                    console.log("bikenumber google map");
                    console.log(bikenumber[i]);
                    console.log(bikenumber);
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    stopAnimation(marker);
                    $.ajax({
                        success: function(data) {
                            iw.open(map, marker);
                            iw.setContent(contentDiv);
                            dataChart = {
                                exporting: {
                                    enabled: false
                                },
                                chart: {
                                    borderWidth: 2,
                                    renderTo: document.getElementById('container'),
                                    zoomType: 'x',
                                    type: "spline",
                                    height: 350,
                                    width: 350,
                                    marginRight: 10
                                },
                                title: {
                                    text: 'BIKE剩餘數量',
                                   
                                },

                                xAxis: {
                                    categories: ['1', '1', '2', '3', '4', '5',
                                        '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17',
                                        '18', '19', '20', '21', '22', '23', '24'
                                    ]
                                },
                                yAxis: {
                                    title: {
                                        text: '剩餘數量'
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 1,
                                        color: '#808080'
                                    }]
                                },
                                tooltip: {
                                    valueSuffix: '輛'
                                },
                                legend: {
                                    layout: 'vertical',
                                    align: 'right',
                                    verticalAlign: 'bottom',
                                    borderWidth: 0
                                },
                                series: bikenumber[i]
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
        setTimeout(function() {
            marker.setAnimation(null);
        }, 3000);
    }
}
