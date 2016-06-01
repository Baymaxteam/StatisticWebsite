// 宗明、埔里、線西
var DataSet1ThisYear = [" 14, 14, 13, 13, 14 ", " 14, 14, 13, 13, 14 ; column",
    " 14, 14, 13, 13, 14 ; column", " 14, 14, 13, 13, 14 ; column", " 14, 14, 13, 13, 14 ; column"
];

var DataSet2ThisYear = [" 100, 14, 13, 13, 14", " 14, 14, 13, 13, 14 ; column",
    " 0, 14, 13, 13, 14 ; column", " 0, 14, 13, 13, 14 ; column", " 0, 14, 13, 13, 14 ; column"
];

var DataSet3ThisYear = [" 1, 0, 13, 13, 14", " 14, 14, 13, 13, 14 ; column",
    " 0, 14, 13, 13, 14 ; column", " 0, 14, 13, 13, 14 ; column", " 0, 14, 13, 13, 14 ; column"
];

var DataSet1LastYear = [" 14, 14, 13, 13, 14 ", " 14, 14, 13, 13, 14 ; column",
    " 14, 14, 13, 13, 14 ; column", " 14, 14, 13, 13, 14 ; column", " 14, 14, 13, 13, 14 ; column"
];

var DataSet2LastYear = [" 100, 14, 13, 13, 14", " 14, 14, 13, 13, 14 ; column",
    " 0, 14, 13, 13, 14 ; column", " 0, 14, 13, 13, 14 ; column", " 0, 14, 13, 13, 14 ; column"
];

var DataSet3LastYear = [" 1, 0, 13, 13, 14", " 14, 14, 13, 13, 14 ; column",
    " 0, 14, 13, 13, 14 ; column", " 0, 14, 13, 13, 14 ; column", " 0, 14, 13, 13, 14 ; column"
];

var DEBUG_Log = true;

$(function() {


    // Prepare demo data 2015 and 2016
    $.get('/ajax_selectFilePart2/', {
        'fileName': 'PM2.5_data_2015.csv'
    }, function(respons) {
        DEBUG("Server response the json data : ");
        DEBUG(respons);

        var i, j, temp1 = [],temp2 = [],temp3 = [];
        var len = respons['data'].length;
        var tmpdata = respons['data'];
        for (i = 0; i < 6; i++) { 
            for (j = 0; j < 48; j++) {
                temp1.push(' ' + tmpdata[j][i+4].toString());
                temp2.push(' ' + tmpdata[j][i+11].toString());
                temp3.push(' ' + tmpdata[j][i+18].toString());
            }
            // DEBUG(temp.join());
            DataSet1LastYear[i] = temp1.join() + ' ; column';
            DataSet2LastYear[i] = temp2.join() + ' ; column';
            DataSet3LastYear[i] = temp3.join() + ' ; column';
            temp1 = [];
            temp2 = [];
            temp3 = [];
        }
        // interactive with sparklines
        doChunk($('td[data-sparkline2]'),DataSet1LastYear);
    });

    $.get('/ajax_selectFilePart2/', {
        'fileName': 'PM2.5_data_2016.csv'
    }, function(respons) {
        DEBUG("Server response the json data : ");
        DEBUG(respons);

        var i, j, temp1 = [],temp2 = [],temp3 = [];
        var len = respons['data'].length;
        var tmpdata = respons['data'];
        for (i = 0; i < 6; i++) { 
            for (j = 0; j < 48; j++) {
                temp1.push(' ' + tmpdata[j][i+4].toString());
                temp2.push(' ' + tmpdata[j][i+11].toString());
                temp3.push(' ' + tmpdata[j][i+18].toString());
            }
            // DEBUG(temp.join());
             
            DataSet1ThisYear[i] = temp1.join() + ' ; column';
            DataSet2ThisYear[i] = temp2.join() + ' ; column';
            DataSet3ThisYear[i] = temp3.join() + ' ; column';
            temp1 = [];
            temp2 = [];
            temp3 = [];
        }
        // interactive with sparklines
        doChunk($('td[data-sparkline1]'),DataSet1ThisYear);
    });

    plotTWMapChart($('#containerTWMap'));


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
                            var CityName = this.name;
                            console.log(CityName);
                            // 宗明、埔里、線西
                            if (CityName === "Nantou") {
                                doChunk($('td[data-sparkline2]'),DataSet2LastYear);
                                doChunk($('td[data-sparkline1]'),DataSet2ThisYear);
                                CityName = "埔里";
                            } else if (CityName === "Changhua") {
                                doChunk($('td[data-sparkline2]'),DataSet3LastYear);
                                doChunk($('td[data-sparkline1]'),DataSet3ThisYear);
                                CityName = "線西";
                            } else {
                                doChunk($('td[data-sparkline2]'),DataSet1LastYear);
                                doChunk($('td[data-sparkline1]'),DataSet1ThisYear);
                                CityName = "宗明";
                            }
                            $('#thisYearCityName').text("本年度資訊 : " + CityName);
                            $('#lastYearCityName').text("去年度資訊 : " + CityName);
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

function doChunk(DOM, selectCityData) {

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


    var start = +new Date(),
        $tds1 = DOM,
        fullLen = $tds1.length,
        n = 0;

    var time = +new Date(),
        i,
        len = $tds1.length,
        $td,
        stringdata = "",
        arr,
        data,
        chart;

    // DEBUG("$tds1");
    // DEBUG($tds1);
    for (i = 0; i < len; i += 1) {

        $td = $($tds1[i]);
        stringdata = selectCityData[i];
        arr = stringdata.split('; ');
        data = $.map(arr[0].split(', '), parseFloat);
        chart = {};
        // DEBUG("stringdata");
        // DEBUG(stringdata);
        // DEBUG(arr);
        // DEBUG("data");
        // DEBUG(data);

        if (arr[1]) {
            chart.type = arr[1];
        }
        $td.highcharts('SparkLine', {
            series: [{
                data: data,
                pointStart: 1,
                color: Highcharts.getOptions().colors[i],
            }],
            tooltip: {
                headerFormat: '<span style="font-size: 10px">' + $td.parent().find('th').html() + ', hr{point.x}:</span><br/>',
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
        if (new Date() - time > 1000) {
            $tds1.splice(0, i + 1);
            setTimeout(doChunk, 0);
            break;
        }

        // Print a feedback on the performance
        // if (n === fullLen) {
        //     $('#result').html('Generated ' + fullLen + ' sparklines in ' + (new Date() - start) + ' ms');
        // }
    }
}
