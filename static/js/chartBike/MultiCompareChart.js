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
        $('#container31').highcharts('StockChart', {
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
                text: '自行車租借站環境資訊'
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
                        textAlign: 'left',
                        text: '溫度',
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
                        textAlign: 'left',
                        text: '濕度',
                        rotation: 0
                    },
                    top: '20%',
                    height: '20%',
                    offset: 0,
                    lineWidth: 2
                },
                              {
                    labels: {
                        textAlign: 'left',
                        align: 'right',
                        x: -3
                    },
                    title: {
                        textAlign: 'left',
                        text: '氣壓',
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
                        textAlign: 'left',
                        text: '能見度',
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
                        textAlign: 'left',
                        text: '風速',
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
                    name: '溫度',
                    data: volume,
                    yAxis: 0,
                    dataGrouping: {
                        units: groupingUnits
                    }
                }, {
                    type: 'column',
                    name: '濕度',
                    data: volume,
                    yAxis: 1,
                    dataGrouping: {
                        units: groupingUnits
                    }
                }, {
                    type: 'column',
                    name: '氣壓',
                    data: volume,
                    yAxis: 2,
                    dataGrouping: {
                        units: groupingUnits
                    }
                }, {
                    type: 'column',
                    name: '能見度',
                    data: volume,
                    yAxis: 3,
                    dataGrouping: {
                        units: groupingUnits
                    }
                },

                {
                    type: 'line',
                    name: '風速',
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
