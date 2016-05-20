$(function() {

    // Prepare demo data
    var data = [

        {
            "hc-key": "tw-th",
            "value": 10
        },

        {
            "hc-key": "tw-cg",
            "value": 19
        },

        {
            "hc-key": "tw-nt",
            "value": 21
        }
    ];

    var selectCityName = "Taichung City"; // default city = Taichung City

    // Initiate the chart
    $('#container').highcharts('Map', {

        title: {
            text: 'PM2.5 氣體分布資訊'
        },

        subtitle: {
            text: 'Source map: <a href="https://code.highcharts.com/mapdata/countries/tw/tw-all.js">Taiwan</a>'
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            min: 0
        },
        plotOptions: {
            series: {
                point: {
                    events: {
                        click: function() {
                            // alert(this.name);
                            selectCityName = this.name;
                            console.log(selectCityName);

                        }

                    }
                }
            }
        },

        series: [{
            data: data,
            mapData: Highcharts.maps['countries/tw/tw-all'],
            joinBy: 'hc-key',
            name: 'PM25',
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }]
    });
});


// if (cityName == "Taichung City") {
//     selectCityName = 
// } else if (cityName == "Nantou") {

// } else if (cityName == "Changhua") {

// } else {

// }
