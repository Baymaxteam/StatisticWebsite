$(function () {
    var updateFlag = false;
    var DEBUG_Log = true;
    var addPointIndex = 50;
    

    function DEBUG(printData) 
    {
        if (DEBUG_Log === true) 
        {
            console.log(printData)
        }
    }


    $.get('/ajax_selectFilePart2/', {
        'fileName': 'healthcare.csv'
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
        data10 = [],
        data11 = [],
        data12 = [],
        data13 = [],
        data14 = [],
        data15 = [],
        data16 = [],
        data17 = [],
        data18 = [],
        data19 = [],
        data20 = [],
        data21 = [],
        data22 = [];

        // 整理sensor data
        for (i = 1; i < len; i++) {
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
            data11.push(sensorData[10][i]);
            data12.push(sensorData[11][i]);
            data13.push(sensorData[12][i]);
            data14.push(sensorData[13][i]);
            data15.push(sensorData[14][i]);
            data16.push(sensorData[15][i]);
            data17.push(sensorData[16][i]);
            data18.push(sensorData[17][i]);
            data19.push(sensorData[18][i]);
            data20.push(sensorData[19][i]);
            data21.push(sensorData[20][i]);
            data22.push(sensorData[21][i]);
        };
        data.push(data1,data2,data3,data4,data5,data6,data7,data8,data9,data10,data11,data12,data13,data14,data15,data16,data17,data18,data19,data20,data21,data22);

        healthcare($('#container11'), data);

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

function healthcare(DOM, data)
{
    var names =
    [
        '臺北市',
        '臺中市',
        '臺南市',
        '高雄市',
        '基隆市',
        '新竹市',
        '嘉義市',
        '新北市',
        '桃園市',
        '新竹縣',
        '宜蘭縣',
        '苗栗縣',
        '彰化縣',
        '南投縣',
        '雲林縣',
        '嘉義縣',
        '屏東縣',
        '澎湖縣',
        '花蓮縣',
        '臺東縣',
        '金門縣',
        '連江縣',

    ];
    DOM.highcharts({
        exporting: { 
            enabled: false 
        },
        chart: {
            type: 'bar'
        },
        title: {
            text: '醫事人員數目'
        },
        xAxis: {
            categories: 
            [
                '醫師', 
                '中醫師',
                '牙醫師',
                '藥師',
                '藥劑生',
                '醫事檢驗師',
                '醫事檢驗生',
                '醫事放射師',
                '醫事放射士',
                '護理師',
                '護士',
                '助產師',
                '助產士',
                '鑲牙生',
                '營養師',
                '物理治療師',
                '物理治療生',
                '職能治療師',
                '職能治療生',
                '臨床心理師',
                '諮商心理師',
                '呼吸治療師',
                '語言治療師',
                '聽力師',
                '牙體技術師',
                '牙體技術生'
            ]
        },
        yAxis: {
            min: 0,
            title: {
                text: '(人)'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
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
        }, {
            name: names[10],
            data: data[10],
        }, {
            name: names[11],
            data: data[11],
        },{
            name: names[12],
            data: data[12],
        }, {
            name: names[13],
            data: data[13],
        }, {
            name: names[14],
            data: data[14],
        }, {
            name: names[15],
            data: data[15],
        }, {
            name: names[16],
            data: data[16],
        }, {
            name: names[17],
            data: data[17],
        }, {
            name: names[18],
            data: data[18],
        }, {
            name: names[19],
            data: data[19],
        }, {
            name: names[20],
            data: data[20],
        }, {
            name: names[21],
            data: data[21],
        }]
    });
}