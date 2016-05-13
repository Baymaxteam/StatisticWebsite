$(function() {

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

    var seriesOptions = [],
        seriesOptions1 = [],
        seriesCounter = 0,
        names = ['Mountain View Caltrain Station', 'Beale at Market', '2nd at Townsend', 'Embarcadero at Sansome', 'Market at Sansome'];

    // names = ['MSFT', 'AAPL', 'GOOG'];
    /**
     * Create the chart when all data is loaded
     * @returns {undefined}
     */
    for (i = 0; i < 5; i++) {

        seriesOptions1[i] = {
            name: names[i],
            data: data1[i]
        };
    }




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

});
