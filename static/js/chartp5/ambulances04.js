$(function () {
var count = 0;
    $('#container5').highcharts({
        exporting: { 
            enabled: false 
        },
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        title: {
            text: '彰化縣'
        },

        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 100,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: '救護車數量'
            },
            plotBands: [{
                from: 0,
                to: 46,
                color: '#DF5353' // green
            }, {
                from: 46,
                to: 51,
                color: '#DDDF0D' // yellow
            }, {
                from: 51,
                to: 100,
                color: '#55BF3B' // red
            }]
        },

        series: [{
            name: '救護車數量',
            data: [0],
            tooltip: {
                valueSuffix: '輛'
            }
        }]

    },
    // Add some life
    function (chart) {
        var data1 =
        [
            [   33  ],
            [   30  ],
            [   32  ],
            [   32  ],
            [   34  ],
            [   35  ],
            [   35  ],
            [   37  ],
            [   43  ],
            [   47  ],
            [   50  ],
            [   49  ],
            [   49  ],
            [   51  ],
            [   51  ],
            [   53  ],
            [   51  ],
            [   55  ],
            [   56  ],
            [   51  ],
            [   51  ],
            [   53  ],
            [   51  ],
            [   50  ],
            [   51  ],
            [   52  ],
            [   50  ],
            [   51  ],
            [   50  ],


        ];
        if (!chart.renderer.forExport) {
            setInterval(function () {
                var point = chart.series[0].points[0],
                    newVal;
                newVal = data1[count];
                point.update(newVal);
                count ++;
                if (count ==29)
                    count = 0;
            }, 3000);
        }
    });
});