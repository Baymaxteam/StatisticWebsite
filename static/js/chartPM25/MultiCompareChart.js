var test = [
    [Date.UTC(2015, 1, 1), 15],
    [Date.UTC(2015, 1, 2), 15],
    [Date.UTC(2015, 1, 3), 15],
    [Date.UTC(2015, 1, 4), 14],
    [Date.UTC(2015, 1, 5), 14],
    [Date.UTC(2015, 1, 6), 14],
    [Date.UTC(2015, 1, 7), 13]

];




$(function() {

        var dt = new Date();
        var timenow = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
        // console.log(timenow);
        // split the data set into ohlc and volume
        var data = test;
        var volume = [],
            // set the allowed units for data grouping
            groupingUnits = [
                [
                    'week', // unit name
                    [1] // allowed multiples
                ],
                [
                    'month', [1, 2, 3, 4, 6]
                ]
            ];


        for ( var i = 0 ; i < data.length; i += 1) {

            volume.push([
                data[i][0], // the date
                data[i][1] // the volume
            ]);
        }


        // create the chart
        $('#container1').highcharts('StockChart', {
            exporting: {
                enabled: false
            },
            chart: {
                marginLeft: 40, // Keep all charts left aligned
                spacingTop: 20,
                spacingBottom: 20
            },
            rangeSelector: {
                selected: 1
            },

            title: {
                text: 'PM2.5氣體'
            },

            // yAxis: [
            //     {title: {
            //         text: null
            //     }}
            // ],
            yAxis: [{
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    textAlign: 'left',
                    text: 'Temp',
                    rotation: 0,
                },

                height: '20%',
                offset: 0,
                lineWidth: 2
            }, {
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    textAlign: 'left',
                    text: 'PM10',
                    rotation: 0
                },
                top: '20%',
                height: '20%',
                offset: 0,
                lineWidth: 2
            }, {
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    textAlign: 'left',
                    text: 'PM2.5',
                    rotation: 0
                },
                top: '40%',
                height: '20%',
                offset: 0,
                lineWidth: 2
            }, {
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    textAlign: 'left',
                    text: 'RH',
                    rotation: 0
                },
                top: '60%',
                height: '20%',
                offset: 0,
                lineWidth: 2
            }, {
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    textAlign: 'left',
                    text: 'Wind',
                    rotation: 0
                },
                top: '80%',
                height: '20%',
                offset: 0,
                lineWidth: 2
            }],

            series: [
                // {
                //     type: 'candlestick',
                //     name: 'AAPL',
                //     data: ohlc,
                //     dataGrouping: {
                //         units: groupingUnits
                //     }
                // }, 
                {
                    type: 'column',
                    name: 'Temp',
                    data: volume,
                    yAxis: 0,
                    dataGrouping: {
                        units: groupingUnits
                    }
                }, {
                    type: 'column',
                    name: 'PM10',
                    data: volume,
                    yAxis: 1,
                    dataGrouping: {
                        units: groupingUnits
                    }
                }, {
                    type: 'column',
                    name: 'PM2.5',
                    data: volume,
                    yAxis: 2,
                    dataGrouping: {
                        units: groupingUnits
                    }
                }, {
                    type: 'column',
                    name: 'RH',
                    data: volume,
                    yAxis: 3,
                    dataGrouping: {
                        units: groupingUnits
                    }
                },

                {
                    type: 'column',
                    name: 'Wind',
                    data: volume,
                    yAxis: 4,
                    dataGrouping: {
                        units: groupingUnits
                    }
                }
            ]
        });

});
