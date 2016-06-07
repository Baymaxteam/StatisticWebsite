var updateFlag = false;
var DEBUG_Log = true;
var addPointIndex = 50;
var mm1 = [],
    mm2 = [],
    mm3 = [],
    mm4 = [],
    mm5 = [],
    allSensor = [];

$(function() {
    $("#btnUpdateFlag").click(function() {
        updateFlag = ~updateFlag;
        console.log(updateFlag)
    });

    $("#btnUpdateFlag1").click(function() {
        updateFlag = ~updateFlag;
        console.log(updateFlag)
    });

    $.get('/ajax_selectFilePart2/', {
        'fileName': 'Control_Sensors.csv'
    }, function(respons) {
        DEBUG("Server response the json data : ");
        DEBUG(respons);
        var len = respons.data.length;
        // get current time, and the start time is the fifth point 
        // so startTime = currentTime - 50 point *1000ms + (UTC+8);
        var currentTime = new Date().getTime() + 8 * 3600 * 1000;
        var startTime = currentTime - 50 * 1000;
        var sensorData = respons.data;
        var sensorStatList = respons.statList;

        // 整理sensor data
        for (i = 0; i < len; i++) {
            sensorData[i][5] = startTime + i * 1000;
            mm1.push([sensorData[i][5], sensorData[i][0]]);
            mm2.push([sensorData[i][5], sensorData[i][1]]);
            mm3.push([sensorData[i][5], sensorData[i][2]]);
            mm4.push([sensorData[i][5], sensorData[i][3]]);
            mm5.push([sensorData[i][5], sensorData[i][4]]);
        };
        allSensor.push(mm1, mm2, mm3, mm4, mm5);

        DEBUG("currentTime :");
        DEBUG(currentTime);
        DEBUG("startTime :");
        DEBUG(startTime);
        DEBUG("sensor 1 data :");
        DEBUG(mm1);
        DEBUG("5 sensor data : ");
        DEBUG(allSensor);
        DEBUG("get StatList : ");
        DEBUG(sensorStatList);

        addPointIndex = plotSensorChart($('#container1'), mm1, addPointIndex, 1);
        addPointIndex = plotSensorChart($('#container2'), mm2, addPointIndex, 2);
        addPointIndex = plotSensorChart($('#container3'), mm3, addPointIndex, 3);
        addPointIndex = plotSensorChart($('#container4'), mm4, addPointIndex, 4);
        addPointIndex = plotSensorChart($('#container5'), mm5, addPointIndex, 5);

        var minRate = 4.975,
            maxRate = 4.985,
            seriesOptions = [],
            names = ['Sensor1', 'Sensor2', 'Sensor3', 'Sensor4', 'Sensor5'];


        for (i = 0; i < 5; i++) {
            seriesOptions[i] = {
                name: names[i],
                data: get50dataPoint(allSensor[i])
            };
        }

        DEBUG("all senseor data : ");
        DEBUG(seriesOptions);
        addPointIndex = plotAllSensorChart($('#container'), seriesOptions, addPointIndex);

        var SelectTableHeader = [];
        SelectTableHeader.push({ title: '統計量' });
        SelectTableHeader.push({ title: 'Sensor1' });
        SelectTableHeader.push({ title: 'Sensor2' });
        SelectTableHeader.push({ title: 'Sensor3' });
        SelectTableHeader.push({ title: 'Sensor4' });
        SelectTableHeader.push({ title: 'Sensor5' });
        //統計圖表
        $('#tableStat table').DataTable({
            data: sensorStatList,
            columns: SelectTableHeader,
            columnDefs: [{
                width: '10%',
                targets: 0
            }], //fix width
            "bAutoWidth": false,
            "bFilter": false
        });

        SelectTableHeader = [];
        SelectTableHeader.push({ title: '統計量' });
        SelectTableHeader.push({ title: 'Sensor1' });
        SensorStatList($('#tableStat1 table'), sensorStatList, SelectTableHeader,1)

        SelectTableHeader = [];
        SelectTableHeader.push({ title: '統計量' });
        SelectTableHeader.push({ title: 'Sensor2' });
        SensorStatList($('#tableStat2 table'), sensorStatList, SelectTableHeader,2)

        SelectTableHeader = [];
        SelectTableHeader.push({ title: '統計量' });
        SelectTableHeader.push({ title: 'Sensor3' });
        SensorStatList($('#tableStat3 table'), sensorStatList, SelectTableHeader,3)

        SelectTableHeader = [];
        SelectTableHeader.push({ title: '統計量' });
        SelectTableHeader.push({ title: 'Sensor4' });
        SensorStatList($('#tableStat4 table'), sensorStatList, SelectTableHeader,4)

        SelectTableHeader = [];
        SelectTableHeader.push({ title: '統計量' });
        SelectTableHeader.push({ title: 'Sensor5' });
        SensorStatList($('#tableStat5 table'), sensorStatList, SelectTableHeader,5)

    });
});

function DEBUG(printData) {
    if (DEBUG_Log === true) {
        console.log(printData)
    }
}

function get50dataPoint(mdata) {
    // generate an array of random data
    var data = [],
        i;
    for (i = 0; i < 50; i += 1) {
        data.push([
            mdata[i][0],
            mdata[i][1]
        ]);
    }
    return data;
}

function plotSensorChart(DOM, plotdata, addPointIndex, updateindex) {

    DOM.highcharts('StockChart', {
        chart: {
            events: {
                load: function() {
                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function() {
                        if (updateFlag && (addPointIndex <= plotdata.length)) {
                            if (updateindex == 1) {
                                series.addPoint(mm1[addPointIndex], true, false);
                            } else if (updateindex == 2) {
                                series.addPoint(mm2[addPointIndex], true, false);
                            } else if (updateindex == 3) {
                                series.addPoint(mm3[addPointIndex], true, false);
                            } else if (updateindex == 4) {
                                series.addPoint(mm4[addPointIndex], true, false);
                            } else {
                                series.addPoint(mm5[addPointIndex], true, false);
                            }
                            addPointIndex++;

                        }

                    }, 1000);
                }
            }
        },
        rangeSelector: {
            selected: 1
        },

        title: {
            text: ''
        },

        yAxis: {
            title: {
                text: 'Data'
            },
            plotLines: [{
                value: 4.98,
                color: 'blue',
                dashStyle: 'shortdash',
                width: 2,
                label: {
                    text: '尺寸中心'
                }
            }, {
                value: 4.975,
                color: 'green',
                dashStyle: 'shortdash',
                width: 2,
                label: {
                    text: '下界'
                }
            }, {
                value: 4.985,
                color: 'red',
                dashStyle: 'shortdash',
                width: 2,
                label: {
                    text: '上界'
                }
            }]
        },

        series: [{
            name: 'Data',
            data: get50dataPoint(plotdata),
            tooltip: {
                valueDecimals: 4
            }
        }]
    });
    return (addPointIndex);
}

function plotAllSensorChart(DOM, plotdata, addPointIndex) {

    DOM.highcharts('StockChart', {
        chart: {
            events: {
                load: function() {

                    // set up the updating of the chart each second
                    // console.log("reload");
                    var series = [];
                    for (var i = 0; i < 5; i++) {
                        series[i] = this.series[i]
                    }
                    // console.log(series);
                    setInterval(function() {
                        // enable the update button and the addpoint is less than the dataset length.
                        if (updateFlag && (addPointIndex <= mm1.length)) {
                            series[0].addPoint(mm1[addPointIndex], false, false);
                            series[1].addPoint(mm2[addPointIndex], false, false);
                            series[2].addPoint(mm3[addPointIndex], false, false);
                            series[3].addPoint(mm4[addPointIndex], false, false);
                            series[4].addPoint(mm5[addPointIndex], true, false);
                            addPointIndex++;
                        }

                    }, 1000);
                }
            }
        },
        rangeSelector: {
            selected: 1
        },

        title: {
            text: ''
        },

        yAxis: {
            title: {
                text: 'Data'
            },
            plotLines: [{
                value: 4.98,
                color: 'blue',
                dashStyle: 'shortdash',
                width: 2,
                label: {
                    text: '尺寸中心'
                }
            }, {
                value: 4.975,
                color: 'green',
                dashStyle: 'shortdash',
                width: 2,
                label: {
                    text: '下界'
                }
            }, {
                value: 4.985,
                color: 'red',
                dashStyle: 'shortdash',
                width: 2,
                label: {
                    text: '上界'
                }
            }]
        },

        series: plotdata
    });

    return addPointIndex;
}

function SensorStatList(DOMtable, sensorStatList, SelectTableHeader, index) {
    var i, tmp;
    var len = sensorStatList.length;
    var singleSensorStatList = [];

    for (i = 0; i < len; i++) {
        singleSensorStatList.push([sensorStatList[i][0], sensorStatList[i][index]]);
    }
    DEBUG(sensorStatList);
    DEBUG(singleSensorStatList);
    //統計圖表
    DOMtable.DataTable({
        data: singleSensorStatList,
        columns: SelectTableHeader,
        columnDefs: [{
            width: '10%',
            targets: 0
        }], //fix width
        "bAutoWidth": false,
        "bFilter": false
    });


}
