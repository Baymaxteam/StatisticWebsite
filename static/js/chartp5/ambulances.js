
$(function () {
var updateFlag = false;
var DEBUG_Log = true;
var addPointIndex = 50;
var mm1 = [],
    mm2 = [],
    mm3 = [],
    mm4 = [],
    mm5 = [];

function DEBUG(printData) {
    if (DEBUG_Log === true) {
        console.log(printData)
    }


}


$.get('/ajax_selectFilePart2/', {
        'fileName': 'ambulances.csv'
    }, function(respons) {
        DEBUG("Server response the json data : ");
        DEBUG(respons);
        var len = respons.data[0].length;
        // get current time, and the start time is the fifth point 
        // so startTime = currentTime - 50 point *1000ms + (UTC+8);
        
        var sensorData = respons.data;
        var sensorStatList = respons.statList;

        // 整理sensor data
        for (i = 0; i < len; i++) {
            mm1.push([sensorData[0][i]]);
            mm2.push([sensorData[1][i]]);
            mm3.push([sensorData[2][i]]);
            mm4.push([sensorData[3][i]]);
            mm5.push([sensorData[4][i]]);
        };
        DEBUG(mm1);
        ambulance1($('#container2'), mm1);
        ambulance2($('#container3'), mm2);
        ambulance3($('#container4'), mm3);
        ambulance4($('#container5'), mm4);
        ambulance5($('#container6'), mm5);

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

    });



});

function ambulance1 (DOM, data)
{
        var count = 0;
        DOM.highcharts({
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
                text: '新北市'
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
                max: 200,

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 5,
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
                    to: 115,
                    color: '#DF5353' // red
                }, {
                    from: 115,
                    to: 120,
                    color: '#DDDF0D' // yellow
                }, {
                    from: 120,
                    to: 200,
                    color: '#55BF3B' // green
                }]
            },

            series: [{
                name: '救護車數量',
                data: data[0],
                tooltip: {
                    valueSuffix: '輛'
                }
            }]

        },
        // Add some life

        function (chart) {
            
            if (!chart.renderer.forExport) {
                setInterval(function () {
                    var point = chart.series[0].points[0],
                        newVal;
                    newVal = data[count];
                    point.update(newVal);
                    count ++;
                    if (count ==29)
                        count = 0;
                }, 3000);
            }
        });
};

function ambulance2 (DOM, data)
{
    var count = 0;
        DOM.highcharts({
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
            text: '台北市'
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
                to: 73,
                color: '#DF5353' // green
            }, {
                from: 73,
                to: 76,
                color: '#DDDF0D' // yellow
            }, {
                from: 76,
                to: 100,
                color: '#55BF3B' // red
            }]
        },

        series: [{
            name: '救護車數量',
            data: data[0],
            tooltip: {
                valueSuffix: '輛'
            }
        }]
        },
        // Add some life
        function (chart) 
        {
            if (!chart.renderer.forExport) {
            setInterval(function () {
                var point = chart.series[0].points[0],
                    newVal;
                newVal = data[count];
                point.update(newVal);
                count ++;
                if (count ==29)
                    count = 0;
            }, 3000);
            }

        })
};
    

function ambulance3 (DOM, data)
{
    var count = 0;
    DOM.highcharts({
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
            text: '高雄縣'
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
                to: 37,
                color: '#DF5353' // green
            }, {
                from: 37,
                to: 52,
                color: '#DDDF0D' // yellow
            }, {
                from: 52,
                to: 100,
                color: '#55BF3B' // red
            }]
        },

        series: [{
            name: '救護車數量',
            data: data[0],
            tooltip: {
                valueSuffix: '輛'
            }
        }]

    },
    // Add some life
    function (chart) {
        
        if (!chart.renderer.forExport) {
            setInterval(function () {
                var point = chart.series[0].points[0],
                    newVal;
                newVal = data[count];
                point.update(newVal);
                count ++;
                if (count ==29)
                    count = 0;
            }, 3000);
        }
    });
};

function ambulance4 (DOM, data)
{
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
            data: data[0],
            tooltip: {
                valueSuffix: '輛'
            }
        }]

    },
    // Add some life
    function (chart) {
       
        if (!chart.renderer.forExport) {
            setInterval(function () {
                var point = chart.series[0].points[0],
                    newVal;
                newVal = data[count];
                point.update(newVal);
                count ++;
                if (count ==29)
                    count = 0;
            }, 3000);
        }
    });
};

function ambulance5 (DOM, data)
{
    var count = 0;
    DOM.highcharts({
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

            text: '花蓮縣'

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
                to: 23,
                color: '#DF5353' // green
            }, {
                from: 23,
                to: 24,
                color: '#DDDF0D' // yellow
            }, {
                from: 24,
                to: 100,
                color: '#55BF3B' // red
            }]
        },

        series: [{
            name: '救護車數量',
            data: data[0],
            tooltip: {
                valueSuffix: '輛'
            }
        }]

    },
    // Add some life
    function (chart) {
        
        if (!chart.renderer.forExport) {
            setInterval(function () {
                var point = chart.series[0].points[0],
                    newVal;
                newVal = data[count];
                point.update(newVal);
                count ++;
                if (count ==29)
                    count = 0;
            }, 3000);
        }
    });
}

