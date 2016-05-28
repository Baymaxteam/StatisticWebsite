var sparkDataSet1 = [" 14, 14, 13, 13, 14 ; column", " 14, 14, 13, 13, 14 ; column",
    " 14, 14, 13, 13, 14 ; column", " 14, 14, 13, 13, 14 ; column", " 14, 14, 13, 13, 14 ; column"
];

var sparkDataSet2 = [" 0, 14, 13, 13, 14 ; column", " 14, 14, 13, 13, 14 ; column",
    " 0, 14, 13, 13, 14 ; column", " 0, 14, 13, 13, 14 ; column", " 0, 14, 13, 13, 14 ; column"
];

var sparkDataSet3 = [" 0, 0, 13, 13, 14 ; column", " 14, 14, 13, 13, 14 ; column",
    " 0, 14, 13, 13, 14 ; column", " 0, 14, 13, 13, 14 ; column", " 0, 14, 13, 13, 14 ; column"
];

var putSparkdata = sparkDataSet1;
var DEBUG_Log = true;

$(function() {

    // Prepare demo data
    $.get('/ajax_selectFilePart2/', {
        'fileName': 'PM2.5_data_2015.csv'
    }, function(respons) {
        DEBUG("Server response the json data : ");
        DEBUG(respons);
    });


    plotTWMapChart($('#containerTWMap'));

    // interactive with sparklines
    Highcharts.SparkLine = function(a, b, c) {
        var hasRenderToArg = typeof a === 'string' || a.nodeName,
            options = arguments[hasRenderToArg ? 1 : 0],
            defaultOptions = {
                chart: {
                    renderTo: (options.chart && options.chart.renderTo) || this,
                    backgroundColor: null,
                    borderWidth: 0,
                    type: 'area',
                    margin: [2, 0, 2, 0],
                    width: 400,
                    height: 40,
                    style: {
                        overflow: 'visible'
                    },
                    skipClone: true
                },
                title: {
                    text: ''
                },
                credits: {
                    enabled: false
                },
                xAxis: {
                    labels: {
                        enabled: false
                    },
                    title: {
                        text: null
                    },
                    startOnTick: false,
                    endOnTick: false,
                    tickPositions: []
                },
                yAxis: {
                    endOnTick: false,
                    startOnTick: false,
                    labels: {
                        enabled: false
                    },
                    title: {
                        text: null
                    },
                    tickPositions: [0]
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    backgroundColor: null,
                    borderWidth: 0,
                    shadow: false,
                    useHTML: true,
                    hideDelay: 0,
                    shared: true,
                    padding: 0,
                    positioner: function(w, h, point) {
                        return { x: point.plotX - w / 2, y: point.plotY - h };
                    }
                },
                exporting: {
                    enabled: false
                },

                plotOptions: {
                    series: {
                        animation: false,
                        lineWidth: 1,
                        shadow: false,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        marker: {
                            radius: 1,
                            states: {
                                hover: {
                                    radius: 2
                                }
                            }
                        },
                        fillOpacity: 0.25
                    },
                    column: {
                        negativeColor: '#910000',
                        borderColor: 'silver'
                    }

                }
            };

        options = Highcharts.merge(defaultOptions, options);

        return hasRenderToArg ?
            new Highcharts.Chart(a, options, c) :
            new Highcharts.Chart(options, b);
    };

    doChunk(sparkDataSet1);

    // Creating 153 sparkline charts is quite fast in modern browsers, but IE8 and mobile
    // can take some seconds, so we split the input into chunks and apply them in timeouts
    // in order avoid locking up the browser process and allow interaction.


});

function DEBUG(printData) {
    if (DEBUG_Log === true) {
        console.log(printData)
    }
}

function plotTWMapChart(DOM) {
    var data = [{
        "hc-key": "tw-th",
        // "value": 10
    }, {
        "hc-key": "tw-cg",
        // "value": 19
    }, {
        "hc-key": "tw-nt",
        // "value": 21
    }];

    DOM.highcharts('Map', {
        title: {
            text: 'PM2.5 氣體分布資訊'
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
                            var selectCityName = this.name;
                            console.log(selectCityName);
                            if (selectCityName === "Nantou") {
                                doChunk(sparkDataSet1);
                            } else if (selectCityName === "Changhua") {
                                doChunk(sparkDataSet2);
                            } else {
                                doChunk(sparkDataSet3);
                            }
                            $('#selectCityName').text("本年度資訊 : " + selectCityName);
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

}

function doChunk(selectCityData) {
    var start = +new Date(),
        $tds = $('td[data-sparkline]'),
        fullLen = $tds.length,
        n = 0;
    var time = +new Date(),
        i,
        len = $tds.length,
        $td,
        stringdata,
        arr,
        data,
        chart;


    for (i = 0; i < len; i += 1) {

        $td = $($tds[i]);
        stringdata = selectCityData[i];
        arr = stringdata.split('; ');
        data = $.map(arr[0].split(', '), parseFloat);
        chart = {};

        if (arr[1]) {
            chart.type = arr[1];
        }
        $td.highcharts('SparkLine', {
            series: [{
                data: data,
                pointStart: 1,
                color: Highcharts.getOptions().colors[i + 5],
            }],
            tooltip: {
                headerFormat: '<span style="font-size: 10px">' + $td.parent().find('th').html() + ', point{point.x}:</span><br/>',
                pointFormat: '<b>{point.y}.0</b>'
            },
            exporting: {
                enabled: false
            },
            chart: chart
        });
        // console.log(stringdata);
        // console.log(arr);
        // console.log(data);


        n += 1;

        // If the process takes too much time, run a timeout to allow interaction with the browser
        if (new Date() - time > 500) {
            $tds.splice(0, i + 1);
            setTimeout(doChunk, 0);
            break;
        }

        // Print a feedback on the performance
        // if (n === fullLen) {
        //     $('#result').html('Generated ' + fullLen + ' sparklines in ' + (new Date() - start) + ' ms');
        // }
    }
}
