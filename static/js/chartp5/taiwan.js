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
        'fileName': 'taiwan.csv'
    }, function(respons) {
        DEBUG("Server response the json data : ");
        DEBUG(respons);
        var len = respons.data.length;
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
        for (i = 0; i < len; i++) {
            data1.push(sensorData[i][0]);
            data2.push(sensorData[i][1]);
            data3.push(sensorData[i][2]);
            data4.push(sensorData[i][3]);
            data5.push(sensorData[i][4]);
            data6.push(sensorData[i][5]);
            data7.push(sensorData[i][6]);
            data8.push(sensorData[i][7]);
            data9.push(sensorData[i][8]);
            data10.push(sensorData[i][9]);
            data11.push(sensorData[i][10]);
            data12.push(sensorData[i][11]);
            data13.push(sensorData[i][12]);
            data14.push(sensorData[i][13]);
            data15.push(sensorData[i][14]);
            data16.push(sensorData[i][15]);
            data17.push(sensorData[i][16]);
            data18.push(sensorData[i][17]);
            data19.push(sensorData[i][18]);
            data20.push(sensorData[i][19]);
            data21.push(sensorData[i][20]);
            data22.push(sensorData[i][21]);
        };
        data.push(data1,data2,data3,data4,data5,data6,data7,data8,data9,data10,data11,data12,data13,data14,data15,data16,data17,data18,data19,data20,data21,data22);
        DEBUG("data");
        DEBUG(data);
        taiwan($('#container'), data, len);

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

function taiwan(DOM, data_1, total_week)
{
      var count = 0;
    // Prepare demo data
    var data = [
        {
            "hc-key": "tw-cl",
            "value": 0
        },
        {
            "hc-key": "tw-tw",
            "value": 0
        },
        {
            "hc-key": "tw-tp",
            "value": 0
        },
        {
            "hc-key": "tw-ty",
            "value": 0
        },
        {
            "hc-key": "tw-hs",
            "value": 0
        },
        {
            "hc-key": "tw-hh",
            "value": 0
        },
        {
            "hc-key": "tw-ml",
            "value": 0
        },
        {
            "hc-key": "tw-th",
            "value": 0
        },
        {
            "hc-key": "tw-nt",
            "value": 0
        },
        {
            "hc-key": "tw-cg",
            "value": 0
        },
        {
            "hc-key": "tw-yl",
            "value": 0
        },
        {
            "hc-key": "tw-cs",
            "value": 0
        },
        {
            "hc-key": "tw-ch",
            "value": 0
        },
        {
            "hc-key": "tw-tn",
            "value": 0
        },
        {
            "hc-key": "tw-kh",
            "value": 0
        },
        {
            "hc-key": "tw-pt",
            "value": 0
        },
        {
            "hc-key": "tw-il",
            "value": 0
        },
        {
            "hc-key": "tw-hl",
            "value": 0
        },
        {
            "hc-key": "tw-tt",
            "value": 0
        },
        {
            "hc-key": "tw-km",
            "value": 0
        },
        {
            "hc-key": "tw-lk",
            "value": 0
        },
        {
            "hc-key": "tw-ph",
            "value": 0
        }
    ];

    // Initiate the chart
    DOM.highcharts('Map', {

        title : {
            text : '26縣市流感併發重症'
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

        series : [{
            data : data,
            mapData: Highcharts.maps['countries/tw/tw-all'],
            joinBy: 'hc-key',
            name: '重症人數',
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


    },
     function (chart) {

        if (!chart.renderer.forExport) {
            setInterval(function () {
                var point = chart.series[0].points[0],
                    newVal = 0;
                for(loop = 0; loop< 22; loop++)
                {
                    point = chart.series[0].points[loop];
                    newVal = data_1[loop][count];

                    point.update(newVal);
                }


                if (count ==total_week)
                    count = 0;
                else
                    count ++;
            }, 3000);
        }
    }
    );
}
