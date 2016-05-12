$(function() {
    $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-ohlcv.json&callback=?', function(data) {

        // split the data set into ohlc and volume
        var ohlc = [],
            volume = [],
            dataLength = data.length,
            // set the allowed units for data grouping
            groupingUnits = [
                [
                    'week', // unit name
                    [1] // allowed multiples
                ],
                [
                    'month', [1, 2, 3, 4, 6]
                ]
            ],

            i = 0;

        for (i; i < dataLength; i += 1) {
            ohlc.push([
                data[i][0], // the date
                data[i][1], // open
                data[i][2], // high
                data[i][3], // low
                data[i][4] // close
            ]);

            volume.push([
                data[i][0], // the date
                data[i][5] // the volume
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
                text: 'AAPL Historical'
            },

            // yAxis: [
            //     {title: {
            //         text: null
            //     }}
            // ],
            yAxis: [
                {
                    labels: {
                        align: 'right',
                        x: -3
                    },
                    title: {
                        text: 'Temp',
                        rotation: 0
                    },

                    height: '20%',
                    offset: 0,
                    lineWidth: 2
                },
                            {
                    labels: {
                        align: 'right',
                        x: -3
                    },
                    title: {
                        text: 'PM10',
                        rotation: 0
                    },
                    top: '20%',
                    height: '20%',
                    offset: 0,
                    lineWidth: 2
                },
                              {
                    labels: {
                        align: 'right',
                        x: -3
                    },
                    title: {
                        text: 'PM2.5',
                        rotation: 0
                    },
                    top: '40%',
                    height: '20%',
                    offset: 0,
                    lineWidth: 2
                },
                              {
                    labels: {
                        align: 'right',
                        x: -3
                    },
                    title: {
                        text: 'RH',
                        rotation: 0
                    },
                    top: '60%',
                    height: '20%',
                    offset: 0,
                    lineWidth: 2
                },
                {
                    labels: {
                        align: 'right',
                        x: -3
                    },
                    title: {
                        text: 'Wind',
                        rotation: 0
                    },
                    top: '80%',
                    height: '20%',
                    offset: 0,
                    lineWidth: 2
                }
            ],

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
});
