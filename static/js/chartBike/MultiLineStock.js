var numberOfBike = [
    [
        [1396310400000, 12],
        [1396310460000, 12],
        [1396310520000, 12],
        [1396310580000, 12],
        [1396310640000, 12],
        [1396310700000, 12],
        [1396310760000, 12],
        [1396310820000, 12],
        [1396310880000, 13],
        [1396310940000, 13],
        [1396311000000, 13],
        [1396311060000, 13],
        [1396311120000, 13],
        [1396311300000, 13]
    ],
    [
        [1396310460000, 15],
        [1396310520000, 15],
        [1396310580000, 15],
        [1396310640000, 15],
        [1396310700000, 15],
        [1396310760000, 15],
        [1396310820000, 15],
        [1396310880000, 14],
        [1396310940000, 14],
        [1396311000000, 14],
        [1396311060000, 14],
        [1396311120000, 14]
    ]
];

$(document).ready(function() {

    var data = [
        [
            [1393632000000, 194.80],
            [1393632001000, 198.22]
            // [1242691200000, 199.24],
            // [1242777600000, 198.39],
            // [1242864000000, 198.05],
            // [1242950400000, 196.55],
            // [1243296000000, 201.98],
            // [1243382400000, 202.58],
            // [1243468800000, 204.99],
            // [1243555200000, 208.41]
        ]
    ];

    var data1 = [
        [
            [0, 9],
            [1, 29],
            [2, 9],
            [3, 2],
            [4, 27],
            [5, 28],
            [6, 29],
            [7, 23],
            [8, 9],
            [9, 29],
            [10, 9],
            [11, 2],
            [12, 27],
            [13, 28],
            [14, 29],
            [15, 23],
            [16, 9],
            [17, 29],
            [18, 9],
            [19, 2],
            [20, 27],
            [21, 28],
            [22, 29],
            [23, 23],
            [24, 28],
        ],

        [
            [0, 4],
            [1, 9],
            [2, 3],
            [3, 16],
            [4, 28],
            [5, 18],
            [6, 25],
            [7, 1],
            [8, 4],
            [9, 9],
            [10, 3],
            [11, 16],
            [12, 28],
            [13, 18],
            [14, 25],
            [15, 1],
            [16, 4],
            [17, 9],
            [18, 3],
            [19, 16],
            [20, 28],
            [21, 18],
            [22, 25],
            [23, 1],
            [24, 18],
        ],

        [
            [0, 21],
            [1, 11],
            [2, 4],
            [3, 22],
            [4, 10],
            [5, 29],
            [6, 29],
            [7, 29],
            [8, 21],
            [9, 11],
            [10, 4],
            [11, 22],
            [12, 10],
            [13, 29],
            [14, 29],
            [15, 29],
            [16, 21],
            [17, 11],
            [18, 4],
            [19, 22],
            [20, 10],
            [21, 29],
            [22, 29],
            [23, 29],
            [24, 29],
        ],

        [
            [0, 5],
            [1, 10],
            [2, 20],
            [3, 27],
            [4, 4],
            [5, 7],
            [6, 3],
            [7, 13],
            [8, 5],
            [9, 10],
            [10, 20],
            [11, 27],
            [12, 4],
            [13, 7],
            [14, 3],
            [15, 13],
            [16, 5],
            [17, 10],
            [18, 20],
            [19, 27],
            [20, 4],
            [21, 7],
            [22, 3],
            [23, 13],
            [24, 7],
        ],

        [
            [0, 28],
            [1, 8],
            [2, 23],
            [3, 23],
            [4, 19],
            [5, 27],
            [6, 15],
            [7, 3],
            [8, 28],
            [9, 8],
            [10, 23],
            [11, 23],
            [12, 19],
            [13, 27],
            [14, 15],
            [15, 3],
            [16, 28],
            [17, 8],
            [18, 23],
            [19, 23],
            [20, 19],
            [21, 27],
            [22, 15],
            [23, 3],
            [24, 27],
        ]
    ];

    var seriesOptionsBike = [],
        seriesOptions1 = [],
        seriesCounter = 0,
        names = ['San Francisco', 'San Jose'];

    // names = ['MSFT', 'AAPL', 'GOOG'];
    /**
     * Create the chart when all data is loaded
     * @returns {undefined}
     */
    for (i = 0; i < 2; i++) {
        seriesOptionsBike[i] = {
            name: names[i],
            data: numberOfBike[i]
        };
        seriesOptions1[i] = {
            name: names[i],
            data: data1[i]
        };
    }

    $('#container_BikeAvailable').highcharts('StockChart', {

        rangeSelector: {
            selected: 4
        },

        yAxis: {
            labels: {
                formatter: function() {
                    return (this.value > 0 ? ' + ' : '') + this.value + '';
                }
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }]
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
            valueDecimals: 2
        },

        series: seriesOptionsBike
    });

    $('#container22').highcharts('StockChart', {

        rangeSelector: {
            selected: 4
        },

        yAxis: {
            labels: {
                formatter: function() {
                    return (this.value > 0 ? ' + ' : '') + this.value + '';
                }
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }]
        },

        plotOptions: {
            series: {
                compare: 'value'
            }
        },

        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
            valueDecimals: 2
        },

        series: seriesOptions
    });
    $('#container23').highcharts('StockChart', {

        rangeSelector: {
            selected: 4
        },

        yAxis: {
            labels: {
                formatter: function() {
                    return (this.value > 0 ? ' + ' : '') + this.value + '';
                }
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }]
        },

        plotOptions: {
            series: {
                compare: 'value'
            }
        },

        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
            valueDecimals: 2
        },

        series: seriesOptions
    });
    $('#container24').highcharts('StockChart', {

        rangeSelector: {
            selected: 4
        },

        yAxis: {
            labels: {
                formatter: function() {
                    return (this.value > 0 ? ' + ' : '') + this.value + '';
                }
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }]
        },
        chart: {
            type: 'area'
        },

        plotOptions: {
            series: {
                compare: 'value'
            }
        },

        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
            valueDecimals: 2
        },

        series: seriesOptions
    });
    $('#container25').highcharts('StockChart', {

        rangeSelector: {
            selected: 4
        },

        yAxis: {
            labels: {
                formatter: function() {
                    return (this.value > 0 ? ' + ' : '') + this.value + '';
                }
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }]
        },
        chart: {
            type: 'column'
        },

        plotOptions: {
            series: {
                compare: 'value'
            }
        },

        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
            valueDecimals: 2
        },

        series: seriesOptions
    });
    $('#container26').highcharts('StockChart', {

        rangeSelector: {
            selected: 4
        },

        yAxis: {
            labels: {
                formatter: function() {
                    return (this.value > 0 ? ' + ' : '') + this.value + '';
                }
            },
            plotLines: [{
                value: 0,
                width: 2,

            }]
        },
        chart: {
            type: 'areaspline'
        },
        plotOptions: {
            series: {
                compare: 'value'
            }
        },

        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
            valueDecimals: 2
        },

        series: seriesOptions

    });

    //
    $('#container41').highcharts('Chart', {
        exporting: {
            enabled: false
        },
        rangeSelector: {
            selected: 4
        },

        yAxis: {
            labels: {
                formatter: function() {
                    return (this.value > 0 ? ' + ' : '') + this.value + '';
                }
            },
            plotLines: [{
                value: 0,
                width: 2,

            }]
        },
        chart: {
            type: 'line'
        },
        title: {
            text: '平均數據'
        },
        // plotOptions: {
        //     series: {
        //         compare: 'value'
        //     }
        // },

        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>:<b> {point.x} , {point.y}</b><br/>',
            valueDecimals: 2
        },

        series: seriesOptions1

    });
    // function createChart() {


    //     $('#container21').highcharts('StockChart', {

    //         rangeSelector: {
    //             selected: 4
    //         },

    //         yAxis: {
    //             labels: {
    //                 formatter: function () {
    //                     return (this.value > 0 ? ' + ' : '') + this.value + '%';
    //                 }
    //             },
    //             plotLines: [{
    //                 value: 0,
    //                 width: 2,
    //                 color: 'silver'
    //             }]
    //         },

    //         plotOptions: {
    //             series: {
    //                 compare: 'percent'
    //             }
    //         },

    //         tooltip: {
    //             pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
    //             valueDecimals: 2
    //         },

    //         series: seriesOptions
    //     });
    // }


    // $.each(names, function (i, name) {

    //     $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=' + name.toLowerCase() + '-c.json&callback=?',    function (data) {

    //         seriesOptions[i] = {
    //             name: name,
    //             data: data
    //         };

    //         // As we're loading the data asynchronously, we don't know what order it will arrive. So
    //         // we keep a counter and create the chart when all the data is loaded.
    //         seriesCounter += 1;

    //         if (seriesCounter === names.length) {
    //             createChart();
    //         }
    //     });
    // });
});
