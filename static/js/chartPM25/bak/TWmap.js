// 忠明、埔里、線西
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

var DataSet1maxmin2015 = [];
var DataSet2maxmin2015 = [];
var DataSet3maxmin2015 = [];
var DataSet1maxmin2016 = [];
var DataSet2maxmin2016 = [];
var DataSet3maxmin2016 = [];

var DataPM25 = [];

$(function() {
    // Prepare demo data 2015 and 2016
    $.get('/ajax_selectFilePart2/', {
        'fileName': 'PM2.5_data_2015.csv'
    }, function(respons) {
        DEBUG("Server response the json data : ");
        DEBUG(respons);

        var i, j, temp1 = [],
            temp2 = [],
            temp3 = [];
        var len = respons['data'].length;
        var tmpdata = respons['data'];
        for (i = 0; i < 6; i++) {
            for (j = 0; j < 48; j++) {
                temp1.push(' ' + tmpdata[j][i + 4].toString());
                temp2.push(' ' + tmpdata[j][i + 11].toString());
                temp3.push(' ' + tmpdata[j][i + 18].toString());
            }
            // DEBUG(temp.join());
            DataSet1LastYear[i] = temp1.join() + ' ; column';
            DataSet2LastYear[i] = temp2.join() + ' ; column';
            DataSet3LastYear[i] = temp3.join() + ' ; column';
            DataSet1maxmin2015.push(tmpdata[47][i + 4], Math.max(...temp1), Math.min(...temp1));
            DataSet2maxmin2015.push(tmpdata[47][i + 11], Math.max(...temp2), Math.min(...temp2));
            DataSet3maxmin2015.push(tmpdata[47][i + 18], Math.max(...temp3), Math.min(...temp3));

            temp1 = [];
            temp2 = [];
            temp3 = [];
        }
        console.log('DataSet1maxmin');
        console.log(DataSet1maxmin2015);
        // interactive with sparklines
        doChunk($('td[data-sparkline2]'), DataSet1LastYear);
        splineMaxMin(DataSet1maxmin2015, 2015)

    });

    $.get('/ajax_selectFilePart2/', {
        'fileName': 'PM2.5_data_2016.csv'
    }, function(respons) {
        DEBUG("Server response the json data : ");
        DEBUG(respons);

        var i, j, temp1 = [],
            temp2 = [],
            temp3 = [];
        var len = respons['data'].length;
        var tmpdata = respons['data'];
        for (i = 0; i < 6; i++) {
            for (j = 0; j < 48; j++) {
                temp1.push(' ' + tmpdata[j][i + 4].toString());
                temp2.push(' ' + tmpdata[j][i + 11].toString());
                temp3.push(' ' + tmpdata[j][i + 18].toString());
            }
            // DEBUG(temp.join());

            DataSet1ThisYear[i] = temp1.join() + ' ; column';
            DataSet2ThisYear[i] = temp2.join() + ' ; column';
            DataSet3ThisYear[i] = temp3.join() + ' ; column';
            DataSet1maxmin2016.push(tmpdata[47][i + 4], Math.max(...temp1), Math.min(...temp1));
            DataSet2maxmin2016.push(tmpdata[47][i + 11], Math.max(...temp2), Math.min(...temp2));
            DataSet3maxmin2016.push(tmpdata[47][i + 18], Math.max(...temp3), Math.min(...temp3));
            temp1 = [];
            temp2 = [];
            temp3 = [];
        }

        // PM25 alarm color data
        DataPM25.push(DataSet1maxmin2016[6], DataSet2maxmin2016[6],DataSet3maxmin2016[6]);
        PM25AlarmColor(DataPM25[0]);
        // interactive with sparklines
        doChunk($('td[data-sparkline1]'), DataSet1ThisYear);
        splineMaxMin(DataSet1maxmin2016, 2016)
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
            text: 'PM2.5分布資訊'
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
                            // 忠明、埔里、線西
                            if (CityName === "Nantou") {
                                doChunk($('td[data-sparkline2]'), DataSet2LastYear);
                                doChunk($('td[data-sparkline1]'), DataSet2ThisYear);
                                splineMaxMin(DataSet2maxmin2015, 2015)
                                splineMaxMin(DataSet2maxmin2016, 2016)
                                PM25AlarmColor(DataPM25[1]);
                                CityName = "埔里";
                            } else if (CityName === "Changhua") {
                                doChunk($('td[data-sparkline2]'), DataSet3LastYear);
                                doChunk($('td[data-sparkline1]'), DataSet3ThisYear);
                                splineMaxMin(DataSet3maxmin2015, 2015)
                                splineMaxMin(DataSet3maxmin2016, 2016)
                                PM25AlarmColor(DataPM25[2]);
                                CityName = "線西";
                            } else {
                                doChunk($('td[data-sparkline2]'), DataSet1LastYear);
                                doChunk($('td[data-sparkline1]'), DataSet1ThisYear);
                                splineMaxMin(DataSet1maxmin2015, 2015)
                                splineMaxMin(DataSet1maxmin2016, 2016)
                                PM25AlarmColor(DataPM25[0]);
                                CityName = "忠明";
                            }
                            $('#thisYearCityName').text("基準年度 : " + CityName);
                            $('#lastYearCityName').text("前一年度 : " + CityName);
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

function splineMaxMin(DataSetmaxmin, year) {
    if (year == 2016) {
        var DOMminmax = [$('#Data1_11'), $('#Data1_12'), $('#Data1_13'),$('#Data1_21'), $('#Data1_22'), $('#Data1_23'),
            $('#Data1_31'), $('#Data1_32'), $('#Data1_33'),$('#Data1_41'), $('#Data1_42'),$('#Data1_43'),
            $('#Data1_51'), $('#Data1_52'),$('#Data1_53'), $('#Data1_61'), $('#Data1_62'),$('#Data1_63'),
        ];
    } else {
        var DOMminmax = [$('#Data2_11'), $('#Data2_12'),$('#Data2_13'), $('#Data2_21'), $('#Data2_22'),$('#Data2_23'),
            $('#Data2_31'), $('#Data2_32'), $('#Data2_33'),$('#Data2_41'), $('#Data2_42'),$('#Data2_43'),
            $('#Data2_51'), $('#Data2_52'), $('#Data2_53'),$('#Data2_61'), $('#Data2_62'),$('#Data2_63'),
        ];
    }

    var index;
    var len = DOMminmax.length;
    for (index = 0; index < len; index++) {
        DOMminmax[index].html(DataSetmaxmin[index]);
    }

}


function PM25AlarmColor(PM25value) {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    var PM25color = '#99ff99';
    // console.log('PM25value');
    // console.log(PM25value.toString());

    if (PM25value <= 11) {
        PM25color = '#99ff99';
    } else if (PM25value > 11 && PM25value <= 23) {
        PM25color = '#66ff66';
    } else if (PM25value > 23 && PM25value <= 35) {
        PM25color = '#1fc51a';
    } else if (PM25value > 35 && PM25value <= 41) {
        PM25color = '#ffcc00';
    } else if (PM25value > 41 && PM25value <= 47) {
        PM25color = '#ff9933';
    } else if (PM25value > 47 && PM25value <= 53) {
        PM25color = '#ff6666';
    } else if (PM25value > 53 && PM25value <= 64) {
        PM25color = '#ff3300';
    } else if (PM25value > 64 && PM25value <= 70) {
        PM25color = '#990000';
    } else { PM25color = '#cc00cc'; }


    ctx.fillStyle = PM25color;
    ctx.fillRect(0, 0, 300, 200);
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("PM2.5:", canvas.width / 2, canvas.height / 4);
    ctx.font = "72px Arial";
    ctx.fillText(PM25value.toString(), canvas.width / 2, canvas.height * 3 / 4);
}
