$(function () {
    var updateFlag = false;
    var DEBUG_Log = false;
    var addPointIndex = 50;
    

    function DEBUG(printData) 
    {
        if (DEBUG_Log === true) 
        {
            console.log(printData)
        }
    }


    $.get('/ajax_selectFilePart2/', {
        'fileName': 'sickbed.csv'
    }, function(respons) {
        DEBUG("Server response the json data : ");
        DEBUG(respons);
        var len = respons.data[0].length;
        // get current time, and the start time is the fifth point 
        // so startTime = currentTime - 50 point *1000ms + (UTC+8);
        
        var sensorData = respons.data;
        var sensorStatList = respons.statList;
        var data = [];
        data1 = [],
        data2 = [],
        data3 = [],
        data4 = [],
        data5 = [],
        data6 = [],
        data7 = [],
        data8 = [],
        data9 = [],
        data10 = [];

        // 整理sensor data
        for (i = 0; i < len; i++) {
            data1.push(sensorData[0][i]);
            data2.push(sensorData[1][i]);
            data3.push(sensorData[2][i]);
            data4.push(sensorData[3][i]);
            data5.push(sensorData[4][i]);
            data6.push(sensorData[5][i]);
            data7.push(sensorData[6][i]);
            data8.push(sensorData[7][i]);
            data9.push(sensorData[8][i]);
            data10.push(sensorData[9][i]);
           
        };
        data.push(data1,data2,data3,data4,data5,data6,data7,data8,data9,data10);

        sickbed($('#container8'), sensorData);

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

function sickbed(DOM,data)
{
    var names =
    [
        '臺北市',
        '臺中市',
        '臺南市',
        '高雄市',
        '新北市',
        '桃園市',
        '南投縣',
        '屏東縣',
        '澎湖縣',
        '花蓮縣'

    ];
    DOM.highcharts({
        exporting: { 
            enabled: false 
        },
        chart: {
            type: 'column'
        },
        title: {
            text: '病床數量'
        },
        xAxis: {
            categories: [
                '醫院病床合計',
                '醫院一般病床',
                '醫院特殊病床',
                '急性一般病床',
                '慢性一般病床',
                '加護病床',
                '急診觀察床',
                '血液透析床',
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: '病床數 (張)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} 張</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
        {
            name: names[0],
            data: data[0],
        }, {
            name: names[1],
            data: data[1],
        }, {
            name: names[2],
            data: data[2],
        }, {
            name: names[3],
            data: data[3],
        }, {
            name: names[4],
            data: data[4],
        }, {
            name: names[5],
            data: data[5],
        }, {
            name: names[6],
            data: data[6],
        }, {
            name: names[7],
            data: data[7],
        }, {
            name: names[8],
            data: data[8],
        }, {
            name: names[9],
            data: data[9],
        }
        ]
    });
}